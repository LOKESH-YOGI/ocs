import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Baby,
  FileCheck,
  Search,
  Filter,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getBirthRecords, getDeathRecords, BirthRecord, DeathRecord } from '@/data/mockData';
import { format } from 'date-fns';

type ApplicationRecord = (BirthRecord | DeathRecord) & { type: 'birth' | 'death' };

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const birthRecords = getBirthRecords();
  const deathRecords = getDeathRecords();

  const allApplications: ApplicationRecord[] = [
    ...birthRecords.map((r) => ({ ...r, type: 'birth' as const })),
    ...deathRecords.map((r) => ({ ...r, type: 'death' as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredApplications = allApplications.filter((app) => {
    const matchesSearch = app.applicationId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allApplications.length,
    pending: allApplications.filter((a) => ['submitted', 'under_review'].includes(a.status)).length,
    approved: allApplications.filter((a) => a.status === 'approved').length,
    rejected: allApplications.filter((a) => a.status === 'rejected').length,
    today: allApplications.filter((a) => {
      const today = new Date();
      const appDate = new Date(a.createdAt);
      return appDate.toDateString() === today.toDateString();
    }).length,
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      draft: { variant: 'outline', label: t('status.draft') },
      submitted: { variant: 'secondary', label: t('status.submitted') },
      under_review: { variant: 'default', label: t('status.underReview') },
      approved: { variant: 'default', label: t('status.approved') },
      rejected: { variant: 'destructive', label: t('status.rejected') },
      corrections: { variant: 'outline', label: t('status.corrections') },
    };
    const config = statusConfig[status] || { variant: 'outline' as const, label: status };
    return (
      <Badge
        variant={config.variant}
        className={status === 'approved' ? 'bg-success text-success-foreground' : ''}
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t('admin.dashboard')}
          </h1>
          <p className="text-muted-foreground">
            {t('dashboard.welcome')}, {user?.fullName}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.totalApplications')}</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('admin.pendingReview')}</p>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-warning/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.approved')}</p>
                  <p className="text-2xl font-bold text-success">{stats.approved}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.rejected')}</p>
                  <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('admin.todayApplications')}</p>
                  <p className="text-2xl font-bold text-primary">{stats.today}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>{t('admin.allApplications')}</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('admin.search')}
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {['all', 'submitted', 'under_review', 'approved', 'rejected'].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? 'All' : t(`status.${status.replace('_', '')}`)}
                </Button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Application ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Submitted</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm">{application.applicationId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {application.type === 'birth' ? (
                            <Baby className="h-4 w-4 text-accent" />
                          ) : (
                            <FileCheck className="h-4 w-4 text-primary" />
                          )}
                          <span className="capitalize">{application.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {'childFirstName' in application
                          ? `${application.childFirstName} ${application.childLastName}`
                          : `${application.deceasedFirstName} ${application.deceasedLastName}`}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {application.submittedAt
                          ? format(new Date(application.submittedAt), 'MMM d, yyyy')
                          : '-'}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(application.status)}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/review/${application.type}/${application.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Review
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No applications found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
