import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { getBirthRecordById, getDeathRecordById } from '@/data/mockData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function CertificatePage() {
  const { t } = useTranslation();
  const { type, id } = useParams<{ type: 'birth' | 'death'; id: string }>();
  const navigate = useNavigate();

  const record = type === 'birth' 
    ? getBirthRecordById(id || '') 
    : getDeathRecordById(id || '');

  if (!record || record.status !== 'approved') {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Certificate Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The certificate you're looking for doesn't exist or hasn't been approved yet.
          </p>
          <Button onClick={() => navigate('/citizen/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const certificateUrl = `${window.location.origin}/verify/${record.certificateNo}`;

  return (
    <Layout>
      <div className="container py-8">
        {/* Actions */}
        <div className="no-print flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/citizen/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              {t('common.print')}
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              {t('common.download')}
            </Button>
          </div>
        </div>

        {/* Certificate */}
        <div className="certificate-container max-w-3xl mx-auto bg-card border-4 border-primary rounded-lg overflow-hidden shadow-elevated">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <p className="text-sm mb-1">{t('certificate.governmentOf')}</p>
            <p className="text-sm mb-1">{t('certificate.ministry')}</p>
            <p className="text-sm font-medium">{t('certificate.department')}</p>
          </div>

          {/* Gold Bar */}
          <div className="h-2 gold-gradient" />

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {type === 'birth' ? t('certificate.birthTitle') : t('certificate.deathTitle')}
              </h1>
              <p className="text-muted-foreground">
                {t('certificate.certificateNo')}: <span className="font-mono font-bold text-primary">{record.certificateNo}</span>
              </p>
            </div>

            {type === 'birth' && 'childFirstName' in record && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="font-semibold text-foreground">
                      {`${record.childFirstName} ${record.childMiddleName || ''} ${record.childLastName}`.trim()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.dateOfBirth')}</p>
                    <p className="font-semibold text-foreground">
                      {format(new Date(record.dateOfBirth), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.gender')}</p>
                    <p className="font-semibold text-foreground capitalize">{record.gender}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.placeOfBirth')}</p>
                    <p className="font-semibold text-foreground">{record.placeOfBirth}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.fatherName')}</p>
                    <p className="font-semibold text-foreground">
                      {`${record.fatherFirstName} ${record.fatherMiddleName || ''} ${record.fatherLastName}`.trim()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.motherName')}</p>
                    <p className="font-semibold text-foreground">
                      {`${record.motherFirstName} ${record.motherMiddleName || ''} ${record.motherLastName}`.trim()}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">{t('application.address')}</p>
                  <p className="font-semibold text-foreground">
                    {`${record.municipality}-${record.wardNo}, ${record.district}`}
                  </p>
                </div>
              </div>
            )}

            {type === 'death' && 'deceasedFirstName' in record && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                    <p className="font-semibold text-foreground">
                      {`${record.deceasedFirstName} ${record.deceasedMiddleName || ''} ${record.deceasedLastName}`.trim()}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.dateOfDeath')}</p>
                    <p className="font-semibold text-foreground">
                      {format(new Date(record.dateOfDeath), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.gender')}</p>
                    <p className="font-semibold text-foreground capitalize">{record.gender}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.placeOfDeath')}</p>
                    <p className="font-semibold text-foreground">{record.placeOfDeath}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg col-span-full">
                    <p className="text-xs text-muted-foreground mb-1">{t('application.cause')}</p>
                    <p className="font-semibold text-foreground">{record.causeOfDeath}</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">{t('application.address')}</p>
                  <p className="font-semibold text-foreground">
                    {`${record.municipality}-${record.wardNo}, ${record.district}`}
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-border flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('certificate.issuedDate')}</p>
                <p className="font-medium text-foreground">
                  {format(new Date(record.approvedAt || record.updatedAt), 'MMMM d, yyyy')}
                </p>
                <div className="mt-4">
                  <div className="w-32 h-0.5 bg-foreground mb-1" />
                  <p className="text-sm text-muted-foreground">{t('certificate.registrarSignature')}</p>
                </div>
              </div>
              <div className="text-center">
                <QRCodeSVG value={certificateUrl} size={80} className="mb-2" />
                <p className="text-xs text-muted-foreground">{t('certificate.verifyQR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
