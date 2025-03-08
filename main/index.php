<?php
session_start();
//セッション情報がない場合はログイン画面にリダイレクトする
if (!isset($_SESSION['e'])) {
  $host = $_SERVER['HTTP_HOST'];
  $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
  header("Location: //$host$uri/demo_login/login.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="index.css" rel="stylesheet">
</head>
<body>
  <div class="main">
    <header class="header">
      <h1>Welcome</h1>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="service/service.html">Service</a></li>
            <li><a href="/main/post/post.html">Post</a></li>
            <li><a href="purchase/purchase.html">Purchase</a></li>
            <li><a href="History/history.html">History</a></li>
          </ul>
        </nav>
      </aside>


      <div class="content">
        <div class="content-card">
          <h2>お知らせ</h2>
          <p>最新の更新情報をチェックしてください。</p>
          <a href="#" class="btn">詳細を見る</a>
        </div>

        <div class="content-card">
          <h2>サービスの紹介</h2>
          <p>便利なサービスをご提供しています。</p>
          <a href="service/service.html" class="btn">サービスを見る</a>
        </div>
        
        <div class="content-card">
          <h2>ログアウト</h2>
          <p>セッションを終了するには、以下のボタンを押してください。</p>
          <a href="demo_login/logout.php" class="btn">ログアウトする</a>
        </div>
      </div>
    </div>
  </div>

  <script src="index.js"></script>
</body>
</html>
