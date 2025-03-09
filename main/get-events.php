<?php
// 必要なライブラリを読み込み
require __DIR__ . '/vendor/autoload.php';  // Composer でインストールしたライブラリ

// 環境変数をロード（.env ファイルからAPIキーを読み込む）
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Eventbrite APIのキーを取得
$apiKey = getenv('EVENTBRITE_API_KEY');

// 緯度と経度がリクエストに含まれているか確認
if (!isset($_GET['lat']) || !isset($_GET['lng'])) {
    http_response_code(400);
    echo json_encode(["error" => "緯度・経度が必要です"]);
    exit;
}

$latitude = $_GET['lat'];
$longitude = $_GET['lng'];

// Eventbrite APIのURL（リクエストURL）
$apiUrl = "https://www.eventbriteapi.com/v3/events/search/?location.latitude={$latitude}&location.longitude={$longitude}&token={$apiKey}";

// cURLを使ってEventbrite APIにリクエストを送る
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// 結果をそのままフロントエンドに返す
header("Content-Type: application/json");
echo $response;
?>
