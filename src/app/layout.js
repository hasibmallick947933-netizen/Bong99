import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata = {
  metadataBase: new URL('https://bong99.com'),
  title: 'Bong99 | Indian Streetwear Fashion Starts at ₹99',
  description: 'Shop affordable, modern Indian street-fashion clothing starting from ₹99. Heavyweight bio-washed plain tees from ₹99, graphic prints from ₹149, lowers from ₹179, polo & off-shoulder from ₹189.',
  keywords: 'Bong99, Indian street fashion, clothing from 99, plain t-shirt 99, printed t-shirts 149, lowers 179, polo t-shirts 189, oversized tshirts, affordable street fashion',
  openGraph: {
    title: 'Bong99 | Style Starts at ₹99',
    description: 'Trendy clothing. Crazy prices. High quality 100% bio-washed cotton apparel.',
    url: 'https://bong99.com',
    siteName: 'Bong99',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Bong99 Street Fashion',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bong99 | Style Starts at ₹99',
    description: 'Trendy clothing. Crazy prices.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-black">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
