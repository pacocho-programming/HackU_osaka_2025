import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyC7J5Z7NSQ4CWJP02dLi73OPjKx7ksSPE8",
  authDomain: "sample2-3ea3d.firebaseapp.com",
  databaseURL: "https://sample2-3ea3d-default-rtdb.firebaseio.com",
  projectId: "sample2-3ea3d",
  storageBucket: "sample2-3ea3d.firebasestorage.app",
  messagingSenderId: "472837239280",
  appId: "1:472837239280:web:7736d6a53389f4e3f2ad35"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 認証状態をチェック
onAuthStateChanged(auth, (delivery) => {
  if (!delivery) {
    // ログインしていない場合はログイン画面にリダイレクト
    alert("ログインしてください");
    window.location.href = "../index.html";
  }
});

// ログアウト処理
document.getElementById("logout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      alert("ログアウトしました");
      window.location.href = "../index.html"; // ログイン画面に遷移
    })
    .catch((error) => {
      alert("ログアウトに失敗しました: " + error.message);
    });
});

