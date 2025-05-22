import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FiFilter, FiX } from 'react-icons/fi';

// Exemple de données (remplace par un fetch plus tard)
const produits = [
  { id: 1, name: "Ecran total", price: "500DA", img: "/ecran total" },
  { id: 2, name: "Gelfore", price: "1400DA", img: "/gelfore.png" },
  { id: 3, name: "Dafalgan", price: "200DA", img: "/dafalgan.png" },
  { id: 4, name: "Doliprane", price: "100DA", img: "/doliprane.png" },
];

const allWilayas = [
  { name: 'Adrar', code: '01' }, { name: 'Chlef', code: '02' }, { name: 'Laghouat', code: '03' },
  { name: 'Oum El Bouaghi', code: '04' }, { name: 'Batna', code: '05' }, { name: 'Béjaïa', code: '06' },
  { name: 'Biskra', code: '07' }, { name: 'Béchar', code: '08' }, { name: 'Blida', code: '09' },
  { name: 'Bouira', code: '10' }, { name: 'Tamanrasset', code: '11' }, { name: 'Tébessa', code: '12' },
  { name: 'Tlemcen', code: '13' }, { name: 'Tiaret', code: '14' }, { name: 'Tizi Ouzou', code: '15' },
  { name: 'Alger', code: '16' }, { name: 'Djelfa', code: '17' }, { name: 'Jijel', code: '18' },
  { name: 'Sétif', code: '19' }, { name: 'Saïda', code: '20' }, { name: 'Skikda', code: '21' },
  { name: 'Sidi Bel Abbès', code: '22' }, { name: 'Annaba', code: '23' }, { name: 'Guelma', code: '24' },
  { name: 'Constantine', code: '25' }, { name: 'Médéa', code: '26' }, { name: 'Mostaganem', code: '27' },
  { name: 'MSila', code: '28' }, { name: 'Mascara', code: '29' }, { name: 'Ouargla', code: '30' },
  { name: 'Oran', code: '31' }, { name: 'El Bayadh', code: '32' }, { name: 'Illizi', code: '33' },
  { name: 'Bordj Bou Arréridj', code: '34' }, { name: 'Boumerdès', code: '35' }, { name: 'Tarf', code: '36' },
  { name: 'Tindouf', code: '37' }, { name: 'Tissemsilt', code: '38' }, { name: 'El Oued', code: '39' },
  { name: 'Khenchela', code: '40' }, { name: 'Souk Ahras', code: '41' }, { name: 'Tipaza', code: '42' },
  { name: 'Mila', code: '43' }, { name: 'Aïn Defla', code: '44' }, { name: 'Naâma', code: '45' },
  { name: 'Aïn Témouchent', code: '46' }, { name: 'Ghardaïa', code: '47' }, { name: 'Relizane', code: '48' },
  { name: "El M'Ghair", code: '49' }, { name: 'El Menia', code: '50' }, { name: 'Ouled Djellal', code: '51' },
  { name: 'Bordj Badji Mokhtar', code: '52' }, { name: 'Beni Abbès', code: '53' }, { name: 'In Salah', code: '54' },
  { name: 'In Guezzam', code: '55' }, { name: 'Touggourt', code: '56' }, { name: 'Djanet', code: '57' },
  { name: 'Timmimoun', code: '58' }
];

const priceRanges = [
  { label: '0-1000 DA', value: '0-1000' },
  { label: '1000-2000 DA', value: '1000-2000' },
  { label: '2000-3000 DA', value: '2000-3000' },
  { label: '3000-5000 DA', value: '3000-5000' },
  { label: '>5000 DA', value: '5000+' }
];

function FilterProduit({
  isOpen, setIsOpen,
  categories, toggleCategory,
  marque, setMarque,
  prixRange, setPrixRange,
  wilayas, toggleWilaya
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Panneau de filtres */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-lsecondary shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full overflow-y-auto">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filtrer les résultats</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-yellow-500"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Section Catégorie */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Catégorie</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(categories).map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={categories[cat]}
                    onChange={() => toggleCategory(cat)}
                    className="rounded text-blue-500"
                  />
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Marque */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Marque</h3>
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rechercher par marque"
            />
          </div>

          {/* Section Gamme de Prix */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Gamme de Prix</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={prixRange === range.value}
                    onChange={() => setPrixRange(range.value)}
                    className="text-blue-500"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Wilaya */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Wilaya</h3>
            <div className="max-h-60 overflow-y-auto border border-gray-200 bg-white rounded p-2">
              {allWilayas.map((wilaya) => (
                <label key={wilaya.code} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={wilayas[wilaya.code] || false}
                    onChange={() => toggleWilaya(wilaya.code)}
                    className="rounded text-blue-500"
                  />
                  <span>{wilaya.name} - {wilaya.code}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => {
                Object.keys(categories).forEach(cat => categories[cat] = false);
                setMarque('');
                setPrixRange('');
                Object.keys(wilayas).forEach(w => wilayas[w] = false);
                setIsOpen(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-khder text-white rounded hover:bg-green-900"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProduitList() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState({
    hygiene: false,
    beaute: false,
    complements: false,
    dispositifs: false,
    cheveux: false,
    peau: false,
    dentaire: false,
    bebe: false,
    sport: false
  });
  const [marque, setMarque] = useState('');
  const [prixRange, setPrixRange] = useState('');
  const [wilayas, setWilayas] = useState({});

  const toggleCategory = (category) => {
    setCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleWilaya = (wilayaCode) => {
    setWilayas(prev => ({
      ...prev,
      [wilayaCode]: !prev[wilayaCode]
    }));
  };

  // Filtrage selon la recherche (ajoute d'autres filtres si besoin)
  const filtered = produits.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Trouvez vos produits parapharmaceutiques en un clic !</h1>
      <div className="flex justify-center mb-8">
        <div className="flex w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-3 rounded-l-md border border-gray-300 focus:outline-none"
            placeholder="Rechercher un produit parapharmaceutique"
          />
          <button className="bg-yellow-500 p-3 rounded-r-md hover:bg-yellow-600 flex items-center justify-center">
            <Search className="h-5 w-5 text-gray-800" />
          </button>
        </div>
        {/* Bouton Filtre */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors ml-2"
          aria-label="Ouvrir les filtres"
        >
          <FiFilter className="w-5 h-5" />
        </button>
        {/* Panneau de filtres */}
        <FilterProduit
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          categories={categories}
          toggleCategory={toggleCategory}
          marque={marque}
          setMarque={setMarque}
          prixRange={prixRange}
          setPrixRange={setPrixRange}
          wilayas={wilayas}
          toggleWilaya={toggleWilaya}
        />
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filtered.map(prod => (
          <Link
            key={prod.id}
            to={`/produitinfo/${prod.id}`}
            className="flex flex-col items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <img src={prod.img} alt={prod.name} className="h-24 mb-4 object-contain" />
            <div className="font-semibold">{prod.name}</div>
            <div className="text-blue-700 font-bold">{prod.price}</div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">Aucun produit trouvé.</div>
        )}
      </div>
    </div>
  );
}