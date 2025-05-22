import Header from '../components/Header';
import Footer from '../components/Footer';
import MedicDetail from '../components/MedicDetail';

export default function Panier() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MedicDetail />
      <Footer />
    </div>
  );
}