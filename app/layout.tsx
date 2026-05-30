import '../styles/global.css'; // Correct relative path
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { Chatbot } from './components/Chatbot';

export const metadata = {
  title: 'Brighton Road Landscaping | Main Line & Montgomery County, PA',
  description:
    'Brighton Road Landscaping provides landscape design, hardscaping, paver patios, property maintenance, drainage & French drains, and seasonal cleanups across the Main Line and Montgomery County, PA — including Plymouth Meeting, Wayne, Blue Bell, Bryn Mawr, Ardmore, Conshohocken, King of Prussia, and Radnor.',
  keywords: [
    'landscaping', 'landscape design', 'hardscaping', 'paver patios', 'drainage', 'French drains',
    'property maintenance', 'lawn mowing', 'seasonal cleanups', 'Main Line landscaping',
    'Montgomery County landscaping', 'Plymouth Meeting', 'Wayne PA', 'Blue Bell', 'Bryn Mawr',
    'Ardmore', 'Conshohocken', 'King of Prussia', 'Radnor', 'Villanova', 'Gladwyne', 'Devon', 'Berwyn',
  ],
  openGraph: {
    title: 'Brighton Road Landscaping | Main Line & Montgomery County, PA',
    description:
      'Landscape design, hardscaping, property maintenance, drainage, and seasonal cleanups across the Main Line and Montgomery County, PA.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800 min-h-screen">
      <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Chatbot />
      </body>
    </html>
  );
}








