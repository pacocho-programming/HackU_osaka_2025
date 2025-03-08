import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([35.6895, 139.6917], 13); // 東京
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let userMarker;
  let driverMarker;
  let routeLayer;

  // ユーザーの位置を取得
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      userMarker = L.marker([userLat, userLon]).addTo(map)
        .bindPopup("あなたの位置")
        .openPopup();

      // Firebaseに位置情報を保存
      set(ref(db, 'users/user1'), {
        latitude: userLat,
        longitude: userLon
      });

      // 配達員の位置を取得 & 経路を表示
      get(child(ref(db), 'drivers/driver1')).then((snapshot) => {
        if (snapshot.exists()) {
          const driverLat = snapshot.val().latitude;
          const driverLon = snapshot.val().longitude;
          driverMarker = L.marker([driverLat, driverLon]).addTo(map)
            .bindPopup("配達員の位置")
            .openPopup();

          // 経路を計算
          fetch(`https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${driverLon},${driverLat}?overview=full&geometries=geojson`)
            .then(res => res.json())
            .then(data => {
              if (routeLayer) {
                map.removeLayer(routeLayer);
              }
              routeLayer = L.geoJSON(data.routes[0].geometry, {
                style: { color: "blue", weight: 5 }
              }).addTo(map);
            });
        }
      });
    });
  }
});
