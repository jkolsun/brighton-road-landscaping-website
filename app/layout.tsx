import '../styles/global.css'; // Correct relative path
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop'; 

export const metadata = {
  title: 'Brighton Road Landscaping',
  description: 'Crafting Beautiful Outdoor Spaces',
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
      </body>
    </html>
  );
}








