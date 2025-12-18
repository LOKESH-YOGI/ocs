import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-foreground">
                <span className="text-sm font-bold text-primary">BD</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">BDCS</h3>
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
          <div>
            <h4 className="font-medium text-sm mb-3">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-1.5 text-sm text-primary-foreground/80">
              <Link to="/services" className="hover:text-primary-foreground">
                {t('nav.services')}
              </Link>
              <Link to="/about" className="hover:text-primary-foreground">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="hover:text-primary-foreground">
                {t('footer.contactUs')}
              </Link>
              <Link to="/privacy" className="hover:text-primary-foreground">
                {t('footer.privacyPolicy')}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-sm mb-3">{t('nav.services')}</h4>
            <nav className="flex flex-col gap-1.5 text-sm text-primary-foreground/80">
              <Link to="/citizen/apply/birth" className="hover:text-primary-foreground">
                {t('home.birthCertificate')}
              </Link>
              <Link to="/citizen/apply/death" className="hover:text-primary-foreground">
                {t('home.deathCertificate')}
              </Link>
              <Link to="/track" className="hover:text-primary-foreground">
                {t('home.trackApplication')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm mb-3">{t('footer.contactUs')}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>1660-01-1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@bdcs.gov.np</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Singha Durbar, Kathmandu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-3">
          <p className="text-center text-xs text-primary-foreground/60">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
