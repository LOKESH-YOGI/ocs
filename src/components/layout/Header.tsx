import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    return isAdmin ? '/admin/dashboard' : '/citizen/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <span className="text-sm font-bold text-primary-foreground">BD</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold leading-tight text-foreground">DBCS_Lokesh</h1>
            <p className="text-xs text-muted-foreground leading-tight">e-Governance Portal</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm text-foreground hover:bg-muted rounded">
            {t('nav.home')}
          </Link>
          <Link to="/services" className="px-3 py-2 text-sm text-foreground hover:bg-muted rounded">
            {t('nav.services')}
          </Link>
          <Link to="/about" className="px-3 py-2 text-sm text-foreground hover:bg-muted rounded">
            {t('nav.about')}
          </Link>
          <Link to="/contact" className="px-3 py-2 text-sm text-foreground hover:bg-muted rounded">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 h-8 px-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">{i18n.language === 'ne' ? 'नेपाली' : 'EN'}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage('en')}>
                {t('common.english')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ne')}>
                {t('common.nepali')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 h-8">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline max-w-20 truncate text-xs">{user?.fullName}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t('nav.dashboard')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8" onClick={() => navigate('/login')}>
                {t('nav.login')}
              </Button>
              <Button size="sm" className="h-8" onClick={() => navigate('/register')}>
                {t('nav.register')}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all",
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="container pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.services')}
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.about')}
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('nav.contact')}
          </Link>
          
          {!isAuthenticated && (
            <div className="pt-2 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
                {t('nav.login')}
              </Button>
              <Button size="sm" className="flex-1" onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}>
                {t('nav.register')}
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
