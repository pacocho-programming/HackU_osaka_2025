document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM読み込み完了 - 地図を初期化");

    // 地図の初期化
    const map = L.map('map').setView([35.682839, 139.759455], 13);
    console.log("地図オブジェクト作成成功");

    // OpenStreetMapのタイルレイヤーを追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    console.log("タイルレイヤー追加成功");

    let userMarker;
    let destinationMarker;
    let routeLayer;

    // 現在位置を取得してマップにピンを立てる
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log("現在位置取得成功");
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            userMarker = L.marker([userLat, userLon]).addTo(map)
                .bindPopup('あなたの位置')
                .openPopup();

            map.setView([userLat, userLon], 13);
        },
        function (error) {
            console.error("位置情報の取得に失敗", error);
            alert('位置情報の取得に失敗しました。');
        }
    );

    // 目的地を設定し、ルートを計算する処理
    document.getElementById("routeBtn").addEventListener("click", function () {
        const destinationInput = document.getElementById("destination").value.trim();

        if (!destinationInput) {
            alert("目的地を入力してください。");
            return;
        }

        // 🟢 Nominatim API を使って住所→座標変換（ジオコーディング）
        const nominatimURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationInput)}`;

        fetch(nominatimURL)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    alert("目的地が見つかりませんでした。");
                    return;
                }

                const destLat = parseFloat(data[0].lat);
                const destLon = parseFloat(data[0].lon);

                console.log(`検索結果: 緯度=${destLat}, 経度=${destLon}`);

                // 以前の目的地マーカーとルートを削除
                if (destinationMarker) map.removeLayer(destinationMarker);
                if (routeLayer) map.removeLayer(routeLayer);

                // 目的地にマーカーを表示
                destinationMarker = L.marker([destLat, destLon]).addTo(map)
                    .bindPopup(data[0].display_name)
                    .openPopup();

                // OSRMを使って最短経路を計算
                if (userMarker) {
                    const userLatLng = userMarker.getLatLng();
                    const osrmRouteURL = `https://router.project-osrm.org/route/v1/driving/${userLatLng.lng},${userLatLng.lat};${destLon},${destLat}?overview=full&geometries=geojson`;

                    fetch(osrmRouteURL)
                        .then(response => response.json())
                        .then(data => {
                            if (!data.routes || data.routes.length === 0) {
                                alert("ルートが見つかりませんでした。");
                                return;
                            }

                            const routeCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                            routeLayer = L.polyline(routeCoords, { color: 'blue', weight: 5 }).addTo(map);
                            map.fitBounds(routeLayer.getBounds());
                        })
                        .catch(error => {
                            console.error("ルート計算エラー", error);
                            alert("ルートの取得に失敗しました。");
                        });
                } else {
                    alert("現在位置が取得できていません。");
                }
            })
            .catch(error => {
                console.error("ジオコーディングエラー", error);
                alert("目的地の検索に失敗しました。");
            });
    });
});
