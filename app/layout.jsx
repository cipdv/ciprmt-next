import '@styles/globals.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

export const metadata = {
    title: "MassageSite",
    description: "Everything a RMT Needs in One!"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body className='bg-green-200'>
            <Provider>
                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout