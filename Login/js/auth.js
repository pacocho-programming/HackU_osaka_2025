// Firebase SDKのインポート
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const auth = window.auth;
const db = window.db;

// 新規登録処理
document.getElementById("signup").addEventListener("click", function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("user-name").value;

  if (name === "") {
    document.getElementById("message").innerText = "ユーザーネームを入力してください";
    return;  // 名前が空の場合、早期リターンして処理を終了
  }

  // ボタンを無効化して二重クリックを防ぐ
  document.getElementById("signup").disabled = true;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      //Databaseにユーザー情報を保存
      set(ref(db, "users/" + user.uid), {
        email: email,
        name: name
      })
        .then(() => {
          console.log("ユーザー情報を保存成功");
          document.getElementById("message").innerText = "アカウント作成成功";
          
          document.getElementById("password").value = "";
          document.getElementById("user-name").value = "";
        })
        .catch((error) => {
          console.error("データベース保存エラー:", error.message);
          document.getElementById("message").innerText = `データベース保存エラー: ${error.message}`;
        })
        .finally(() => {
          document.getElementById("signup").disabled = false; // ボタンを再度有効化
        });
    })
    .catch((error) => {
      if (error.message === "auth/email-already-in-use") {
        document.getElementById("message").innerText = "このメールアドレスは既に使用されています";
      } else {
        document.getElementById("message").innerText = `エラー: ${error.message}`;
      }
      console.error("エラー:", error.message);
      document.getElementById("signup").disabled = false; // ボタンを再度有効化
    });
});

// ログイン処理
document.getElementById("login").addEventListener("click", function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ボタンを無効化して二重クリックを防ぐ
  document.getElementById("login").disabled = true;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "ログイン成功!";
      window.location.href = "html/group.html";
      console.log("ログイン成功", userCredential.user);
    })
    .catch((error) => {
      document.getElementById("message").innerText = `エラー: ${error.message}`;
      console.error("エラー:", error.message);
    })
    .finally(() => {
      document.getElementById("login").disabled = false; // ボタンを再度有効化
    });
});
