import React, { useState } from 'react';
import { ShoppingCart, Clock, FileText, User, LogOut, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Barcode from 'react-barcode';

import ClientProfile from '../components/ClientProfile';
import ClientProfileEdit from '../components/ClientProfileEdit';
import ClientCommandes from '../components/ClientCommandes';
import ClientPrescriptions from '../components/ClientPrescriptions';
import ClientParametres from '../components/ClientParametres';

const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse params from URL
  const params = new URLSearchParams(location.search);
  const section = params.get('section') || 'profile';
  const orderId = params.get('order');
  const prescriptionId = params.get('prescription');
  const passwordFormOpen = params.get('password') === '1';
  const editProfileOpen = params.get('edit') === '1';

  // Data and state (same as before)
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
      status: 'Acceptée',
      pharmacy: 'Pharmacie du Centre',
      items: [
        { nom: "Ibuprofène 400mg", posologie: "1x/jour", quantite: 2, prix: 160 }
      ]
    }
  ]);
  const [prescriptions] = useState([
    {
      id: 'ORD001',
      doctor: {
        nom: 'Dr. Yacine B.',
        specialite: 'Médecin Généraliste',
        wilaya: 'Alger',
        telephone: '+213 555 987 654'
      },
      patient: {
        nom: 'Ahmed',
        prenom: 'Benali',
        age: 34
      },
      date_prescription: '2024-05-18',
      codebarre: '0291-672',
      produits_prescrits: [
        {
          nom: 'Amoxicilline 500mg',
          dosage: '500mg',
          forme: 'Comprimé',
          quantite: 2,
          instruction: '3x/jour pendant 7 jours'
        },
        {
          nom: 'Doliprane 1000mg',
          dosage: '1000mg',
          forme: 'Comprimé',
          quantite: 1,
          instruction: '2x/jour après repas'
        }
      ],
      instruction_supplementaire: '',
      signatureUrl: '/assets/doctor-signature.png',
      cachetUrl: '/assets/doctor-cachet.png'
    },
    {
      id: 'ORD002',
      doctor: {
        nom: 'Dr. Benali Ahmed',
        specialite: 'Médecin Généraliste',
        wilaya: 'Alger',
        telephone: '06 12 34 56 78'
      },
      patient: {
        nom: 'Ahmed',
        prenom: 'Benali',
        age: 34
      },
      date_prescription: '2024-05-22',
      codebarre: '123456',
      produits_prescrits: [
        {
          nom: "IBUPROFÈNE 400mg",
          dosage: "400mg",
          forme: "Comprimé",
          quantite: 2,
          instruction: "1x/jour"
        },
        {
          nom: "VITAMINE C 500mg",
          dosage: "500mg",
          forme: "Comprimé",
          quantite: 1,
          instruction: "1x/jour"
        }
      ],
      instruction_supplementaire: "",
      signatureUrl: '/assets/signature.png',
      cachetUrl: '/assets/cachet.png'
    }
    // ...other prescriptions
  ]);
  const selectedOrder = orders.find(o => o.id === orderId);
  const selectedPrescription = prescriptions.find(p => p.id === prescriptionId);

  const [profile, setProfile] = useState({
    nom: "Ahmed",
    prenom: "Benali",
    email: "ahmed.benali@email.com",
    date_naissance: "1990-05-12",
    sexe: "Masculin",
    wilaya: "Alger",
    commune: "Bab Ezzouar",
    adresse: "123 Rue des Martyrs, Bab Ezzouar, Alger",
    telephone: "+213 555 123 456"
  });
  const [editProfile, setEditProfile] = useState({
    nom: profile.nom,
    prenom: profile.prenom,
    email: profile.email,
    adresse: profile.adresse,
    wilaya: profile.wilaya,
    commune: profile.commune,
    telephone: profile.telephone,
    sexe: profile.sexe
  });
  const [showEditCard, setShowEditCard] = useState(false);

  const handleProfileEdit = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfile({ ...profile, ...editProfile });
    navigate('?section=profile');
  };

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
    setPasswordFields({ current: "", new: "", confirm: "" });
    navigate('?section=settings');
  };

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

  // Sidebar navigation
  const sidebarItems = [
    { id: 'profile', icon: User, label: 'Mon profil' },
    { id: 'commandes', icon: Clock, label: 'Mes commandes' },
    { id: 'prescriptions', icon: FileText, label: 'Mes prescriptions' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
    { id: 'logout', icon: LogOut, label: 'Déconnexion' }
  ];

  const handleSidebarClick = (id) => {
    if (id === 'logout') {
      window.location.href = '/login';
    } else {
      navigate(`?section=${id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#faf8f3]">
      <aside className="fixed top-0 left-0 h-full w-60 bg-[#3d5a40] text-white flex flex-col items-center z-50 shadow-lg">
        <div className="flex items-center gap-3 mt-8 mb-10 tracking-wide text-xl font-bold">
          <User size={28} />
          <span>{profile.nom} {profile.prenom}</span>
        </div>
        <nav className="flex flex-col w-full gap-0 mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSidebarClick(item.id)}
                className={`flex items-center gap-3 px-6 py-3 w-full text-base font-medium transition border-l-4 ${
                  section === item.id
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
      <main className="flex-1 ml-60 flex flex-col items-start py-10 px-12 bg-[#faf8f3] min-h-screen w-full">
        {section === 'profile' && (
          editProfileOpen
            ? <ClientProfileEdit
                editProfile={editProfile}
                handleProfileEdit={handleProfileEdit}
                handleSaveChanges={handleSaveChanges}
                onCancel={() => navigate(-1)}
              />
            : <ClientProfile
                profile={profile}
                onEditProfile={() => navigate(`?section=profile&edit=1`)}
              />
        )}
        {section === 'commandes' && (
          <ClientCommandes
            orders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={(order) =>
              navigate(order ? `?section=commandes&order=${order.id}` : `?section=commandes`)
            }
            navigate={navigate}
          />
        )}
        {section === 'prescriptions' && (
          <ClientPrescriptions
            prescriptions={prescriptions}
            selectedPrescription={selectedPrescription}
            setSelectedPrescription={(prescription) =>
              navigate(prescription ? `?section=prescriptions&prescription=${prescription.id}` : `?section=prescriptions`)
            }
            handleDownloadPDF={handleDownloadPDF}
            handleFindPharmacy={handleFindPharmacy}
          />
        )}
        {section === 'settings' && (
          <ClientParametres
            showPasswordForm={passwordFormOpen}
            passwordFields={passwordFields}
            handlePasswordChange={handlePasswordChange}
            handlePasswordSubmit={handlePasswordSubmit}
            onOpenPasswordForm={() => navigate(`?section=settings&password=1`)}
            onClosePasswordForm={() => navigate(-1)}
          />
        )}
      </main>
    </div>
  );
};

export default ClientDashboardPage;