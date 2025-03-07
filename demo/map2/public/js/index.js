import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebaseの初期化
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

// 地図を初期化
const map = L.map('map').setView([35.6895, 139.6917], 13); // 初期位置（東京）

// OpenStreetMapタイルレイヤー
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// ユーザー位置取得
navigator.geolocation.getCurrentPosition((position) => {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  // ユーザー位置にマーカーを追加
  L.marker([userLat, userLon]).addTo(map)
    .bindPopup("あなたの位置")
    .openPopup();
  
  // Firebaseに位置を保存
  const userRef = ref(db, 'users/user1');
  set(userRef, {
    latitude: userLat,
    longitude: userLon
  });
});
