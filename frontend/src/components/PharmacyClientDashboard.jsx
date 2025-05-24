import React, { useState } from 'react';
import { ShoppingCart, Clock, FileText, User, LogOut, Settings, Pencil, MapPin } from 'lucide-react';
import '../styles/PharmacyClientDashboard.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Barcode from 'react-barcode';

const PharmacyClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracétamol 500mg', price: 250, quantity: 2, pharmacy: 'Pharmacie Central' },
    { id: 2, name: 'Doliprane 1000mg', price: 180, quantity: 1, pharmacy: 'Pharmacie du Centre' }
  ]);
  const [orders] = useState([
    {
      id: 'CMD001',
      date: '2024-05-15',
      total: 850,
      status: 'Livrée',
      pharmacy: 'Pharmacie Central',
      items: [
        { nom: "Amoxicilline 500mg", posologie: "3x/jour", quantite: 2, prix: 250 },
        { nom: "Doliprane 1000mg", posologie: "2x/jour", quantite: 1, prix: 180 }
      ]
    },
    {
      id: 'CMD002',
      date: '2024-05-18',
      total: 320,
      status: 'En cours',
      pharmacy: 'Pharmacie du Centre',
      items: [
        { nom: "Ibuprofène 400mg", posologie: "1x/jour", quantite: 2, prix: 160 }
      ]
    }
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

  const [profile, setProfile] = useState({
    nom: "Ahmed Benali",
    email: "ahmed.benali@email.com",
    date_naissance: "1990-05-12",
    sexe: "Homme",
    wilaya: "Alger",
    commune: "Bab Ezzouar",
    adresse: "123 Rue des Martyrs, Bab Ezzouar, Alger",
    telephone: "+213 555 123 456"
  });
  const [editProfile, setEditProfile] = useState({
    adresse: profile.adresse,
    wilaya: profile.wilaya,
    commune: profile.commune,
    telephone: profile.telephone
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);

  // Per-field edit state
  const [fieldEdit, setFieldEdit] = useState({
    email: false,
    wilaya: false,
    commune: false,
    adresse: false,
    telephone: false,
  });

  const handleProfileEdit = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...editProfile });
    setIsEditing(false);
  };

  // Handler for per-field edit
  const handleFieldEdit = (field) => {
    setFieldEdit((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])), // disable others
      [field]: true
    }));
  };

  // Handler for field change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  // Save all changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...editProfile });
    setShowEditCard(false);
    setFieldEdit({
      email: false,
      wilaya: false,
      commune: false,
      adresse: false,
      telephone: false,
    });
  };

  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Mon profil' },
    // { id: 'panier', icon: ShoppingCart, label: 'Panier' }, // Removed Panier
    { id: 'commandes', icon: Clock, label: 'Mes commandes' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  // Main profile card
  const renderProfile = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title" style={{ color: "#3d5a40", fontFamily: "Montserrat, 'Segoe UI', Arial, sans-serif" }}>
        Mon profil
      </h2>
      <form className="dashboard-form">
        <div className="dashboard-form-row">
          <div>
            <label>Nom complet</label>
            <input type="text" value={profile.nom} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={profile.email} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
        </div>
        <div className="dashboard-form-row">
          <div>
            <label>Date de naissance</label>
            <input type="text" value={profile.date_naissance} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
          <div>
            <label>Sexe</label>
            <input type="text" value={profile.sexe} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
        </div>
        <div className="dashboard-form-row">
          <div>
            <label>Wilaya</label>
            <input type="text" value={profile.wilaya} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
          <div>
            <label>Commune</label>
            <input type="text" value={profile.commune} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
        </div>
        <div className="dashboard-form-row">
          <div>
            <label>Téléphone</label>
            <input type="tel" value={profile.telephone} disabled style={{ background: "#f8faf8", color: "#222" }} />
          </div>
          <div>
            <label>Adresse</label>
            <textarea
              value={profile.adresse}
              disabled
              rows={3}
              style={{
                background: "#f8faf8",
                color: "#222",
                resize: "none",
                fontFamily: "inherit",
                fontSize: "1.08rem",
                overflow: "hidden" // This hides the scrollbars
                
              }}
            />
          </div>
        </div>
        <button
          className="dashboard-action-btn"
          type="button"
          onClick={() => setShowEditCard(true)}
          style={{ background: "#3d5a40", fontFamily: "Montserrat, 'Segoe UI', Arial, sans-serif" }}
        >
          Modifier mes informations
        </button>
      </form>
    </div>
  );

  // Edit card for modifiable fields
  const renderEditCard = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title" style={{ color: "#3d5a40", fontFamily: "Montserrat, 'Segoe UI', Arial, sans-serif" }}>
        Modifier mes informations
      </h2>
      <form className="dashboard-form" onSubmit={handleSaveChanges}>
        <div className="dashboard-form-row">
          <div
            style={{ position: "relative", cursor: fieldEdit.email ? "text" : "pointer" }}
          >
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editProfile.email ?? profile.email}
              onClick={() => { if (!fieldEdit.email) handleFieldEdit("email"); }}
              onChange={e => {
                if (!fieldEdit.email) {
                  handleFieldEdit("email");
                  return;
                }
                handleFieldChange(e);
              }}
              style={{
                background: fieldEdit.email ? "#fff" : "#f8faf8",
                color: "#222",
                cursor: fieldEdit.email ? "text" : "pointer"
              }}
              required
            />
            <button
              type="button"
              className="field-edit-btn"
              tabIndex={-1}
              onClick={e => { e.stopPropagation(); handleFieldEdit("email"); }}
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>
        <div className="dashboard-form-row">
          <div style={{ position: "relative", cursor: fieldEdit.wilaya ? "text" : "pointer" }}>
            <label>Wilaya</label>
            <input
              type="text"
              name="wilaya"
              value={editProfile.wilaya}
              onClick={() => { if (!fieldEdit.wilaya) handleFieldEdit("wilaya"); }}
              onChange={e => {
                if (!fieldEdit.wilaya) {
                  handleFieldEdit("wilaya");
                  return;
                }
                handleFieldChange(e);
              }}
              style={{
                background: fieldEdit.wilaya ? "#fff" : "#f8faf8",
                color: "#222",
                cursor: fieldEdit.wilaya ? "text" : "pointer"
              }}
              required
            />
            <button
              type="button"
              className="field-edit-btn"
              style={{
                position: "absolute",
                right: 8,
                top: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#3d5a40"
              }}
              onClick={() => handleFieldEdit("wilaya")}
              tabIndex={-1}
            >
              <Pencil size={18} />
            </button>
          </div>
          <div style={{ position: "relative", cursor: fieldEdit.commune ? "text" : "pointer" }}>
            <label>Commune</label>
            <input
              type="text"
              name="commune"
              value={editProfile.commune}
              onClick={() => { if (!fieldEdit.commune) handleFieldEdit("commune"); }}
              onChange={e => {
                if (!fieldEdit.commune) {
                  handleFieldEdit("commune");
                  return;
                }
                handleFieldChange(e);
              }}
              style={{
                background: fieldEdit.commune ? "#fff" : "#f8faf8",
                color: "#222",
                cursor: fieldEdit.commune ? "text" : "pointer"
              }}
              required
            />
            <button
              type="button"
              className="field-edit-btn"
              style={{
                position: "absolute",
                right: 8,
                top: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#3d5a40"
              }}
              onClick={() => handleFieldEdit("commune")}
              tabIndex={-1}
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>
        <div className="dashboard-form-row">
          <div style={{ position: "relative", cursor: fieldEdit.telephone ? "text" : "pointer" }}>
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={editProfile.telephone}
              onClick={() => { if (!fieldEdit.telephone) handleFieldEdit("telephone"); }}
              onChange={e => {
                if (!fieldEdit.telephone) {
                  handleFieldEdit("telephone");
                  return;
                }
                handleFieldChange(e);
              }}
              style={{
                background: fieldEdit.telephone ? "#fff" : "#f8faf8",
                color: "#222",
                cursor: fieldEdit.telephone ? "text" : "pointer"
              }}
              required
            />
            <button
              type="button"
              className="field-edit-btn"
              style={{
                position: "absolute",
                right: 8,
                top: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#3d5a40"
              }}
              onClick={() => handleFieldEdit("telephone")}
              tabIndex={-1}
            >
              <Pencil size={18} />
            </button>
          </div>
          <div style={{ position: "relative", cursor: fieldEdit.adresse ? "text" : "pointer" }}>
            <label>Adresse</label>
            <textarea
              name="adresse"
              rows={2}
              value={editProfile.adresse}
              onClick={() => { if (!fieldEdit.adresse) handleFieldEdit("adresse"); }}
              onChange={e => {
                if (!fieldEdit.adresse) {
                  handleFieldEdit("adresse");
                  return;
                }
                handleFieldChange(e);
              }}
              style={{
                background: fieldEdit.adresse ? "#fff" : "#f8faf8",
                color: "#222",
                resize: "none",
                fontFamily: "inherit",
                fontSize: "1.08rem"
              }}
              required
            />
            <button
              type="button"
              className="field-edit-btn"
              style={{
                position: "absolute",
                right: 8,
                top: 36,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#3d5a40"
              }}
              onClick={() => handleFieldEdit("adresse")}
              tabIndex={-1}
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>
        <button
          className="dashboard-action-btn"
          type="submit"
          style={{ background: "#3d5a40", fontFamily: "Montserrat, 'Segoe UI', Arial, sans-serif" }}
        >
          Sauvegarder mes changements
        </button>
        <button
          type="button"
          className="dashboard-action-btn"
          style={{ background: "#b0b0b0", marginTop: 8 }}
          onClick={() => setShowEditCard(false)}
        >
          Annuler
        </button>
      </form>
    </div>
  );

  // Fix: Align icon and text for "Historique des commandes"
  const renderCommandes = () => (
    selectedOrder
      ? renderOrderDetails(selectedOrder)
      : (
        <div className="dashboard-card">
          <h2 className="dashboard-title" style={{ color: "#3d5a40", fontFamily: "Montserrat, 'Segoe UI', Arial, sans-serif", marginBottom: 18 }}>
            Mes commandes
          </h2>
          <div className="commandes-list">
            {orders.length === 0 ? (
              <div className="dashboard-empty">
                <Clock size={64} className="dashboard-empty-icon" />
                <p>Aucune commande trouvée</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="commandes-list-item" style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f9f8f4",
                  borderRadius: 10,
                  marginBottom: 18,
                  boxShadow: "0 1px 4px 0 rgba(44,62,80,0.04)",
                  width: "100%",
                  padding: "18px 20px",
                  boxSizing: "border-box"
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div><b>Commande:</b> #{order.id}</div>
                    <div><b>Pharmacie:</b> {order.pharmacy}</div>
                    <div><b>Date:</b> {order.date}</div>
                    <div><b>Total:</b> {order.total} DA</div>
                    <div>
                      <b>Statut:</b>
                      <span className={`dashboard-status dashboard-status-${order.status.replace(/\s/g, '').toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <button
                    className="dashboard-action-btn-small"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Détails
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )
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
              width: "100%",
              padding: "18px 20px", // Add padding for better spacing
              boxSizing: "border-box",
              wordBreak: "break-word" // Allow long text to wrap
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
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
        <div className="prescription-content">
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
        </div>
      </div>
      {/* Move the buttons OUTSIDE of .prescription-layout */}
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
  );

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add your password change logic here
    setShowPasswordForm(false);
    setPasswordFields({ current: "", new: "", confirm: "" });
  };

  const renderSettings = () => (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Paramètres</h2>
      {!showPasswordForm ? (
        <button
          className="dashboard-action-btn"
          type="button"
          onClick={() => setShowPasswordForm(true)}
          style={{ marginBottom: 24 }}
        >
          Changer le mot de passe
        </button>
      ) : (
        <form className="dashboard-form" onSubmit={handlePasswordSubmit} style={{ marginBottom: 24 }}>
          <div>
            <label>Mot de passe actuel</label>
            <input
              type="password"
              name="current"
              value={passwordFields.current}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              name="new"
              value={passwordFields.new}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirm"
              value={passwordFields.confirm}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button className="dashboard-action-btn" type="submit">
            Enregistrer les modifications
          </button>
          <button
            type="button"
            className="dashboard-action-btn"
            style={{ background: "#b0b0b0", marginTop: 8 }}
            onClick={() => setShowPasswordForm(false)}
          >
            Annuler
          </button>
        </form>
      )}
      <hr style={{ margin: "32px 0" }} />
      <button className="dashboard-remove-btn" style={{ color: "#e74c3c", fontWeight: 500 }}>
        Supprimer mon compte
      </button>
    </div>
  );

  // New order details rendering
  const renderOrderDetails = (order) => (
    <div className="dashboard-card">
      <button
        className="dashboard-action-btn-small"
        style={{ marginBottom: 16 }}
        onClick={() => setSelectedOrder(null)}
      >
        Retour à la liste
      </button>
      <h2 className="dashboard-title" style={{ color: "#3d5a40" }}>
        Détails de la commande
      </h2>
      <div style={{ marginBottom: 16 }}>
        <div><b>Commande:</b> #{order.id}</div>
        <div>
          <b>Pharmacie:</b>{" "}
          <span
            className="pharmacy-link"
            onClick={() => navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`)}
            tabIndex={0}
            role="button"
            style={{ userSelect: "none" }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`);
              }
            }}
          >
            <MapPin size={18} style={{ marginRight: 6, marginBottom: -2, color: "#388e3c" }} />
            {order.pharmacy}
          </span>
        </div>
        <div><b>Date:</b> {order.date}</div>
        <div><b>Total:</b> {order.total} DA</div>
        <div>
          <b>Statut:</b>{" "}
          <span className={`dashboard-status dashboard-status-${order.status.replace(/\s/g, '').toLowerCase()}`}>
            {order.status}
          </span>
        </div>
      </div>
      <h3 style={{ marginTop: 24, marginBottom: 12 }}>Médicaments commandés</h3>
      <div>
        {(order.items || []).length === 0 ? (
          <div>Aucun médicament dans cette commande.</div>
        ) : (
          <table style={{ width: "100%", background: "#fff", borderRadius: 8, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ padding: 8, textAlign: "left" }}>Nom</th>
                <th style={{ padding: 8, textAlign: "left" }}>Posologie</th>
                <th style={{ padding: 8, textAlign: "left" }}>Quantité</th>
                <th style={{ padding: 8, textAlign: "left" }}>Prix unitaire</th>
                <th style={{ padding: 8, textAlign: "left" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((med, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 8 }}>{med.nom}</td>
                  <td style={{ padding: 8 }}>{med.posologie}</td>
                  <td style={{ padding: 8 }}>{med.quantite}</td>
                  <td style={{ padding: 8 }}>{med.prix} DA</td>
                  <td style={{ padding: 8 }}>{med.prix * med.quantite} DA</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'profile') {
      return showEditCard ? renderEditCard() : renderProfile();
    }
    // ...rest unchanged...
    if (activeSection === 'commandes') return renderCommandes();
    if (activeSection === 'prescriptions') return selectedPrescription
      ? renderPrescriptionDetails(selectedPrescription)
      : renderPrescriptions();
    if (activeSection === 'settings') return renderSettings();
    return renderProfile();
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