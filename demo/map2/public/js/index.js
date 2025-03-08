import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const db = getFirestore(app);

// 地図の初期化
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
      const userId = "user1";  // ユーザーID（適宜変更）
      fetch('https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/saveUserLocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, latitude: userLat, longitude: userLon })
      });

      // 配達員の位置を取得 & 経路を表示
      fetch('https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/calculateRoute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userLat: userLat,
          userLon: userLon,
          driverLat: 35.6897, // 配達員の仮の位置（適宜変更）
          driverLon: 139.6922
        })
      })
      .then(res => res.json())
      .then(data => {
        if (routeLayer) {
          map.removeLayer(routeLayer);
        }
        routeLayer = L.geoJSON(data, {
          style: { color: "blue", weight: 5 }
        }).addTo(map);
      });
    });
  }
});
