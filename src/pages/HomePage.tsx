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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-foreground leading-tight mb-4">
              {t('home.title')}
            </h1>
            <p className="text-base text-primary-foreground/90 mb-6">
              {t('home.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              {isAuthenticated ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link to={isAdmin ? '/admin/dashboard' : '/citizen/dashboard'}>
                    {t('nav.dashboard')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/register">
                      {t('home.applyNow')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link to="/track">
                      {t('home.trackApplication')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 lg:py-14">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              {t('nav.services')}
            </h2>
            <p className="text-muted-foreground">
              {t('home.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {/* Birth Certificate Card */}
            <Link
              to={isAuthenticated ? '/citizen/apply/birth' : '/register'}
              className="block bg-card p-6 border border-border rounded hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent rounded">
                  <Baby className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('home.birthCertificate')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('home.birthCertificateDesc')}
                  </p>
                  <span className="text-sm text-primary font-medium">
                    {t('home.applyNow')} →
                  </span>
                </div>
              </div>
            </Link>

            {/* Death Certificate Card */}
            <Link
              to={isAuthenticated ? '/citizen/apply/death' : '/register'}
              className="block bg-card p-6 border border-border rounded hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent rounded">
                  <FileCheck className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('home.deathCertificate')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('home.deathCertificateDesc')}
                  </p>
                  <span className="text-sm text-primary font-medium">
                    {t('home.applyNow')} →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 lg:py-14 bg-muted/50">
        <div className="container">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded p-4"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded bg-primary text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 lg:py-14">
        <div className="container">
          <div className="bg-primary/5 border border-primary/20 rounded p-6 lg:p-8">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-4">
                Register now to apply for birth and death certificates online. Track your application status anytime, anywhere.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/register">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('nav.citizenPortal')}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admin/login">
                      <Shield className="mr-2 h-4 w-4" />
                      {t('nav.adminPortal')}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
