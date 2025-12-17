import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';

export default function RegisterPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('auth.passwordMismatch'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const result = await register({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone,
    });

    if (result.success) {
      toast({
        title: t('common.success'),
        description: t('auth.registerSuccess'),
      });
      navigate('/citizen/dashboard');
    } else {
      toast({
        title: t('common.error'),
        description: result.error || t('auth.emailExists'),
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] flex">
        {/* Left - Image/Decoration */}
        <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12">
          <div className="text-center text-primary-foreground max-w-md">
            <div className="mb-8 mx-auto w-24 h-24 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-secondary">BD</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Join the Digital Nepal</h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              Register to access online birth and death certificate services. 
              Fast, secure, and available 24/7 from anywhere in Nepal.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {t('auth.register')}
              </h1>
              <p className="text-muted-foreground">
                Create your account to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phone')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? t('common.loading') : t('auth.register')}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
