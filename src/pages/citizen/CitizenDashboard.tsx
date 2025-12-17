import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Baby,
  FileCheck,
  ArrowRight,
  Calendar,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getBirthRecordsByUser, getDeathRecordsByUser, BirthRecord, DeathRecord } from '@/data/mockData';
import { format } from 'date-fns';

type ApplicationRecord = (BirthRecord | DeathRecord) & { type: 'birth' | 'death' };

export default function CitizenDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const birthRecords = user ? getBirthRecordsByUser(user.id) : [];
  const deathRecords = user ? getDeathRecordsByUser(user.id) : [];

  const allApplications: ApplicationRecord[] = [
    ...birthRecords.map((r) => ({ ...r, type: 'birth' as const })),
    ...deathRecords.map((r) => ({ ...r, type: 'death' as const })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = {
    total: allApplications.length,
    pending: allApplications.filter((a) => ['submitted', 'under_review', 'draft'].includes(a.status)).length,
    approved: allApplications.filter((a) => a.status === 'approved').length,
    rejected: allApplications.filter((a) => a.status === 'rejected').length,
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
            {t('dashboard.welcome')}, {user?.fullName}
          </h1>
          <p className="text-muted-foreground">
            Manage your certificate applications and track their status
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link to="/citizen/apply/birth">
            <Card className="hover:shadow-card transition-shadow cursor-pointer group border-2 border-transparent hover:border-accent/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Baby className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{t('application.birthCertificate')}</h3>
                  <p className="text-sm text-muted-foreground">Register a new birth</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/apply/death">
            <Card className="hover:shadow-card transition-shadow cursor-pointer group border-2 border-transparent hover:border-primary/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{t('application.deathCertificate')}</h3>
                  <p className="text-sm text-muted-foreground">Register a death</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  <p className="text-sm text-muted-foreground">{t('dashboard.pending')}</p>
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
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.recentApplications')}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/citizen/applications">
                {t('dashboard.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {allApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{t('dashboard.noApplications')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('dashboard.startApplication')}</p>
                <div className="flex gap-2 justify-center">
                  <Button asChild>
                    <Link to="/citizen/apply/birth">
                      <Plus className="mr-2 h-4 w-4" />
                      Birth Certificate
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/citizen/apply/death">
                      <Plus className="mr-2 h-4 w-4" />
                      Death Certificate
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {allApplications.slice(0, 5).map((application) => (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${application.type === 'birth' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                        {application.type === 'birth' ? <Baby className="h-5 w-5" /> : <FileCheck className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{application.applicationId}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(application.createdAt), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(application.status)}
                      {application.status === 'approved' && (
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/citizen/certificate/${application.type}/${application.id}`}>
                            <Download className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
