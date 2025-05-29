import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaRoute, FaSyncAlt, FaSearchLocation, FaShoppingCart } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const defaultPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    lat: 36.752887,
    lng: 3.042048,
    address: "123 Rue Principale, Alger",
    hours: "08:00 - 20:00",
    phone: "0555 55 55 55",
    livraison: true,
  },
  {
    id: 2,
    name: "Pharmacie El Amel",
    lat: 36.753,
    lng: 3.05,
    address: "456 Avenue de l'Indépendance, Alger",
    hours: "09:00 - 22:00",
    phone: "0666 66 66 66",
    livraison: false,
  },
];

// 1. Add more sample products and simulate a "panier" (cart) with desired quantities
const sampleProducts = [
  { id: 1, name: "Paracétamol", available: 20 },
  { id: 2, name: "Ibuprofène", available: 15 },
  { id: 3, name: "Vitamine C", available: 10 },
  { id: 4, name: "Amoxicilline", available: 5 },
  { id: 5, name: "Aspirine", available: 8 },
  { id: 6, name: "Oméprazole", available: 12 },
  { id: 7, name: "Loratadine", available: 7 },
];

// Simulate the user's cart (panier) with desired quantities
const userPanier = [
  { id: 1, name: "Paracétamol", wanted: 5 },
  { id: 2, name: "Ibuprofène", wanted: 10 },
  { id: 3, name: "Vitamine C", wanted: 12 },
  { id: 4, name: "Amoxicilline", wanted: 2 },
  { id: 5, name: "Aspirine", wanted: 8 },
  { id: 6, name: "Oméprazole", wanted: 3 },
  { id: 7, name: "Loratadine", wanted: 10 },
];

const NearbyPharmacies = () => {
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState(defaultPharmacies);
  const [filtered, setFiltered] = useState(defaultPharmacies);
  const [userPosition, setUserPosition] = useState(null);
  const [manualAddress, setManualAddress] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [openNow, setOpenNow] = useState(false);
  const [status, setStatus] = useState("Position non détectée.");
  const [accuracy, setAccuracy] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  // Haversine formula
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Filter logic
  useEffect(() => {
    let filteredList = pharmacies;
    if (userPosition) {
      filteredList = filteredList
        .map((ph) => ({
          ...ph,
          distance: haversineDistance(userPosition.lat, userPosition.lng, ph.lat, ph.lng),
        }))
        .filter((ph) => ph.distance <= maxDistance);
    }
    if (openNow) {
      filteredList = filteredList.filter((ph) => {
        if (!ph.hours || !ph.hours.includes("-")) return false;
        const [open, close] = ph.hours.split("-").map((s) => s.trim());
        const [oh, om] = open.split(":").map(Number);
        const [ch, cm] = close.split(":").map(Number);
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        const openMins = oh * 60 + om;
        const closeMins = ch * 60 + cm;
        const nowMins = h * 60 + m;
        return nowMins >= openMins && nowMins < closeMins;
      });
    }
    setFiltered(filteredList);
  }, [pharmacies, userPosition, maxDistance, openNow]);

  // Map initialization and marker updates
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [36.75, 3.05],
        zoom: 12,
        zoomControl: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    filtered.forEach((ph) => {
      const marker = L.marker([ph.lat, ph.lng]).addTo(mapRef.current);
      marker.bindPopup(
        `<b>${ph.name}</b><br/>
        <span><b>Adresse:</b> ${ph.address}</span><br/>
        <span><b>Horaires:</b> ${ph.hours}</span><br/>
        <span><b>Téléphone:</b> ${ph.phone}</span><br/>
        <a href="/pharmacy-profile?id=${ph.id}" class="leaflet-popup-link">Voir le profil</a>`
      );
      markersRef.current.push(marker);
    });
    // User marker
    if (userPosition) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userPosition.lat, userPosition.lng]);
      } else {
        userMarkerRef.current = L.marker([userPosition.lat, userPosition.lng], {
          icon: L.icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          }),
        })
          .addTo(mapRef.current)
          .bindPopup("Votre position");
      }
      mapRef.current.setView([userPosition.lat, userPosition.lng], 13);
    }
    // Fit bounds
    if (filtered.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.5));
    }
    // eslint-disable-next-line
  }, [filtered, userPosition]);

  // Geolocation
  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setStatus("La géolocalisation n'est pas prise en charge.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus(
          `Position détectée : ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
        );
        setAccuracy(`Précision : ±${pos.coords.accuracy.toFixed(2)} m`);
        setLoading(false);
      },
      (err) => {
        setStatus("Impossible de détecter la position.");
        setAccuracy("");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // Manual address geocoding
  const handleManualAddress = async () => {
    if (!manualAddress) {
      setStatus("Veuillez entrer une adresse valide.");
      return;
    }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        manualAddress
      )}&format=json&limit=1`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "PharmacyLocator/1.0 (sirinesaad98@gmail.com)",
        },
      });
      const data = await res.json();
      if (data && data.length > 0) {
        setUserPosition({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
        setStatus(
          `Position manuelle : ${parseFloat(data[0].lat).toFixed(4)}, ${parseFloat(data[0].lon).toFixed(4)}`
        );
        setAccuracy("");
      } else {
        setStatus("Adresse non trouvée.");
      }
    } catch (e) {
      setStatus("Erreur lors de la recherche d'adresse.");
    }
    setLoading(false);
  };

  // Open order modal for a pharmacy
  const handleCommanderClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOrderProducts(
      sampleProducts.map((prod) => {
        const panierItem = userPanier.find((p) => p.id === prod.id);
        const wanted = panierItem ? panierItem.wanted : 1;
        return {
          ...prod,
          checked: !!panierItem,
          quantity: wanted,
        };
      })
    );
    setShowOrderModal(true);
    setOrderSuccess(false);
  };

  // Handle product selection and quantity
  const handleProductCheck = (id) => {
    setOrderProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, checked: !p.checked } : p
      )
    );
  };
  const handleProductQuantity = (id, value, available) => {
    let qty = Math.max(1, Math.min(Number(value), available));
    setOrderProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: qty } : p
      )
    );
  };

  // Handle client info change
  const handleClientInfoChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order submit
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setShowOrderModal(false);
      setOrderSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] font-sans">
      <div className="max-w-[1600px] mx-auto mt-0 px-12 pb-12 relative z-30">
        {/* Controls */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(61,90,64,0.07)] px-10 py-12 mb-8 flex flex-wrap gap-8 justify-between">
          <div className="flex-2 min-w-[320px]">
            <button
              className="bg-khder text-white rounded-lg px-6 py-2 font-semibold text-base mb-2 flex items-center gap-2 transition hover:bg-[#355c3a] disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleGeolocate}
              disabled={loading}
            >
              <FaSearchLocation /> {loading ? "Recherche..." : "Activer la géolocalisation"}
            </button>
            <span className="block text-khder text-base mb-1">{status}</span>
            {accuracy && <span className="block text-khder text-base mb-1">{accuracy}</span>}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={manualAddress}
                onChange={e => setManualAddress(e.target.value)}
                placeholder="Entrer une adresse manuellement"
                className="flex-1 border border-[#b7b7b7] rounded-lg px-3 py-2 text-base"
              />
              <button
                className="bg-white text-khder border-2 border-khder rounded-lg px-4 py-2 font-semibold flex items-center gap-2 transition hover:bg-khder hover:text-white"
                onClick={handleManualAddress}
                type="button"
              >
                <FaSyncAlt /> Valider
              </button>
            </div>
          </div>
          <div className="flex-1 min-w-[220px] flex flex-col gap-3 justify-center">
            <label className="text-base text-khder font-semibold flex items-center gap-2">
              <span>Distance max (km):</span>
              <input
                type="number"
                min={1}
                value={maxDistance}
                onChange={e => setMaxDistance(Number(e.target.value))}
                className="w-16 ml-2 border border-[#b7b7b7] rounded-lg px-2 py-1 text-base"
              />
            </label>
            <label className="flex items-center gap-3 font-medium">
              <input
                type="checkbox"
                checked={openNow}
                onChange={e => setOpenNow(e.target.checked)}
                className="w-5 h-5 accent-khder"
              />
              <span>Pharmacies actuellement ouvertes</span>
            </label>
          </div>
        </div>
        {/* Content */}
        <div className="flex gap-8 flex-wrap mt-0">
          {/* Map card */}
          <div className="flex-[2.5] min-w-[320px] md:min-w-[500px] bg-white rounded-[24px] shadow-[0_8px_32px_rgba(61,90,64,0.07)] px-10 py-12 flex flex-col items-stretch z-0">
            <div id="map" className="w-full h-[420px] rounded-xl border border-[#b7b7b7]"></div>
          </div>
          {/* List card */}
          <div className="flex-[1.8] min-w-[300px] md:min-w-[400px] bg-white rounded-[24px] shadow-[0_8px_32px_rgba(61,90,64,0.07)] px-10 py-12 flex flex-col items-stretch">
            <h2 className="text-khder text-xl font-bold mb-5 text-left">Pharmacies à proximité</h2>
            <ul className="list-none p-0 m-0">
              {filtered.length === 0 ? (
                <li className="text-[#c62828] text-center py-5">Aucune pharmacie disponible.</li>
              ) : (
                filtered.map((ph) => (
                  <li
                    key={ph.id}
                    className="border-b border-[#e0e0e0] py-3 flex items-start justify-between gap-3 hover:bg-[#f5f3ef] hover:shadow-[0_2px_12px_rgba(61,90,64,0.07)] focus:bg-[#f5f3ef] focus:shadow-[0_2px_12px_rgba(61,90,64,0.07)] outline-none transition"
                    tabIndex={0}
                  >
                    <div className="flex gap-4 items-start">
                      <FaMapMarkerAlt className="text-khder text-2xl mt-0.5" />
                      <div>
                        <span className="text-khder font-bold text-lg">{ph.name}</span>
                        <div className="text-[#444] text-base flex items-center gap-2 mt-1">{ph.address}</div>
                        <div className="text-[#444] text-base flex items-center gap-2 mt-1">
                          <FaClock /> {ph.hours}
                        </div>
                        <div className="text-[#444] text-base flex items-center gap-2 mt-1">
                          <FaPhoneAlt /> {ph.phone}
                        </div>
                        {ph.distance !== undefined && (
                          <div className="text-[#444] text-base flex items-center gap-2 mt-1">
                            <FaRoute /> {ph.distance.toFixed(2)} km
                          </div>
                        )}
                        <div className="text-[#444] text-base flex items-center gap-2 mt-1">
                          <span className={ph.livraison ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                            Livraison : {ph.livraison ? "Oui" : "Non"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {ph.livraison && (
                      <button
                        className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-md flex items-center gap-2 transition"
                        onClick={() => handleCommanderClick(ph)}
                      >
                        <FaShoppingCart /> Commander
                      </button>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        {/* Order Modal */}
        {showOrderModal && selectedPharmacy && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl relative">
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
                onClick={() => setShowOrderModal(false)}
                aria-label="Fermer"
              >
                ×
              </button>
              <h2 className="text-xl font-bold text-khder mb-4">
                Commander chez {selectedPharmacy.name}
              </h2>
              <form onSubmit={handleOrderSubmit}>
                <div className="mb-4">
                  <h3 className="font-semibold text-khder mb-2">Vos informations</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="nom"
                      placeholder="Nom"
                      value={clientInfo.nom}
                      onChange={handleClientInfoChange}
                      required
                      className="border rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      name="prenom"
                      placeholder="Prénom"
                      value={clientInfo.prenom}
                      onChange={handleClientInfoChange}
                      required
                      className="border rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      name="telephone"
                      placeholder="Téléphone"
                      value={clientInfo.telephone}
                      onChange={handleClientInfoChange}
                      required
                      className="border rounded-md px-3 py-2"
                    />
                    <input
                      type="text"
                      name="adresse"
                      placeholder="Adresse"
                      value={clientInfo.adresse}
                      onChange={handleClientInfoChange}
                      required
                      className="border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                {/* Ordonnance upload */}
                <div className="mb-4">
                  <h3 className="font-semibold text-khder mb-2">Ordonnance (optionnel)</h3>
                  <label
                    htmlFor="ordonnance-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-khder rounded-lg px-4 py-6 cursor-pointer bg-[#f6faf7] hover:bg-[#e8f5e9] transition"
                  >
                    <svg
                      className="w-10 h-10 mb-2 text-khder"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                    <span className="text-khder font-medium mb-1">
                      Cliquez pour sélectionner ou glissez-déposez votre ordonnance ici
                    </span>
                    <span className="text-gray-500 text-sm">(PDF ou image, max 5 Mo)</span>
                    <input
                      id="ordonnance-upload"
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      name="ordonnance"
                      // You can handle file upload with an onChange handler if needed
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-khder mb-2">Pharmacie</h3>
                  <div className="border rounded-md px-3 py-2 bg-gray-50">
                    <div><b>Nom:</b> {selectedPharmacy.name}</div>
                    <div><b>Adresse:</b> {selectedPharmacy.address}</div>
                    <div><b>Téléphone:</b> {selectedPharmacy.phone}</div>
                  </div>
                </div>
                {/* Produits */}
                <div className="mb-4">
                  <h3 className="font-semibold text-khder mb-2">Produits</h3>
                  <table className="w-full text-left border">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th style={{ textAlign: "center" }}>Choisir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderProducts.map((prod) => {
                        const panierItem = userPanier.find((p) => p.id === prod.id);
                        const wanted = panierItem ? panierItem.wanted : 1;
                        const showDispo = wanted > prod.available;
                        return (
                          <tr
                            key={prod.id}
                            className={showDispo ? "bg-red-50" : ""}
                          >
                            <td>{prod.name}</td>
                            <td>
                              {showDispo ? (
                                <span className="text-red-600 font-bold">{prod.available}</span>
                              ) : (
                                <span>{wanted}</span>
                              )}
                            </td>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                checked={prod.checked}
                                onChange={() => handleProductCheck(prod.id)}
                                className="w-5 h-5 accent-khder"
                                style={{ float: "right" }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="bg-khder text-white font-bold px-8 py-2 rounded-md"
                  >
                    Commander
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-8 py-2 rounded-md"
                    onClick={() => setShowOrderModal(false)}
                  >
                    Annuler
                  </button>
                </div>
                {orderSuccess && (
                  <div className="mt-4 text-green-700 font-semibold text-center">
                    Votre commande a été passée avec succès !
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
        {/* Footer */}
        <div className="mt-8 text-center flex gap-6 justify-center">
          <a href="/" className="text-khder font-semibold underline text-base hover:text-[#2d3d2a] transition">Retour à l'accueil</a>
          <a href="/logout" className="text-khder font-semibold underline text-base hover:text-[#2d3d2a] transition">Se déconnecter</a>
        </div>
      </div>
    </div>
  );
};

export default NearbyPharmacies;