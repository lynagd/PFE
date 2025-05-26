import React, { useState } from 'react';
import { ShoppingCart, Clock, FileText, User, LogOut, Settings, Pencil, MapPin } from 'lucide-react';
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
      specialite: 'Médecin Généraliste',
      date: '2024-05-18',
      medications: [
        { nom: "Amoxicilline 500mg", posologie: "3x/jour", quantite: 10 },
        { nom: "Doliprane 1000mg", posologie: "2x/jour", quantite: 6 }
      ],
      status: 'Active',
      signatureUrl: '/assets/signature of the same medecin.png',
      cachetUrl: ' /assets/personalized cachet for medecin with text replaced with infos from the screenshot.png'
    },
    {
      id: 'ORD002',
      doctor: 'Dr. Benali Ahmed',
      specialite: 'Médecin Généraliste',
      date: '2024-05-22',
      medications: [
        { nom: "Ibuprofène 400mg", posologie: "1x/jour", quantite: 8 },
        { nom: "Vitamine C 500mg", posologie: "1x/jour", quantite: 10 }
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
    email: profile.email,
    adresse: profile.adresse,
    wilaya: profile.wilaya,
    commune: profile.commune,
    telephone: profile.telephone
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);

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

  const handleFieldEdit = (field) => {
    setFieldEdit((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
      [field]: true
    }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

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
    { id: 'commandes', icon: Clock, label: 'Mes commandes' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  // --- Tailwind Dashboard Card ---
  // Change cardClass to use the same background as the page: #faf8f3
  const cardClass = "bg-[#faf8f3] rounded-2xl shadow-none px-8 py-8 w-full max-w-2xl flex flex-col items-stretch";

  // --- Profile ---
  const renderProfile = () => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-khder mb-6">profil</h2>
      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Nom complet</label>
            <input type="text" value={profile.nom} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Email</label>
            <input type="email" value={profile.email} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Date de naissance</label>
            <input type="text" value={profile.date_naissance} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Sexe</label>
            <input type="text" value={profile.sexe} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Wilaya</label>
            <input type="text" value={profile.wilaya} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Commune</label>
            <input type="text" value={profile.commune} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-khder font-semibold mb-1">Téléphone</label>
            <input type="tel" value={profile.telephone} disabled className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222]" />
          </div>
          <div>
            <label className="block text-khder font-semibold mb-1">Adresse</label>
            <textarea
              value={profile.adresse}
              disabled
              rows={1}
              className="w-full px-4 py-3 rounded-lg border border-lsecondary bg-smth text-[#222] resize-none h-[52px] min-h-[52px] max-h-[52px] overflow-hidden"
            />
          </div>
        </div>
        <button
          className="w-full bg-tchini text-[#222] font-semibold rounded-lg py-3 mt-2 shadow hover:bg-yellow-400 transition"
          type="button"
          onClick={() => setShowEditCard(true)}
        >
          Modifier informations
        </button>
      </form>
    </div>
  );

  // --- Edit Card ---
  const renderEditCard = () => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6">Modifier informations</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSaveChanges}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={editProfile.email}
                onChange={handleProfileEdit}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5a40]">
                <Pencil size={18} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Commune</label>
            <div className="relative">
              <input
                type="text"
                name="commune"
                value={editProfile.commune}
                onChange={handleProfileEdit}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5a40]">
                <Pencil size={18} />
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Wilaya</label>
            <div className="relative">
              <input
                type="text"
                name="wilaya"
                value={editProfile.wilaya}
                onChange={handleProfileEdit}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5a40]">
                <Pencil size={18} />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Adresse</label>
            <div className="relative">
              <textarea
                name="adresse"
                rows={2}
                value={editProfile.adresse}
                onChange={handleProfileEdit}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222] resize-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5a40]">
                <Pencil size={18} />
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Téléphone</label>
            <div className="relative">
              <input
                type="tel"
                name="telephone"
                value={editProfile.telephone}
                onChange={handleProfileEdit}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3d5a40]">
                <Pencil size={18} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-400 transition" type="submit">
            Enregistrer
          </button>
          <button
            className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
            type="button"
            onClick={() => setShowEditCard(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );

  // --- Commandes ---
  const renderCommandes = () => (
    selectedOrder
      ? renderOrderDetails(selectedOrder)
      : (
        <div className={cardClass}>
          <h2 className="text-xl font-bold text-[#3d5a40] mb-6">commandes</h2>
          <div>
            {orders.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <Clock size={64} className="mx-auto mb-2" />
                <p>Aucune commande trouvée</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="flex flex-col md:flex-row justify-between items-center bg-[#f9f8f4] rounded-lg mb-4 shadow p-5 w-full">
                  <div className="flex-1 min-w-0">
                    <div><b>Commande:</b> #{order.id}</div>
                    <div><b>Pharmacie:</b> {order.pharmacy}</div>
                    <div><b>Date:</b> {order.date}</div>
                    <div><b>Total:</b> {order.total} DA</div>
                    <div>
                      <b>Statut:</b>
                      <span
                        className={
                          "inline-block rounded px-3 py-1 ml-2 text-xs font-semibold " +
                          (order.status === "Livrée"
                            ? "bg-[#d7f5df] text-[#3d5a40]"
                            : order.status === "En cours" || order.status === "Acceptée"
                            ? "bg-[#FFD600] text-[#3d5a40]"
                            : "bg-[#f4f4f4] text-[#444]")
                        }
                      >
                        {order.status === "En cours" ? "Acceptée" : order.status}
                      </span>
                    </div>
                  </div>
                  <button
                    className="mt-4 md:mt-0 md:ml-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-400 transition"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Détails
                  </button>
                </div>
              )))}
          </div>
        </div>
      )
  );

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

  const handleFindPharmacy = (prescription) => {
    navigate('/nearby-pharmacies', { state: { meds: prescription.medications.map(m => m.nom) } });
  };

  // --- Prescriptions ---
  const renderPrescriptions = () => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6"> prescriptions</h2>
      {prescriptions.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <FileText size={64} className="mx-auto mb-2" />
          <p>Aucune prescription trouvée</p>
        </div>
      ) : (
        <div>
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="flex flex-col md:flex-row justify-between items-center bg-[#f9f8f4] rounded-lg mb-4 shadow p-5 w-full">
              <div className="flex-1 min-w-0">
                <div><b>Médecin:</b> {prescription.doctor}</div>
                <div><b>Spécialité:</b> {prescription.specialite}</div>
                <div><b>Date:</b> {prescription.date}</div>
              </div>
              <button
                className="mt-4 md:mt-0 md:ml-4 bg-yellow-500 text-[#222] font-semibold rounded-lg px-6 py-2 shadow hover:bg-yellow-400 transition"
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

  // --- Prescription Details ---
  const renderPrescriptionDetails = (prescription) => (
    <div className="flex flex-col items-center">
      <div className={cardClass}>
        <div className="prescription-layout">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <strong>Dr. Benali Ahmed</strong><br />
                Médecin Généraliste<br />
                12, Rue des Lilas 16000<br />
                Alger<br />
                Téléphone: 06 12 34 56 78
              </div>
              <div className="bg-[#fafafa] border border-gray-300 rounded-lg px-6 py-3 min-w-[180px] mt-4 md:mt-0">
                <div><b>Nom:</b> Ahmed</div>
                <div><b>Prénom:</b> Benali</div>
                <div><b>Âge:</b> 34</div>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span><b>Fait le :</b> {prescription.date}</span>
            </div>
            <h2 className="text-center font-bold text-lg my-3">Ordonnance</h2>
            <div className="mb-4">
              {prescription.medications.map((med, idx) => (
                <div key={idx} className="mb-2">
                  <b className="text-base">{med.nom}</b> — {med.posologie} | Quantité: {med.quantite}
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-end justify-between mt-6 gap-6">
              <div className="flex flex-col items-center">
                <Barcode value="0291-672" height={60} width={2} fontSize={18} />
              </div>
              <div className="flex gap-8 items-center">
                <div className="text-center">
                  Signature:<br />
                  <img
                    src={prescription.signatureUrl || "/signature-placeholder.png"}
                    alt="Signature"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
                <div className="text-center">
                  Cachet:<br />
                  <img
                    src={prescription.cachetUrl || "/cachet-placeholder.png"}
                    alt="Cachet"
                    className="h-20 mt-1 bg-transparent inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6 w-full max-w-2xl">
        <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-400 transition" onClick={handleDownloadPDF}>
          Enregistrer
        </button>
        <button
          className="w-full bg-[#3d5a40] text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
          onClick={() => handleFindPharmacy(prescription)}
        >
          Chercher dans pharmacie
        </button>
        <button
          className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
          onClick={() => setSelectedPrescription(null)}
        >
          Retour à la liste
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
    setShowPasswordForm(false);
    setPasswordFields({ current: "", new: "", confirm: "" });
  };

  // --- Settings ---
  const renderSettings = () => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6">Paramètres</h2>
      {!showPasswordForm ? (
        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-[#3d5a40] text-white font-semibold rounded-lg py-3 shadow hover:bg-[#2d3d2a] transition"
            type="button"
            onClick={() => setShowPasswordForm(true)}
          >
            Changer le mot de passe
          </button>
          <button
            className="w-full bg-red-100 text-red-600 font-semibold rounded-lg py-3 shadow hover:bg-red-200 transition"
            type="button"
          >
            Supprimer mon compte
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Mot de passe actuel</label>
            <input
              type="password"
              name="current"
              value={passwordFields.current}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              name="new"
              value={passwordFields.new}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div>
            <label className="block text-[#355c3a] font-semibold mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirm"
              value={passwordFields.confirm}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#d2e3db] bg-[#f8faf8] text-[#222]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button className="w-full bg-yellow-500 text-[#222] font-semibold rounded-lg py-3 shadow hover:bg-yellow-400 transition" type="submit">
              Enregistrer les modifications
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white font-semibold rounded-lg py-3 shadow hover:bg-gray-500 transition"
              onClick={() => setShowPasswordForm(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
      <hr className="my-8" />
    </div>
  );

  // --- Order Details ---
  const renderOrderDetails = (order) => (
    <div className={cardClass}>
      <h2 className="text-xl font-bold text-[#3d5a40] mb-6">Détails de la commande</h2>
      <div className="mb-4">
        <div><b>Commande:</b> #{order.id}</div>
        <div>
          <b>Pharmacie:</b>{" "}
          <span
            className="inline-flex items-center font-semibold text-green-700 cursor-pointer hover:underline"
            onClick={() => navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`)}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/pharmacy-profile/${encodeURIComponent(order.pharmacy)}`);
              }
            }}
          >
            <MapPin size={18} className="mr-1" />
            {order.pharmacy}
          </span>
        </div>
        <div><b>Date:</b> {order.date}</div>
        <div><b>Total:</b> {order.total} DA</div>
        <div>
          <b>Statut:</b>{" "}
          <span
            className={
              "inline-block rounded px-3 py-1 ml-2 text-xs font-semibold " +
              (order.status === "Livrée"
                ? "bg-[#d7f5df] text-[#3d5a40]"
                : order.status === "En cours" || order.status === "Acceptée"
                ? "bg-[#FFD600] text-[#3d5a40]"
                : "bg-[#f4f4f4] text-[#444]")
            }
          >
            {order.status === "En cours" ? "Acceptée" : order.status}
          </span>
        </div>
      </div>
      <h3 className="mt-6 mb-3 font-semibold">Médicaments commandés</h3>
      <div>
        {(order.items || []).length === 0 ? (
          <div>Aucun médicament dans cette commande.</div>
        ) : (
          <table className="w-full bg-white rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left">Nom</th>
                <th className="py-2 px-3 text-left">Quantité</th>
                <th className="py-2 px-3 text-left">Prix unitaire</th>
                <th className="py-2 px-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((med, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-3">{med.nom}</td>
                  <td className="py-2 px-3">{med.quantite}</td>
                  <td className="py-2 px-3">{med.prix} DA</td>
                  <td className="py-2 px-3">{med.prix * med.quantite} DA</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {(order.items || []).length > 0 && (
        <div className="flex justify-end mt-4">
          <span className="text-lg font-bold text-[#3d5a40]">
            Total: {order.items.reduce((sum, med) => sum + med.prix * med.quantite, 0)} DA
          </span>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-gray-400 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-gray-500 transition"
          type="button"
          onClick={() => setSelectedOrder(null)}
        >
          Retourner à la liste
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeSection === 'profile') {
      return showEditCard ? renderEditCard() : renderProfile();
    }
    if (activeSection === 'commandes') return renderCommandes();
    if (activeSection === 'prescriptions') return selectedPrescription
      ? renderPrescriptionDetails(selectedPrescription)
      : renderPrescriptions();
    if (activeSection === 'settings') return renderSettings();
    return renderProfile();
  };

  const handleSidebarClick = (id) => {
    if (id === 'logout') {
      window.location.href = '/login';
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf8f3]">
      <aside className="fixed top-0 left-0 h-full w-60 bg-[#3d5a40] text-white flex flex-col items-center z-50 shadow-lg">
        <div className="flex items-center gap-3 mt-8 mb-10 tracking-wide text-xl font-bold">
          <User size={28} />
          <span>{profile.nom}</span>
        </div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  activeSection === item.id
                    ? "bg-[#355c3a] text-white border-l-yellow-500"
                    : "text-[#e6f2e9] border-l-transparent hover:bg-[#355c3a]"
                }`}
              >
                <Icon size={24} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-60 flex flex-col items-center py-10 px-6 bg-[#faf8f3] min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default PharmacyClientDashboard;