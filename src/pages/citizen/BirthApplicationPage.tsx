import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Baby, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createBirthRecord } from '@/data/mockData';
import { cn } from '@/lib/utils';

const steps = ['childInfo', 'parentInfo', 'hospitalInfo', 'documents', 'review'];

export default function BirthApplicationPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    childFirstName: '',
    childMiddleName: '',
    childLastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    hospitalName: '',
    district: '',
    municipality: '',
    wardNo: '',
    address: '',
    documents: [] as { name: string; type: string; uploadedAt: string }[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => ({
        name: file.name,
        type: file.type.split('/')[1],
        uploadedAt: new Date().toISOString(),
      }));
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const record = createBirthRecord({
        userId: user.id,
        status: 'submitted',
        childFirstName: formData.childFirstName,
        childMiddleName: formData.childMiddleName,
        childLastName: formData.childLastName,
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        fatherFirstName: formData.fatherFirstName,
        fatherMiddleName: formData.fatherMiddleName,
        fatherLastName: formData.fatherLastName,
        motherFirstName: formData.motherFirstName,
        motherMiddleName: formData.motherMiddleName,
        motherLastName: formData.motherLastName,
        hospitalName: formData.hospitalName,
        district: formData.district,
        municipality: formData.municipality,
        wardNo: formData.wardNo,
        address: formData.address,
        documents: formData.documents,
        submittedAt: new Date().toISOString(),
      });

      toast({
        title: t('common.success'),
        description: `Application submitted successfully! Application ID: ${record.applicationId}`,
      });
      
      navigate('/citizen/dashboard');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to submit application',
        variant: 'destructive',
      });
    }
    
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Child Info
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="childFirstName">{t('application.firstName')} *</Label>
                <Input
                  id="childFirstName"
                  name="childFirstName"
                  value={formData.childFirstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childMiddleName">{t('application.middleName')}</Label>
                <Input
                  id="childMiddleName"
                  name="childMiddleName"
                  value={formData.childMiddleName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childLastName">{t('application.lastName')} *</Label>
                <Input
                  id="childLastName"
                  name="childLastName"
                  value={formData.childLastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t('application.dateOfBirth')} *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">{t('application.gender')} *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('application.male')}</SelectItem>
                    <SelectItem value="female">{t('application.female')}</SelectItem>
                    <SelectItem value="other">{t('application.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">{t('application.placeOfBirth')} *</Label>
              <Input
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );
      case 1: // Parent Info
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t('application.fatherName')}</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="fatherFirstName">{t('application.firstName')} *</Label>
                  <Input
                    id="fatherFirstName"
                    name="fatherFirstName"
                    value={formData.fatherFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherMiddleName">{t('application.middleName')}</Label>
                  <Input
                    id="fatherMiddleName"
                    name="fatherMiddleName"
                    value={formData.fatherMiddleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherLastName">{t('application.lastName')} *</Label>
                  <Input
                    id="fatherLastName"
                    name="fatherLastName"
                    value={formData.fatherLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t('application.motherName')}</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="motherFirstName">{t('application.firstName')} *</Label>
                  <Input
                    id="motherFirstName"
                    name="motherFirstName"
                    value={formData.motherFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherMiddleName">{t('application.middleName')}</Label>
                  <Input
                    id="motherMiddleName"
                    name="motherMiddleName"
                    value={formData.motherMiddleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherLastName">{t('application.lastName')} *</Label>
                  <Input
                    id="motherLastName"
                    name="motherLastName"
                    value={formData.motherLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Hospital Info
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">{t('application.hospitalName')} *</Label>
              <Input
                id="hospitalName"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="district">{t('application.district')} *</Label>
                <Input
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality">{t('application.municipality')} *</Label>
                <Input
                  id="municipality"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="wardNo">{t('application.wardNo')} *</Label>
                <Input
                  id="wardNo"
                  name="wardNo"
                  value={formData.wardNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('application.address')} *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3: // Documents
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium text-foreground mb-2">{t('application.uploadDocument')}</p>
              <p className="text-sm text-muted-foreground mb-4">{t('application.supportedFormats')}</p>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
            </div>
            {formData.documents.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Documents</Label>
                <div className="space-y-2">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 4: // Review
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-foreground">{t('application.childInfo')}</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{`${formData.childFirstName} ${formData.childMiddleName} ${formData.childLastName}`.trim()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span className="font-medium">{formData.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span className="font-medium capitalize">{formData.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Place of Birth:</span>
                  <span className="font-medium">{formData.placeOfBirth}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-foreground">{t('application.parentInfo')}</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Father:</span>
                  <span className="font-medium">{`${formData.fatherFirstName} ${formData.fatherMiddleName} ${formData.fatherLastName}`.trim()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mother:</span>
                  <span className="font-medium">{`${formData.motherFirstName} ${formData.motherMiddleName} ${formData.motherLastName}`.trim()}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-foreground">{t('application.hospitalInfo')}</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hospital:</span>
                  <span className="font-medium">{formData.hospitalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-medium">{`${formData.municipality}-${formData.wardNo}, ${formData.district}`}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-foreground">{t('application.documents')}</h3>
              <p className="text-sm">{formData.documents.length} document(s) uploaded</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/citizen/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Baby className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('application.birthCertificate')}</h1>
              <p className="text-muted-foreground">Complete the form to submit your application</p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block h-1 w-full min-w-[60px] max-w-[100px] mx-2",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span
                key={step}
                className={cn(
                  "text-xs hidden sm:block",
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t(`application.${step === 'childInfo' ? 'childInfo' : step === 'parentInfo' ? 'parentInfo' : step === 'hospitalInfo' ? 'hospitalInfo' : step === 'documents' ? 'documents' : 'review'}`)}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 0 && t('application.childInfo')}
              {currentStep === 1 && t('application.parentInfo')}
              {currentStep === 2 && t('application.hospitalInfo')}
              {currentStep === 3 && t('application.documents')}
              {currentStep === 4 && t('application.review')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('application.previous')}
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('application.submit')}
            </Button>
          ) : (
            <Button onClick={nextStep}>
              {t('application.next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
