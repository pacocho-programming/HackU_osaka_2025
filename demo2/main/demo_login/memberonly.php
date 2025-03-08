<?php
session_start();
//セッション情報がない場合はログイン画面にリダイレクトする
if (!isset($_SESSION['e'])) {
  $host = $_SERVER['HTTP_HOST'];
  $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
  header("Location: //$host$uri/login.php");
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メンバー専用</title>
</head>
<body>
  <div class="container">
    <div class="mx-auto" style="width:400px;">
      <h1>メンバー専用画面</h1>
      <a href="./logout.php">ログアウトする</a>
    </div>
  </div>
</body>
</html>