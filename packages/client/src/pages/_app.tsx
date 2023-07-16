import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { usePageLoadStore } from '@/lib/stores/misc-store';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const { pageLoading } = usePageLoadStore();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        id="app_root"
        style={{
          opacity: pageLoading ? 0 : 100,
          pointerEvents: pageLoading ? 'none' : 'all',
        }}
        className={cn(inter.className, 'transition-opacity')}
      >
        <Component {...pageProps} />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
