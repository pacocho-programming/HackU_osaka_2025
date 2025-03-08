<?php
session_start();
$errmessage = array();
if ($_POST) {

  // POST情報
  // 1. 入力チェック
  if (!isset($_POST['e']) || $_POST['e'] === "") {
    $errmessage[] = "Eメールを入力してください";
  } else if (mb_strlen($_POST['e']) > 200) {
    $errmessage[] = "Eメールは200文字以内にしてください";
  } else if (!filter_var($_POST['e'], FILTER_VALIDATE_EMAIL)) {
    $errmessage[] = "メールアドレスが不正です";
  }

  if (!isset($_POST['p']) || $_POST['p'] === "") {
    $errmessage[] = "パスワードを入力してください";
  } else if (mb_strlen($_POST['p']) > 100) {
    $errmessage[] = "パスワードは100文字以内にしてください";
  }

  // 2. ログインID, パスワードが一致しているかどうかをチェック
  $userfile = '../userinfo.text';
  if (file_exists($userfile)) {
    $users = file_get_contents($userfile);

    if ($users === false) {
      $errmessage[] = "ユーザリストファイルが読み込めません";
    } else {
      $users = explode("\n", $users);
      $loginSuccess = false;

      foreach ($users as $v) {
        if (trim($v) === "") {
          continue; // 空行スキップ
        }

        $v_ary = str_getcsv($v, ",", '"', ""); // 修正: $escape を明示的に指定
        if (!isset($v_ary[1])) {
          continue; // 不正なデータをスキップ
        }

        // Eメールアドレスが一致しているかどうかチェック
        if ($v_ary[0] == $_POST['e']) {
          // パスワードチェック
          if (password_verify($_POST['p'], $v_ary[1])) {
            $_SESSION['e'] = $_POST['e'];
            // ログイン成功時の処理
            $host = $_SERVER['HTTP_HOST'];
            $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
            header("Location: //$host$uri/../index.html");
            exit;
          }
        }
      }
      $errmessage[] = "ユーザー名またはパスワードが正しくありません";
    }
  } else {
    $errmessage[] = "ユーザリストファイルが見つかりません";
  }

} else {
  // POST情報がない時(GETの時)

  //セッション情報があるときはログイン後画面にリダイレクトする
  if (isset($_SESSION['e']) && $_SESSION['e']) {
    $host = $_SERVER['HTTP_HOST'];
    $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    header("Location: //$host$uri/../index.html");
    exit;
  }

  $_POST = array();
  $_POST['e'] = "";
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログインフォーム</title>
  <link href="login.css" rel="stylesheet">
</head>
<body>
  <div class="container">
  

    <h1 class="top-letter">ログイン</h1>

    <?php if ($errmessage): ?>
      <div class="alert alert-danger" role="alert">
        <?php echo implode('<br>', $errmessage); ?>
      </div>
    <?php endif; ?>

    <form action="./login.php" method="post">
      <p>Eメール</p>
      <input type="email" name="e" value="<?php echo htmlspecialchars($_POST['e'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" required>

      <p>パスワード</p>
      <input type="password" name="p" required>

      <div class="button">
        <input type="submit" name="login" value="ログイン">
      </div>
    </form>
    
  </div>
</body>
</html>
