import React from 'react';
import { useLanguage } from '@/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline" data-id="f55ppnmj6" data-path="src/components/LanguageSwitcher.tsx">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? 'bg-accent' : ''}>
          {t('french')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('rw')} className={language === 'rw' ? 'bg-accent' : ''}>
          {t('kinyarwanda')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('sw')} className={language === 'sw' ? 'bg-accent' : ''}>
          {t('kiswahili')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);

};

export default LanguageSwitcher;