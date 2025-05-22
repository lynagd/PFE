import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Panier() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">À propos de nous</h1>
          {/* Contenu de la page À propos */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
