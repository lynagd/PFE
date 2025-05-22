import Header from '../components/Header';
import Footer from '../components/Footer';
import MedicList from '../components/MedicList';

export default function MedicInfo() {
  return (
    <div className="flex flex-col min-h-screen bg-lfond">
      <Header />
      <MedicList />
      
      <Footer />
    </div>
  );
}