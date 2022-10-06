import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/global/layout/Layout";
import { ChakraProvider } from '@chakra-ui/react'
import { SocketProvider } from "../socket/socket-client";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
          <SocketProvider>
              <Layout>
                  <Component {...pageProps} />
              </Layout>
          </SocketProvider>
      </ChakraProvider>
  )
}

export default MyApp
