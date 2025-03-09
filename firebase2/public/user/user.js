import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase初期化と認証取得
const auth = getAuth();

// ページ読み込み時に認証状態を確認
window.onload = function() {
  // ログイン状態の確認
  const user = auth.currentUser;
  if (!user) {
    // ユーザーがログインしていない場合、ログインページにリダイレクト
    window.location.href = '../index.html';
  }
};

// ログアウト処理
$("#logout").on("click", function () {
  signOut(auth).then(() => {
    // ログアウト成功
    localStorage.removeItem('userType'); // ローカルストレージからユーザータイプを削除
    window.location.href = '../index.html'; // ログインページにリダイレクト
  }).catch((error) => {
    console.error("ログアウトエラー:", error);
  });
});
