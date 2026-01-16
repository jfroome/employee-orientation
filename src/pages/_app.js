import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { themeOptions } from '@/components/atomic/ThemeOptions'
import '../styles/globals.css'
import "../styles/styles.css";
const theme = createTheme(themeOptions);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (  
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
} 