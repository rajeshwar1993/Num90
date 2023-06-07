import './globals.css';
import '../firebase';
import Nav from '../containers/Nav';
import { AuthProvider } from './AuthProvider';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body className='bg-skin-base px-4 py-2 md:px-4 md:py-4 lg:px-10 lg:py-6 h-screen'>
          <Nav />
          <main className='my-4 md:my-8 md:mx-4 xl:mx-12 2xl:mx-16 h-[calc(100%-66px)] overflow-y-auto'>
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
