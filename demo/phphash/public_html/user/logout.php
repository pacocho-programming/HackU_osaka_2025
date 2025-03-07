<?php
session_start();
$_SESSION = array();

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログアウト</title>
</head>
<body>
  <div class="container">
    <div class="mx-auto" style="width:400px;">
      <h1>ログアウトしました</h1>
      <a href="./login.php">ログインする</a>
    </div>
  </div>
</body>
</html>