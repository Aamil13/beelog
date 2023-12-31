import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/utils/Navbar'
import Footer from './components/utils/Footer'
import StateProvider from '@/redux/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateProvider>
        <Navbar/>
        {children}
        <Footer/>
        </StateProvider>
        </body>
    </html>
  )
}
