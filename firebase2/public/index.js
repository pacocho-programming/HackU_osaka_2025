import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyC7J5Z7NSQ4CWJP02dLi73OPjKx7ksSPE8",
  authDomain: "sample2-3ea3d.firebaseapp.com",
  databaseURL: "https://sample2-3ea3d-default-rtdb.firebaseio.com",
  projectId: "sample2-3ea3d",
  storageBucket: "sample2-3ea3d.firebasestorage.app",
  messagingSenderId: "472837239280",
  appId: "1:472837239280:web:7736d6a53389f4e3f2ad35"
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
