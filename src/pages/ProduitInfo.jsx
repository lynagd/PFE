import Header from '../components/Header';
import Footer from '../components/Footer';
import ProduitList from '../components/ProduitList';

export default function ProduitInfo() {
  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <Header />
      <ProduitList />
      <Footer />
    </div>
  );
}