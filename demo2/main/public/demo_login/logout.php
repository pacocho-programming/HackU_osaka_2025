<?php
session_start();
$_SESSION = array();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログアウト</title>
  <link href="logout.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>ログアウトしました</h1>
    <div class="button">
      <a href="./login.php">ログインする</a>
    </div>
  </div>
</body>
</html>
