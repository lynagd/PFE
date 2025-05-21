import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Package, FileText, Settings, LogOut, MapPin, Plus, Minus } from 'lucide-react';

const PharmacyClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracétamol 500mg', price: 250, quantity: 2, pharmacy: 'Pharmacie Central' },
    { id: 2, name: 'Doliprane 1000mg', price: 180, quantity: 1, pharmacy: 'Pharmacie du Centre' }
  ]);

  const [orders] = useState([
    { id: 'CMD001', date: '2024-05-15', total: 850, status: 'Livrée', pharmacy: 'Pharmacie Central' },
    { id: 'CMD002', date: '2024-05-18', total: 320, status: 'En cours', pharmacy: 'Pharmacie du Centre' },
    { id: 'CMD003', date: '2024-05-20', total: 460, status: 'En attente', pharmacy: 'Pharmacie El Nour' }
  ]);

  const [prescriptions] = useState([
    { id: 'ORD001', doctor: 'Dr. Benali Ahmed', date: '2024-05-18', medications: ['Amoxicilline 500mg', 'Doliprane 1000mg'], status: 'Active' },
    { id: 'ORD002', doctor: 'Dr. Mansouri Fatima', date: '2024-05-15', medications: ['Aspegic 100mg', 'Vitamin D'], status: 'Utilisée' }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const sidebarItems = [
    { id: 'dashboard', icon: Package, label: 'Tableau de bord' },
    { id: 'orders', icon: FileText, label: 'Historique des commandes' },
    { id: 'cart', icon: ShoppingCart, label: 'Panier' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Rechercher des médicaments</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Nom du médicament ou principe actif..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <MapPin size={18} />
            Localiser
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Commandes en cours</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <Package className="text-green-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Prescriptions actives</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <FileText className="text-blue-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Articles dans le panier</p>
              <p className="text-2xl font-bold text-orange-600">{cartItems.length}</p>
            </div>
            <ShoppingCart className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pharmacies recommandées près de chez vous</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Pharmacie Central', 'Pharmacie du Centre', 'Pharmacie El Nour'].map((pharmacy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-800">{pharmacy}</h4>
              <p className="text-gray-600 text-sm">Distance: {(index + 1) * 0.8} km</p>
              <p className="text-green-600 text-sm">Ouvert • Ferme à 22h00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Historique des commandes</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">Commande #{order.id}</p>
                <p className="text-gray-600 text-sm">{order.pharmacy}</p>
                <p className="text-gray-600 text-sm">Date: {order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{order.total} DA</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                  order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mon Panier</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Votre panier est vide</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.pharmacy}</p>
                  <p className="text-gray-600 text-sm">{item.price} DA</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)} DA
              </span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPrescriptions = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Mes prescriptions</h2>
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">Ordonnance #{prescription.id}</p>
                <p className="text-gray-600 text-sm">Médecin: {prescription.doctor}</p>
                <p className="text-gray-600 text-sm">Date: {prescription.date}</p>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Médicaments:</p>
                  <ul className="text-sm text-gray-600">
                    {prescription.medications.map((med, index) => (
                      <li key={index}>• {med}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status}
                </span>
                <div className="mt-2">
                  <button className="text-green-600 hover:text-green-800 text-sm">
                    Commander ces médicaments
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres du compte</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Photo de profil</h3>
            <button className="text-green-600 hover:text-green-800 text-sm">
              Modifier la photo
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-4">Informations personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                defaultValue="Ahmed Benali"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="ahmed.benali@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                defaultValue="+213 555 123 456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                type="text"
                defaultValue="Alger"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <textarea
            rows="3"
            defaultValue="123 Rue des Martyrs, Bab Ezzouar, Alger"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'cart':
        return renderCart();
      case 'prescriptions':
        return renderPrescriptions();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-green-600 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">PharmaConnect</h1>
          <p className="text-green-100 text-sm">Plateforme pharmaceutique</p>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id 
                    ? 'bg-green-700 text-white' 
                    : 'text-green-100 hover:bg-green-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button 
                onClick={() => setActiveSection('cart')}
                className="relative p-2 text-gray-600 hover:text-gray-800"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Ahmed Benali</p>
                  <p className="text-xs text-gray-600">Client</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PharmacyClientDashboard;