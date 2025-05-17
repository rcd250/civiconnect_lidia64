import React from 'react';
import { useTheme } from '@/context/theme-context';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}>

      {theme === 'dark' ?
      <Sun className="h-4 w-4" /> :

      <Moon className="h-4 w-4" />
      }
      <span className="sr-only" data-id="3s4rnqqrb" data-path="src/components/ThemeToggle.tsx">{theme === 'dark' ? t('lightMode') : t('darkMode')}</span>
    </Button>);

};

export default ThemeToggle;