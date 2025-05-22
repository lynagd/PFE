import React, { useState } from 'react';
import { ShoppingCart, Clock, FileText, User, LogOut, Settings } from 'lucide-react';
import '../styles/PharmacyClientDashboard.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Barcode from 'react-barcode';

const PharmacyClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracétamol 500mg', price: 250, quantity: 2, pharmacy: 'Pharmacie Central' },
    { id: 2, name: 'Doliprane 1000mg', price: 180, quantity: 1, pharmacy: 'Pharmacie du Centre' }
  ]);
  const [orders] = useState([
    { id: 'CMD001', date: '2024-05-15', total: 850, status: 'Livrée', pharmacy: 'Pharmacie Central' },
    { id: 'CMD002', date: '2024-05-18', total: 320, status: 'En cours', pharmacy: 'Pharmacie du Centre' }
  ]);
  const [prescriptions] = useState([
    {
      id: 'ORD001',
      doctor: 'Dr. Benali Ahmed',
      date: '2024-05-18',
      medications: [
        { nom: "Amoxicilline 500mg", posologie: "3x/jour", quantite: 10 },
        { nom: "Doliprane 1000mg", posologie: "2x/jour", quantite: 6 }
      ],
      status: 'Active',
      signatureUrl: '/assets/signature of the same medecin.png',
      cachetUrl: ' /assets/personalized cachet for medecin with text replaced with infos from the screenshot.png'
    }
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
    // { id: 'panier', icon: ShoppingCart, label: 'Panier' }, // Removed Panier
    { id: 'commandes', icon: Clock, label: 'Historique des commandes' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
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

  // PDF download handler (simple print for now)
  const handleDownloadPDF = async () => {
    const element = document.querySelector('.prescription-layout');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save("prescription.pdf");
  };

  // Nearby pharmacy handler
  const handleFindPharmacy = (prescription) => {
    navigate('/nearby-pharmacies', { state: { meds: prescription.medications.map(m => m.nom) } });
  };

  // List view for prescriptions
  const renderPrescriptions = () => (
    <div className="dashboard-card prescription-card">
      <h2 className="dashboard-title">Mes prescriptions</h2>
      {prescriptions.length === 0 ? (
        <div className="dashboard-empty">
          <FileText size={64} className="dashboard-empty-icon" />
          <p>Aucune prescription trouvée</p>
        </div>
      ) : (
        <div className="prescription-list">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-list-item" style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f9f8f4",
              borderRadius: 10,
              marginBottom: 18,
              boxShadow: "0 1px 4px 0 rgba(44,62,80,0.04)",
              width: "100%" // Add this if not present
            }}>
              <div>
                <div><b>Médecin:</b> {prescription.doctor}</div>
                <div><b>Date:</b> {prescription.date}</div>
              </div>
              <button
                className="dashboard-action-btn-small"
                onClick={() => setSelectedPrescription(prescription)}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Details view for a single prescription
  const renderPrescriptionDetails = (prescription) => (
    <div className="dashboard-card prescription-card">
      <button
        className="dashboard-action-btn-small"
        style={{ marginBottom: 16 }}
        onClick={() => setSelectedPrescription(null)}
      >
        Retour à la liste
      </button>
      <div className="prescription-layout">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <strong>Dr. Benali Ahmed</strong><br />
            Médecin Généraliste<br />
            12, Rue des Lilas 16000<br />   {/* <-- Add this line */}
            Alger<br />
            Téléphone: 06 12 34 56 78
          </div>
          <div className="prescription-patient">
            <div><b>Nom:</b> Ahmed</div>
            <div><b>Prénom:</b> Benali</div>
            <div><b>Âge:</b> 34</div>
            {/* <div><b>Date de naissance:</b> 1990-05-12</div>
            <div><b>Sexe:</b> Homme</div> */}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span><b>Fait le :</b> {prescription.date}</span>
        </div>
        <h2 style={{ textAlign: "center", margin: "12px 0 12px 0", fontWeight: 700, fontSize: "2rem" }}>Ordonnance</h2>
        <div className="prescription-meds" style={{ marginBottom: 18 }}>
          {prescription.medications.map((med, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <b style={{ fontSize: "1.1rem" }}>{med.nom}</b> — {med.posologie} | Quantité: {med.quantite}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Barcode value="0291-672" height={60} width={2} fontSize={18} />
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              Signature:<br />
              <img
                src={prescription.signatureUrl || "/signature-placeholder.png"}
                alt="Signature"
                style={{ height: 80, marginTop: 4, background: "transparent" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              Cachet:<br />
              <img
                src={prescription.cachetUrl || "/cachet-placeholder.png"}
                alt="Cachet"
                style={{ height: 80, marginTop: 4, background: "transparent" }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          <button className="dashboard-action-btn" onClick={handleDownloadPDF}>
            Enregistrer
          </button>
          <button
            className="dashboard-action-btn"
            style={{ background: "#4b7352" }}
            onClick={() => handleFindPharmacy(prescription)}
          >
            Chercher dans pharmacie
          </button>
        </div>
      </div>
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
      case 'commandes':
        return renderCommandes();
      case 'prescriptions':
        return selectedPrescription
          ? renderPrescriptionDetails(selectedPrescription)
          : renderPrescriptions();
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