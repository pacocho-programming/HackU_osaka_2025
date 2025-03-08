<?php
require __DIR__ . '/../vendor/autoload.php';

use Kreait\Firebase\Factory;

// Firebase 設定
$factory = (new Factory())
    ->withServiceAccount(__DIR__ . '/../schooldeliver-firebase-adminsdk-fbsvc-c175c8319b.json')
    ->withDatabaseUri('https://schooldeliver-default-rtdb.asia-southeast1.firebasedatabase.app');

$database = $factory->createDatabase();

session_start();

// セッション情報がない場合はログイン画面へリダイレクト
if (!isset($_SESSION['e'])) {
    header("Location: demo_login/login.php");
    exit;
}

// データベースからデータを取得 (例: 'users' ノードから)
$ref = $database->getReference('users');
$snapshot = $ref->getSnapshot();
$users = $snapshot->getValue();

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Deliver</title>
    <link href="index.css" rel="stylesheet">
</head>
<body>
    <div class="main">
        <header class="header">
            <h1>Welcome</h1>
        </header>

        <div class="main-content">
            <nav>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="service/service.html">Service</a></li>
                    <li><a href="post/post.html">Post</a></li>
                    <li><a href="purchase/purchase.html">Purchase</a></li>
                    <li><a href="History/history.html">History</a></li>
                </ul>
            </nav>

            <div class="content">
                <a href="demo_login/logout.php">ログアウトする</a>
                <p>ユーザー情報:</p>
                <pre><?php print_r($users); ?></pre> <!-- Firestoreから取得したデータを表示 -->
            </div>
        </div>
    </div>

    <script src="index.js"></script>
    <script type="module">
        // 必要なSDKをインポート
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

        // Firebaseの設定
        const firebaseConfig = {
            apiKey: "AIzaSyA5xUtIT6H5HoQ58ZnYj8Jd9aeLe6ym8g0",
            authDomain: "schooldeliver.firebaseapp.com",
            databaseURL: "https://schooldeliver-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "schooldeliver",
            storageBucket: "schooldeliver.appspot.com",
            messagingSenderId: "873188514977",
            appId: "1:873188514977:web:a065d36930ef7ca56324e0",
            measurementId: "G-FX06G49FQG"
        };

        // Firebaseを初期化
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
    </script>
</body>
</html>
