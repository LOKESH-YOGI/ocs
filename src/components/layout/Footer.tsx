import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <span className="text-lg font-bold text-secondary-foreground">BD</span>
              </div>
              <div>
                <h3 className="font-bold">BDCS</h3>
                <p className="text-xs text-primary-foreground/70">e-Governance Portal</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('certificate.governmentOf')}<br />
              {t('certificate.ministry')}<br />
              {t('certificate.department')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80">
              <Link to="/services" className="hover:text-secondary transition-colors">
                {t('nav.services')}
              </Link>
              <Link to="/about" className="hover:text-secondary transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">
                {t('footer.contactUs')}
              </Link>
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                {t('footer.termsConditions')}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('nav.services')}</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/80">
              <Link to="/citizen/apply/birth" className="hover:text-secondary transition-colors">
                {t('home.birthCertificate')}
              </Link>
              <Link to="/citizen/apply/death" className="hover:text-secondary transition-colors">
                {t('home.deathCertificate')}
              </Link>
              <Link to="/track" className="hover:text-secondary transition-colors">
                {t('home.trackApplication')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.contactUs')}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-primary-foreground">{t('footer.helpline')}</p>
                  <p>1660-01-1234</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <p>info@bdcs.gov.np</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <p>Singha Durbar, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4">
          <p className="text-center text-sm text-primary-foreground/60">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
