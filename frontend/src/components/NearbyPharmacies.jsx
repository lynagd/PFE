import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt, FaRoute, FaSyncAlt, FaSearchLocation } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import "../styles/NearbyPharmacies.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const defaultPharmacies = [
  // Example data; replace with API or props
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
    <div className="nearby-bg">
      <div className="nearby-hero">
        <h1>
          <span>Pharmacies à proximité</span>
        </h1>
        <p>
          Trouvez rapidement les pharmacies ouvertes autour de vous, visualisez-les sur la carte et accédez à leurs profils
        </p>
      </div>
      <div className="nearby-main">
        <div className="nearby-controls">
          <div className="geo-section">
            <button className="btn-green" onClick={handleGeolocate} disabled={loading}>
              <FaSearchLocation /> {loading ? "Recherche..." : "Activer la géolocalisation"}
            </button>
            <span className="geo-status">{status}</span>
            {accuracy && <span className="geo-accuracy">{accuracy}</span>}
            <div className="manual-address">
              <button className="btn-green-outline" onClick={handleManualAddress}>
                <FaSyncAlt /> Valider
              </button>
            </div>
          </div>
          <div className="filters-section">
            <label>
              <span>Distance max (km):</span>
              <input
                type="number"
                min={1}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
              />
            </label>
            <label className="open-now-label" style={{ alignItems: "center", gap: 12 }}>
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}
                style={{ width: 22, height: 22, accentColor: "#3d5a40" }} // bigger checkbox
              />
              <span>Pharmacies actuellement ouvertes</span>
            </label>
          </div>
        </div>
        <div className="nearby-content">
          <div className="nearby-map-card">
            <div id="map" className="nearby-map"></div>
          </div>
          <div className="nearby-list-card">
            <h2>Pharmacies à proximité</h2>
            <ul className="pharmacies-list">
              {filtered.length === 0 ? (
                <li className="empty">Aucune pharmacie disponible.</li>
              ) : (
                filtered.map((ph) => (
                  <li
                    key={ph.id}
                    className="pharmacy-list-item pharmacy-list-clickable"
                    onClick={() => navigate(`/pharmacy-profile?id=${ph.id}`)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter") navigate(`/pharmacy-profile?id=${ph.id}`); }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="pharmacy-list-main">
                      <FaMapMarkerAlt className="pharmacy-list-icon" />
                      <div>
                        <span className="pharmacy-list-name">{ph.name}</span>
                        <div className="pharmacy-list-address">{ph.address}</div>
                        <div className="pharmacy-list-hours">
                          <FaClock /> {ph.hours}
                        </div>
                        <div className="pharmacy-list-phone">
                          <FaPhoneAlt /> {ph.phone}
                        </div>
                        {ph.distance !== undefined && (
                          <div className="pharmacy-list-distance">
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
        <div className="nearby-footer">
          <a href="/" className="btn-green-link">Retour à l'accueil</a>
          <a href="/logout" className="btn-green-link">Se déconnecter</a>
        </div>
      </div>
    </div>
  );
};

export default NearbyPharmacies;