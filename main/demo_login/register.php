<?php
$errmessage = array();
if( $_POST) {

//POST情報
//1. 入力チェック
if (!$_POST['e']) {
  $errmessage[] = "Eメールを入力してください";
} else if (strlen($_POST['e']) > 200) {
  $errmessage[] = "Eメールは200文字以内にしてください";
} else if (!filter_var($_POST['e'], FILTER_VALIDATE_EMAIL)) {
  $errmessage[] = "メールアドレスが不正です";
}

if (!$_POST['p']) {
  $errmessage[] = "パスワードを入力してください";
} else if (strlen($_POST['p']) > 100) {  // 修正
  $errmessage[] = "パスワードは100文字以内にしてください";
}

if ($_POST['p'] != $_POST['p2']) {
  $errmessage[] = "確認用パスワードが一致しません";
}

// ユーザー重複確認処理
$userfile = '../userinfo.text';
$users = array();

if (file_exists($userfile)) {
  $users = file_get_contents($userfile);
  
  if ($users !== false) {
    $users = explode("\n", $users);
  } else {
    $users = array(); // 読み込み失敗時は空の配列にする
  }
} else {
  $users = array(); // ファイルが存在しない場合も空の配列
}

foreach ($users as $v) {
  // 空行をスキップ
  if (trim($v) === "") {
    continue;
  }

  $v_ary = str_getcsv($v, ",", '"', ""); // 修正: $escape を明示的に指定

  // 配列が正しく作成され、メールアドレスが存在する場合にチェック
  if (is_array($v_ary) && isset($v_ary[0])) {
    if ($v_ary[0] == $_POST['e']) {
      $errmessage[] = "そのEメールはすでに登録されています";
      break;
    }
  }
}





//2. 新規ユーザー登録処理
if (!$errmessage) {
  $ph = password_hash($_POST['p'], PASSWORD_DEFAULT);
  $line = '"' . $_POST['e'] . '","' . $ph . '"' . "\n";//CSV形式に Eメール + パスワード
  $ret = file_put_contents($userfile, $line, FILE_APPEND);//ファイルに書き込む
}

//3. ログイン後画面にリダイレクトする
if (!$errmessage) {
  $host = $_SERVER['HTTP_HOST'];
  $uri = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
  header("Location: //$host$uri/login.php");
  exit;
}
  
} else {
//POST情報がない時(GETの時)
$_POST['e'] = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新規登録</title>
  <link rel="stylesheet" href="register.css">
 
</head>
<body>
  <div class="container">
    <h1 class="top-letter">ユーザー新規登録</h1>
    <?php if ($errmessage): ?>
      <div class="alert-error">
        <?php echo implode('<br>', $errmessage); ?>
      </div>
    <?php endif; ?>
    
    <form action="./register.php" method="post">
      <p>Eメール</p>
      <input type="email" name="e" value="<?php echo htmlspecialchars($_POST['e'] ?? '') ?>" required>

      <p>パスワード</p>
      <input type="password" name="p" required>

      <p>パスワード(確認)</p>
      <input type="password" name="p2" required>
      
      <div class="button">  
        <input type="submit" name="register" value="登録">
      </div>
    </form>
  </div>
</body>
</html>
