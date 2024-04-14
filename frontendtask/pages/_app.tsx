import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../assets/themes'; 
export default function App({ Component, pageProps }: AppProps) {
    const AnyComponent = Component as any;

  return (
    <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
          <AnyComponent {...pageProps} />
          </ThemeProvider>
 
    </ApolloProvider>
     )
}
