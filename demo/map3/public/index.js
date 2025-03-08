// Firebaseの初期化
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Leafletの地図を初期化
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// ルーティングコントロールの追加
var control = L.Routing.control({
    waypoints: [],
    router: new L.Routing.OSRMv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
    }),
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

// Firestoreからリアルタイムでデバイスの位置情報を取得
db.collection("devices").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
            var data = change.doc.data();
            var latLng = L.latLng(data.latitude, data.longitude);
            control.spliceWaypoints(control.getWaypoints().length, 0, latLng);
        }
    });
});
