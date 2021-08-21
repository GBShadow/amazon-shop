import { Provider } from 'react-redux'
import NextNprogress from 'nextjs-progressbar'
import { Provider as AuthProvider } from 'next-auth/client'
import { store } from '../app/store'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <NextNprogress
          color="#FBBF24"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
        />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
