import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDwoNmA2g_10oCh_yc3AHcK8ffzaZXRgyQ",
  authDomain: "sample-b124c.firebaseapp.com",
  projectId: "sample-b124c",
  storageBucket: "sample-b124c.firebasestorage.app",
  messagingSenderId: "765131150385",
  appId: "1:765131150385:web:a2971109336333bbabb110"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbRef = ref(db, "chat");

// ログイン処理
$("#login").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ログイン成功
      const user = userCredential.user;
      $("#login-form").hide();
      $("#chat-form").show();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $("#login-error").text(errorMessage);
    });
});

// サインアップ処理
$("#signup").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("サインアップ成功！");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $("#login-error").text(errorMessage);
    });
});

// チャットメッセージ送信処理
$("#send").on("click", function () {
  const msg = {
    uname: $("#uname").val(),
    text: $("#text").val()
  }
  const newPostRef = push(dbRef);
  set(newPostRef, msg);
});

// チャットメッセージ取得
onChildAdded(dbRef, function (data) {
  const msg = data.val();
  const key = data.key;
  let h = '<p>';
  h += msg.uname;
  h += '<br>';
  h += msg.text;
  h += '</p>';
  $("#output").append(h);
});

// ログアウト処理
$("#logout").on("click", function () {
  signOut(auth).then(() => {
    $("#chat-form").hide();
    $("#login-form").show();
  }).catch((error) => {
    console.error("ログアウトエラー:", error);
  });
});

