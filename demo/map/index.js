// Firebase設定
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Leaflet地図初期化
const map = L.map('map').setView([35.6895, 139.6917], 13); // デフォルト東京
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// ユーザーの位置を取得して地図に表示
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const userMarker = L.marker([userLat, userLng]).addTo(map);
        userMarker.bindPopup("あなたの位置").openPopup();

        // Firebaseにユーザー位置情報を保存
        db.collection('users').doc('user1').set({
            latitude: userLat,
            longitude: userLng
        });

        // 配達員の位置情報を取得
        db.collection('drivers').get().then(snapshot => {
            let nearestDriver = null;
            let shortestDistance = Infinity;

            snapshot.forEach(doc => {
                const driver = doc.data();
                const driverLat = driver.latitude;
                const driverLng = driver.longitude;
                const distance = getDistance(userLat, userLng, driverLat, driverLng);

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestDriver = driver;
                }
            });

            // 最寄りの配達員を表示
            if (nearestDriver) {
                const driverMarker = L.marker([nearestDriver.latitude, nearestDriver.longitude]).addTo(map);
                driverMarker.bindPopup("配達員: 最寄り配達員").openPopup();
            }
        });
    });
}

// 2地点間の距離を計算
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球の半径 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km
}
