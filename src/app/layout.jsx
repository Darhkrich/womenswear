import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import { CartProvider } from '@/context/CartContext';

// Load fonts: Inter for UI, Playfair for Headings
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'LUMIÈRE | Modern Women\'s Boutique',
  description: 'Curated fashion for the modern woman.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Simple Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="font-serif text-2xl mb-4">LUMIÈRE</p>
              <p className="text-gray-400 text-sm">© 2024 Lumière Boutique. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}