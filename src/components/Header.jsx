import { Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      {/* Barre de navigation principale */}
      <header className="bg-khder shadow-sm w-full py-6">
        <div className="w-full flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <div className="text-2xl text-lfond text-serif ">Pharmasmth</div>
            <div className="flex">
              
                <input
                  type="text"
                  className="w-96 p-2 rounded-l-md rounded-r-none border-none focus:ring-0"
                  placeholder="Rechercher un produit pharmaceutique"
                />
                <Link to="/Carte" className="bg-yellow-500 p-2 rounded-r-md rounded-l-none hover:bg-yellow-600 flex items-center justify-center " aria-label="Rechercher">

                  <Search className="h-6 w-6 text-gray-800" />
                </Link>
              
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div >
                <a href="#" className=" text-white hover:text-yellow-500">Compte</a>
            </div>
            <div >
                <Link to="/MedicInfo" className=" text-white hover:text-yellow-500">Médicaments</Link>
            </div>
            <div >
                <Link to="/ProduitInfo" className=" text-white hover:text-yellow-500">Parapharmaceutiques</Link>
            </div>
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-lfond" />
               <Link to="/Panier" className="ml-1 text-white hover:text-yellow-500">Panier</Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Sous-navigation (Pharmacy) */}
      <nav className="bg-lsecondary shadow-md p-2 border-b border-gray-200">
        <div className="w-full flex items-center justify-between px-8">
          <div className="flex items-center">
            {/*<div className="text-xl font-bold text-teal-500 mr-8">my pharmacy</div>*/}
            <div className="flex space-x-6">
              <Link to="/Home" className="text-gray-800 hover:text-yellow-500">Accueil</Link>
              <a href="#" className="text-gray-800 hover:text-yellow-500">Carte</a>
              <a href="#" className="text-gray-800 hover:text-yellow-500">FAQ</a>
              {/*<div className="flex items-center text-gray-800 hover:text-teal-500">
                <span>Browse all health</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>*/}
            </div>
          </div>
          
          <div>
            <a href="#" className="text-yellow-500 hover:underline">Se connecter</a>
            <a href="#" className="text-yellow-500 "> | </a>
            <a href="#" className="text-yellow-500 hover:underline">S'inscrire</a>
          </div>
        </div>
      </nav>

      
    </>
  );
}

{/*export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Ma Plateforme</h1>
      <nav>
        <ul className="flex gap-4">
          <li><a href="#" className="hover:underline">Accueil</a></li>
          <li><a href="#" className="hover:underline">Medicaments</a></li>
          <li><a href="#" className="hover:underline">Produits pararphaceutiques</a></li>
          <li><a href="#" className="hover:underline">Carte</a></li>
          <li><a href="#" className="hover:underline">FAQ</a></li>
        </ul>
      </nav>
    </header>
  );
}*/}