import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const { user, logout, isAuthenticated, isAdmin, isAgency } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="py-4 px-8 border-b bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-10" data-id="3yryj23aa" data-path="src/components/NavBar.tsx">
      <div className="container mx-auto flex justify-between items-center" data-id="m6gcgjjgo" data-path="src/components/NavBar.tsx">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/rwanda.jng" alt="Rwanda Flag" className="h-8 w-10 object-cover rounded" data-id="5hzv5adqf" data-path="src/components/NavBar.tsx" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" data-id="vfm1dzpz5" data-path="src/components/NavBar.tsx">
            CiviConnect
          </h1>
        </Link>
        
        <nav className="flex items-center space-x-4" data-id="6x3cnwl12" data-path="src/components/NavBar.tsx">
          <Link to="/">
            <Button variant="ghost">{t('home')}</Button>
          </Link>
          
          {isAuthenticated ?
          <>
              <Link to="/dashboard">
                <Button variant="ghost">{t('dashboard')}</Button>
              </Link>
              
              <Link to="/submit">
                <Button variant="ghost">{t('submitComplaint')}</Button>
              </Link>
              
              {(isAdmin || isAgency) &&
            <Link to="/admin">
                  <Button variant="ghost">{t('dashboard')}</Button>
                </Link>
            }
              
              <div className="flex items-center space-x-2 ml-4" data-id="d981wqy2o" data-path="src/components/NavBar.tsx">
                <span className="text-sm text-gray-600" data-id="tsygioyo4" data-path="src/components/NavBar.tsx">
                  {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            </> :

          <>
              <Link to="/login">
                <Button variant="outline">{t('login')}</Button>
              </Link>
              <Link to="/register">
                <Button>{t('register')}</Button>
              </Link>
            </>
          }
                  <div className="flex items-center ml-4 space-x-2" data-id="0tspsn3r8" data-path="src/components/NavBar.tsx">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>);

};

export default NavBar;