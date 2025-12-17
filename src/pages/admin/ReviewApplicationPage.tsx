import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Baby, FileCheck, Calendar, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  getBirthRecordById,
  getDeathRecordById,
  updateBirthRecord,
  updateDeathRecord,
  generateCertificateNo,
  getUserById,
} from '@/data/mockData';
import { format } from 'date-fns';

export default function ReviewApplicationPage() {
  const { t } = useTranslation();
  const { type, id } = useParams<{ type: 'birth' | 'death'; id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [remarks, setRemarks] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const record = type === 'birth' 
    ? getBirthRecordById(id || '') 
    : getDeathRecordById(id || '');

  const applicant = record ? getUserById(record.userId) : null;

  if (!record) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Application Not Found</h1>
          <Button onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAction = async (action: 'approve' | 'reject' | 'corrections') => {
    setIsProcessing(true);

    const updates: Record<string, unknown> = {
      remarks,
      reviewedBy: user?.id,
      reviewedAt: new Date().toISOString(),
    };

    if (action === 'approve') {
      updates.status = 'approved';
      updates.approvedAt = new Date().toISOString();
      updates.certificateNo = generateCertificateNo(type || 'birth');
    } else if (action === 'reject') {
      updates.status = 'rejected';
      updates.rejectedAt = new Date().toISOString();
    } else {
      updates.status = 'corrections';
    }

    try {
      if (type === 'birth') {
        updateBirthRecord(id || '', updates);
      } else {
        updateDeathRecord(id || '', updates);
      }

      toast({
        title: t('common.success'),
        description: `Application ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'sent for corrections'} successfully!`,
      });

      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to process application',
        variant: 'destructive',
      });
    }

    setIsProcessing(false);
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
      <div className="container py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${type === 'birth' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                {type === 'birth' ? <Baby className="h-6 w-6" /> : <FileCheck className="h-6 w-6" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t('admin.reviewApplication')}</h1>
                <p className="text-muted-foreground font-mono">{record.applicationId}</p>
              </div>
            </div>
            {getStatusBadge(record.status)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Applicant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{applicant?.fullName || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{applicant?.email || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{applicant?.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                  <p className="font-medium">
                    {record.submittedAt ? format(new Date(record.submittedAt), 'MMM d, yyyy h:mm a') : '-'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            {type === 'birth' && 'childFirstName' in record && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Baby className="h-5 w-5" />
                      {t('application.childInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">
                        {`${record.childFirstName} ${record.childMiddleName || ''} ${record.childLastName}`.trim()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.dateOfBirth')}</p>
                      <p className="font-medium">{format(new Date(record.dateOfBirth), 'MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.gender')}</p>
                      <p className="font-medium capitalize">{record.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.placeOfBirth')}</p>
                      <p className="font-medium">{record.placeOfBirth}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('application.parentInfo')}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.fatherName')}</p>
                      <p className="font-medium">
                        {`${record.fatherFirstName} ${record.fatherMiddleName || ''} ${record.fatherLastName}`.trim()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.motherName')}</p>
                      <p className="font-medium">
                        {`${record.motherFirstName} ${record.motherMiddleName || ''} ${record.motherLastName}`.trim()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {t('application.hospitalInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.hospitalName')}</p>
                      <p className="font-medium">{record.hospitalName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.address')}</p>
                      <p className="font-medium">{`${record.municipality}-${record.wardNo}, ${record.district}`}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {type === 'death' && 'deceasedFirstName' in record && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      {t('application.deceasedInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                      <p className="font-medium">
                        {`${record.deceasedFirstName} ${record.deceasedMiddleName || ''} ${record.deceasedLastName}`.trim()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.dateOfDeath')}</p>
                      <p className="font-medium">{format(new Date(record.dateOfDeath), 'MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.gender')}</p>
                      <p className="font-medium capitalize">{record.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.placeOfDeath')}</p>
                      <p className="font-medium">{record.placeOfDeath}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-muted-foreground mb-1">{t('application.cause')}</p>
                      <p className="font-medium">{record.causeOfDeath}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informant Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.informantName')}</p>
                      <p className="font-medium">{record.informantName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('application.informantRelation')}</p>
                      <p className="font-medium">{record.informantRelation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{record.informantPhone}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>{t('application.documents')}</CardTitle>
              </CardHeader>
              <CardContent>
                {record.documents.length > 0 ? (
                  <div className="space-y-2">
                    {record.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">{doc.name}</span>
                        <Badge variant="outline">{doc.type.toUpperCase()}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No documents uploaded</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Take Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="remarks">{t('admin.remarks')}</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Add verification notes or comments..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                  />
                </div>

                {record.status !== 'approved' && record.status !== 'rejected' && (
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-success hover:bg-success/90"
                      onClick={() => handleAction('approve')}
                      disabled={isProcessing}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {t('admin.approve')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleAction('corrections')}
                      disabled={isProcessing}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      {t('admin.requestCorrections')}
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleAction('reject')}
                      disabled={isProcessing}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      {t('admin.reject')}
                    </Button>
                  </div>
                )}

                {record.status === 'approved' && (
                  <div className="p-4 bg-success/10 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="font-medium text-success">Application Approved</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Certificate: {record.certificateNo}
                    </p>
                  </div>
                )}

                {record.status === 'rejected' && (
                  <div className="p-4 bg-destructive/10 rounded-lg text-center">
                    <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                    <p className="font-medium text-destructive">Application Rejected</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(record.createdAt), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                  {record.submittedAt && (
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2" />
                      <div>
                        <p className="text-sm font-medium">Submitted</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(record.submittedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  )}
                  {record.reviewedAt && (
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                      <div>
                        <p className="text-sm font-medium">Reviewed</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(record.reviewedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  )}
                  {record.approvedAt && (
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-success mt-2" />
                      <div>
                        <p className="text-sm font-medium">Approved</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(record.approvedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  )}
                  {record.rejectedAt && (
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2" />
                      <div>
                        <p className="text-sm font-medium">Rejected</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(record.rejectedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
