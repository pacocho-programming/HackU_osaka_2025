import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { ref, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// FirebaseのauthオブジェクトとDBオブジェクトを取得（適宜修正）
const auth = window.auth;
const db = window.db;

// ユーザーのログイン状態を監視
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("message").innerText = `ログイン中: ${user.email}`;
  } else {
    document.getElementById("message").innerText = "ログインしていません";
    window.location.href = "../index.html"; // 未ログインならログインページへ
  }
});

// ログアウト処理
document.getElementById("logout").addEventListener("click", () => {
  const user = auth.currentUser; // ユーザーのログイン状態を取得

  if (user) {
    // currentGroup のデータを削除
    const currentGroupRef = ref(db, `users/${user.uid}/currentGroup`);
    remove(currentGroupRef)
      .then(() => {
        console.log("currentGroup のデータが削除されました");
        // ログアウト処理
        return signOut(auth);
      })
      .then(() => {
        document.getElementById("message").innerText = "ログアウト成功!";
        console.log("ログアウト成功");
        window.location.href = "../index.html"; // ログアウト後にログインページへ戻る
      })
      .catch((error) => {
        document.getElementById("message").innerText = `エラー: ${error.message}`;
        console.error("エラー:", error.message);
      });
  } else {
    console.error("ユーザーIDが取得できませんでした");
  }
});
