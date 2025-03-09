import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
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
const auth = getAuth(app);

// ログイン処理
$("#login").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ログイン成功
      $("#login-form").hide();
      $("#main-form").show();
    })
    .catch((error) => {
      $("#login-error").text(error.message);
    });
});

// サインアップ処理
$("#signup").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("サインアップ成功！");
    })
    .catch((error) => {
      $("#login-error").text(error.message);
    });
});

// ログアウト処理
$("#logout").on("click", function () {
  signOut(auth).then(() => {
    $("#main-form").hide();
    $("#login-form").show();
  }).catch((error) => {
    console.error("ログアウトエラー:", error);
  });
});

// 最新の更新情報ボタンをクリックしたときの動作
document.getElementById('event-info-btn').addEventListener('click', function(e) {
  e.preventDefault();  // デフォルトのリンク動作を無効化

  // 位置情報を取得
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // サーバーにリクエストを送る（APIキーはサーバー側で管理）
      fetch(`/get-events?lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {
          if (data.events) {
            // イベント情報をlocalStorageに保存して、notice.htmlに渡す
            localStorage.setItem('events', JSON.stringify(data.events));
            // notice.htmlに遷移
            window.location.href = 'notice.html';
          } else {
            alert('イベント情報が見つかりませんでした。');
          }
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          alert('イベント情報の取得に失敗しました。');
        });
    }, function() {
      alert('位置情報の取得に失敗しました。');
    });
  } else {
    alert('位置情報を取得できません。');
  }
});
