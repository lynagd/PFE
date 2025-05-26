import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaRoute, FaSyncAlt, FaSearchLocation } from "react-icons/fa";
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
  },
  {
    id: 2,
    name: "Pharmacie El Amel",
    lat: 36.753,
    lng: 3.05,
    address: "456 Avenue de l'Indépendance, Alger",
    hours: "09:00 - 22:00",
    phone: "0666 66 66 66",
  },
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
          <div className="flex-[2.5] min-w-[320px] md:min-w-[500px] bg-white rounded-[24px] shadow-[0_8px_32px_rgba(61,90,64,0.07)] px-10 py-12 flex flex-col items-stretch">
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
                    className="border-b border-[#e0e0e0] py-3 flex items-start justify-between gap-3 hover:bg-[#f5f3ef] hover:shadow-[0_2px_12px_rgba(61,90,64,0.07)] focus:bg-[#f5f3ef] focus:shadow-[0_2px_12px_rgba(61,90,64,0.07)] outline-none cursor-pointer transition"
                    onClick={() => navigate(`/pharmacy-profile?id=${ph.id}`)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter") navigate(`/pharmacy-profile?id=${ph.id}`); }}
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
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
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