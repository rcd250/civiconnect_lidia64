import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col" data-id="at274u92h" data-path="src/pages/HomePage.tsx">
      <NavBar />

      <main className="flex-1" data-id="ivhfmfp70" data-path="src/pages/HomePage.tsx">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-yellow-400 dark:bg-yellow-600 text-gray-800 dark:text-gray-900" data-id="59nptemhd" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto max-w-5xl" data-id="nhfdl7rfo" data-path="src/pages/HomePage.tsx">
            <div className="grid md:grid-cols-2 gap-12 items-center" data-id="a4zra2ysm" data-path="src/pages/HomePage.tsx">
              <div className="space-y-6" data-id="u3f0wmo0s" data-path="src/pages/HomePage.tsx">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-id="w0o4serqu" data-path="src/pages/HomePage.tsx">
                  {t('welcomeTitle')}
                </h1>
                <p className="text-lg opacity-90" data-id="uagtqsp69" data-path="src/pages/HomePage.tsx">
                  {t('welcomeMessage')}
                </p>
                <div className="flex flex-wrap gap-4" data-id="2s5sfsad0" data-path="src/pages/HomePage.tsx">
                  {isAuthenticated ?
                  <Link to="/dashboard">
                      <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
                        {t('dashboard')}
                      </Button>
                    </Link> :

                  <Link to="/login">
                      <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
                        {t('getStarted')}
                      </Button>
                    </Link>
                  }
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-950">
                      {t('learnMore')}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block" data-id="muliht0e0" data-path="src/pages/HomePage.tsx">
                <img
                  src="/rwandanflag"
                  alt="Rwanda Flag"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg object-contain" data-id="4yaqxsdtp" data-path="src/pages/HomePage.tsx" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 bg-white dark:bg-gray-800" data-id="o17bbqoy8" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto max-w-6xl" data-id="pl9evpumy" data-path="src/pages/HomePage.tsx">
            <div className="text-center mb-12" data-id="06fhmff4a" data-path="src/pages/HomePage.tsx">
              <h2 className="text-3xl font-bold mb-4 dark:text-white" data-id="9fdf9it6e" data-path="src/pages/HomePage.tsx">{t('howItWorks')}</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-id="aibb76ow9" data-path="src/pages/HomePage.tsx">
                {t('platformDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8" data-id="ahwunoncw" data-path="src/pages/HomePage.tsx">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg" data-id="ep9lbpvcc" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full flex items-center justify-center mb-4" data-id="b0sa9zp8k" data-path="src/pages/HomePage.tsx">
                  <span className="text-xl font-bold" data-id="dxqrv8jx4" data-path="src/pages/HomePage.tsx">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white" data-id="taktayufz" data-path="src/pages/HomePage.tsx">{t('submitComplaint')}</h3>
                <p className="text-gray-600 dark:text-gray-300" data-id="whuya6wr3" data-path="src/pages/HomePage.tsx">
                  {t('submitDescription')}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg" data-id="l4qiwzre6" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full flex items-center justify-center mb-4" data-id="1asr3mz5n" data-path="src/pages/HomePage.tsx">
                  <span className="text-xl font-bold" data-id="1n66eq5ge" data-path="src/pages/HomePage.tsx">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white" data-id="h5asf5hjs" data-path="src/pages/HomePage.tsx">{t('trackProgress')}</h3>
                <p className="text-gray-600 dark:text-gray-300" data-id="oxs89okwj" data-path="src/pages/HomePage.tsx">
                  {t('trackDescription')}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg" data-id="6nzks1bkp" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 rounded-full flex items-center justify-center mb-4" data-id="m7fj5kfgm" data-path="src/pages/HomePage.tsx">
                  <span className="text-xl font-bold" data-id="0yt7fbl1f" data-path="src/pages/HomePage.tsx">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white" data-id="pdah7xti0" data-path="src/pages/HomePage.tsx">{t('getResolution')}</h3>
                <p className="text-gray-600 dark:text-gray-300" data-id="bhs60jhhr" data-path="src/pages/HomePage.tsx">
                  {t('resolutionDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800" data-id="bg3gwwsg3" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto max-w-5xl" data-id="xtxkoa2be" data-path="src/pages/HomePage.tsx">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" data-id="74o6armyl" data-path="src/pages/HomePage.tsx">
              <div data-id="bogj3z9ry" data-path="src/pages/HomePage.tsx">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400" data-id="y9149qvtm" data-path="src/pages/HomePage.tsx">94%</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2" data-id="vhlgb4b7l" data-path="src/pages/HomePage.tsx">{t('resolutionRate')}</p>
              </div>
              <div data-id="sviikgfp6" data-path="src/pages/HomePage.tsx">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400" data-id="jzce6m539" data-path="src/pages/HomePage.tsx">48h</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2" data-id="c70ebydwk" data-path="src/pages/HomePage.tsx">{t('responseTime')}</p>
              </div>
              <div data-id="v055auyvz" data-path="src/pages/HomePage.tsx">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400" data-id="tkg4ei1ot" data-path="src/pages/HomePage.tsx">10k+</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2" data-id="3whqs2do5" data-path="src/pages/HomePage.tsx">{t('activeUsers')}</p>
              </div>
              <div data-id="kte6heh91" data-path="src/pages/HomePage.tsx">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400" data-id="5nobuljey" data-path="src/pages/HomePage.tsx">15+</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2" data-id="hqnnalp2w" data-path="src/pages/HomePage.tsx">{t('govtAgencies')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-blue-50 dark:bg-blue-900" data-id="cf39c3lb7" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto max-w-4xl text-center" data-id="w2zjmo0u3" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl font-bold mb-4 dark:text-white" data-id="vz4awcaen" data-path="src/pages/HomePage.tsx">{t('readyToMakeDifference')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto" data-id="g8xkpc9fs" data-path="src/pages/HomePage.tsx">
              {t('joinCitizens')}
            </p>
            <div className="flex justify-center gap-4 flex-wrap" data-id="xnlmqbmxw" data-path="src/pages/HomePage.tsx">
              {isAuthenticated ?
              <Link to="/submit">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    {t('submitComplaint')}
                  </Button>
                </Link> :

              <Link to="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    {t('register')}
                  </Button>
                </Link>
              }
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white dark:bg-gray-900 dark:border-gray-800" data-id="gzpuxzoms" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-6" data-id="i0klnkt5x" data-path="src/pages/HomePage.tsx">
          <div className="flex flex-col md:flex-row justify-between items-center" data-id="yfc1zajgc" data-path="src/pages/HomePage.tsx">
            <div className="mb-4 md:mb-0" data-id="mdtjviucm" data-path="src/pages/HomePage.tsx">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent" data-id="z7o03j7s2" data-path="src/pages/HomePage.tsx">
                CiviConnect
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1" data-id="2bfn1svqg" data-path="src/pages/HomePage.tsx">
                {t('connectingCitizens')}
              </p>
            </div>
            <div className="flex gap-6 text-gray-500 dark:text-gray-400" data-id="kfsl0ze97" data-path="src/pages/HomePage.tsx">
              <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">{t('about')}</Link>
              <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">{t('privacy')}</Link>
              <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">{t('terms')}</Link>
              <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">{t('contact')}</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 dark:text-gray-500 text-sm" data-id="pvkyyr11a" data-path="src/pages/HomePage.tsx">
            <p data-id="yzsjmzw0z" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} CiviConnect. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default HomePage;