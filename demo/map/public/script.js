// Firebaseの初期化
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app-id.firebaseapp.com",
  databaseURL: "https://your-app-id.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

// Leafletで地図を初期化
const map = L.map('map').setView([35.681236, 139.767125], 13); // 初期位置は東京駅付近

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ユーザー位置情報を取得して地図にマーク
navigator.geolocation.getCurrentPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const userLocation = L.marker([lat, lon]).addTo(map)
    .bindPopup("Your Location")
    .openPopup();

  // Firebaseにユーザーの位置を保存
  db.ref('users/' + auth.currentUser.uid).set({
    latitude: lat,
    longitude: lon
  });

  // 位置情報を画面に表示
  document.getElementById('location-coordinates').textContent = `${lat}, ${lon}`;

  // 他のユーザーの位置をマップに表示
  db.ref('users').on('child_added', function(snapshot) {
    const user = snapshot.val();
    if (user.latitude && user.longitude) {
      L.marker([user.latitude, user.longitude]).addTo(map)
        .bindPopup(`User's location: ${user.latitude}, ${user.longitude}`);
    }
  });
});

// Firebaseから位置情報を取得し、最短距離をOSRMで計算
function calculateDistance(userLat, userLon) {
  fetch(`https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};139.767125,35.681236?overview=false`)
    .then(response => response.json())
    .then(data => {
      const distance = data.routes[0].legs[0].distance / 1000; // 距離（km）
      document.getElementById('distance').textContent = `Distance to the nearest delivery: ${distance.toFixed(2)} km`;
    });
}
