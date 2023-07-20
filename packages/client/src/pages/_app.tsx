import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { usePageLoadStore } from '@/lib/stores/misc-store';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

/**
 * TANSTACK QUERY CLIENT
 */
export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pageLoading } = usePageLoadStore();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
