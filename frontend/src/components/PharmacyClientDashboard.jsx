import React, { useState } from 'react';
import { ShoppingCart, Clock, FileText, User, LogOut, Settings } from 'lucide-react';
import '../styles/PharmacyClientDashboard.css';

const PharmacyClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracétamol 500mg', price: 250, quantity: 2, pharmacy: 'Pharmacie Central' },
    { id: 2, name: 'Doliprane 1000mg', price: 180, quantity: 1, pharmacy: 'Pharmacie du Centre' }
  ]);
  const [orders] = useState([
    { id: 'CMD001', date: '2024-05-15', total: 850, status: 'Livrée', pharmacy: 'Pharmacie Central' },
    { id: 'CMD002', date: '2024-05-18', total: 320, status: 'En cours', pharmacy: 'Pharmacie du Centre' }
  ]);
  const [prescriptions] = useState([
    { id: 'ORD001', doctor: 'Dr. Benali Ahmed', date: '2024-05-18', medications: ['Amoxicilline 500mg', 'Doliprane 1000mg'], status: 'Active' }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Mon profil' },
    { id: 'panier', icon: ShoppingCart, label: 'Panier' },
    { id: 'commandes', icon: Clock, label: 'Historique des commandes' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' }, // <-- Add this
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  const renderProfile = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Mon profil</h2>
      <form className="dashboard-form">
        <div className="dashboard-form-row">
          <div>
            <label>Nom complet</label>
            <input type="text" defaultValue="Ahmed Benali" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" defaultValue="ahmed.benali@email.com" />
          </div>
        </div>
        <div className="dashboard-form-row">
          <div>
            <label>Téléphone</label>
            <input type="tel" defaultValue="+213 555 123 456" />
          </div>
          <div>
            <label>Ville</label>
            <input type="text" defaultValue="Alger" />
          </div>
        </div>
        <div>
          <label>Adresse</label>
          <textarea rows="2" defaultValue="123 Rue des Martyrs, Bab Ezzouar, Alger" />
        </div>
        <button className="dashboard-action-btn" type="submit">Sauvegarder les modifications</button>
      </form>
    </div>
  );

  const renderPanier = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Mon Panier</h2>
      {cartItems.length === 0 ? (
        <div className="dashboard-empty">
          <ShoppingCart size={64} className="dashboard-empty-icon" />
          <p>Votre panier est vide</p>
        </div>
      ) : (
        <div className="dashboard-list">
          {cartItems.map((item) => (
            <div key={item.id} className="dashboard-list-item">
              <div>
                <div className="dashboard-item-title">{item.name}</div>
                <div className="dashboard-item-sub">{item.pharmacy}</div>
                <div className="dashboard-item-sub">{item.price} DA</div>
              </div>
              <div className="dashboard-item-actions">
                <button onClick={() => updateQuantity(item.id, -1)} className="dashboard-qty-btn">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="dashboard-qty-btn">+</button>
                <button onClick={() => removeFromCart(item.id)} className="dashboard-remove-btn">Supprimer</button>
              </div>
            </div>
          ))}
          <div className="dashboard-total">
            <span>Total:</span>
            <span>
              {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)} DA
            </span>
          </div>
          <button className="dashboard-action-btn">Passer la commande</button>
        </div>
      )}
    </div>
  );

  const renderCommandes = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Historique des commandes</h2>
      <div className="dashboard-list">
        {orders.map((order) => (
          <div key={order.id} className="dashboard-list-item">
            <div>
              <div className="dashboard-item-title">Commande #{order.id}</div>
              <div className="dashboard-item-sub">{order.pharmacy}</div>
              <div className="dashboard-item-sub">Date: {order.date}</div>
            </div>
            <div className="dashboard-item-actions">
              <span className={`dashboard-status dashboard-status-${order.status.replace(/\s/g, '').toLowerCase()}`}>{order.status}</span>
              <span>{order.total} DA</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="dashboard-card prescription-card">
      <h2 className="dashboard-title">Mes prescriptions</h2>
      {prescriptions.length === 0 ? (
        <div className="dashboard-empty">
          <FileText size={64} className="dashboard-empty-icon" />
          <p>Aucune prescription trouvée</p>
        </div>
      ) : (
        prescriptions.map((prescription) => (
          <div key={prescription.id} className="prescription-layout">
            <div className="prescription-header">
              <div>
                <div className="prescription-doctor">
                  <strong>Dr. Benali Ahmed</strong><br />
                  Médecin Généraliste<br />
                  N° Identifiant: 123456789<br />
                  Téléphone: 06 12 34 56 78<br />
                  12, Rue des Lilas 16000<br />
                  Alger
                </div>
              </div>
              <div className="prescription-patient">
                <div><b>Nom:</b> Ahmed</div>
                <div><b>Prénom:</b> Benali</div>
                <div><b>Date de naissance:</b> 1990-05-12</div>
                <div><b>Âge:</b> 34</div>
                <div><b>Sexe:</b> Homme</div>
              </div>
            </div>
            <ul className="prescription-meds">
              {prescription.medications.map((med, idx) => (
                <li key={idx}><b>{med}</b> — 3x/jour | Durée: 5 jours</li>
              ))}
            </ul>
            <div className="prescription-footer">
              <div>
                <span className="prescription-barcode" />
              </div>
              <div>
                Date: {prescription.date} &nbsp; Signature: __________________
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Paramètres</h2>
      <form className="dashboard-form">
        <div>
          <label>Changer l'email</label>
          <input type="email" placeholder="Nouvel email" />
        </div>
        <div>
          <label>Changer le mot de passe</label>
          <input type="password" placeholder="Nouveau mot de passe" />
        </div>
        <div>
          <label>Confirmer le nouveau mot de passe</label>
          <input type="password" placeholder="Confirmer le mot de passe" />
        </div>
        <button className="dashboard-action-btn" type="submit">Enregistrer les modifications</button>
      </form>
      <hr style={{margin: "32px 0"}} />
      <button className="dashboard-remove-btn" style={{color: "#e74c3c", fontWeight: 500}}>Supprimer mon compte</button>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'panier':
        return renderPanier();
      case 'commandes':
        return renderCommandes();
      case 'prescriptions':
        return renderPrescriptions();
      case 'settings':
        return renderSettings();
      default:
        return renderProfile();
    }
  };

  const handleSidebarClick = (id) => {
    if (id === 'logout') {
      window.location.href = '/login'; // Redirect to login page
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="pharmacy-dashboard-root">
      <aside className="pharmacy-dashboard-sidebar">
        <div className="pharmacy-dashboard-logo">
          <span>PharmaConnect</span>
        </div>
        <nav>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`pharmacy-dashboard-sidebar-btn${activeSection === item.id ? ' active' : ''}`}
              >
                <Icon size={28} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="pharmacy-dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default PharmacyClientDashboard;