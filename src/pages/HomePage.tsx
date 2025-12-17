import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Baby, 
  FileCheck, 
  Clock, 
  Shield, 
  Headphones, 
  ArrowRight,
  CheckCircle2,
  Users,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { t } = useTranslation();
  const { isAuthenticated, isAdmin } = useAuth();

  const features = [
    {
      icon: Clock,
      title: t('home.features.online'),
      description: t('home.features.onlineDesc'),
    },
    {
      icon: Shield,
      title: t('home.features.secure'),
      description: t('home.features.secureDesc'),
    },
    {
      icon: CheckCircle2,
      title: t('home.features.fast'),
      description: t('home.features.fastDesc'),
    },
    {
      icon: Headphones,
      title: t('home.features.support'),
      description: t('home.features.supportDesc'),
    },
  ];

  const stats = [
    { value: '50K+', label: 'Certificates Issued' },
    { value: '75', label: 'Districts Covered' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20 lg:py-32">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-up text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              {t('home.title')}
            </h1>
            <p className="animate-fade-up text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.1s' }}>
              {t('home.description')}
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.2s' }}>
              {isAuthenticated ? (
                <Button size="xl" variant="hero" asChild>
                  <Link to={isAdmin ? '/admin/dashboard' : '/citizen/dashboard'}>
                    {t('nav.dashboard')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="xl" variant="hero" asChild>
                    <Link to="/register">
                      {t('home.applyNow')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="xl" variant="heroOutline" asChild>
                    <Link to="/track">
                      {t('home.trackApplication')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('nav.services')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Birth Certificate Card */}
            <Link
              to={isAuthenticated ? '/citizen/apply/birth' : '/register'}
              className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <Baby className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {t('home.birthCertificate')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.birthCertificateDesc')}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  {t('home.applyNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* Death Certificate Card */}
            <Link
              to={isAuthenticated ? '/citizen/apply/death' : '/register'}
              className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <FileCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {t('home.deathCertificate')}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.deathCertificateDesc')}
                </p>
                <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  {t('home.applyNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg hero-gradient text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="rounded-2xl hero-gradient p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-secondary mb-2">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <Users className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Register now to apply for birth and death certificates online. Track your application status anytime, anywhere.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">
                    <FileText className="mr-2 h-5 w-5" />
                    {t('nav.citizenPortal')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/admin/login">
                    <Shield className="mr-2 h-5 w-5" />
                    {t('nav.adminPortal')}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
