import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";


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
const db = getDatabase(app);

//ユーザー情報をRealtimeDatabaseに保存する関数
function writeUserData(userId, email, userType) {
  //ユーザーの種類に応じて保存先を決める
  const path = userType === 'user' ? 'users/': 'delivers/';
  //データの保存
  set(ref(db, path + userId), {
    email: email
  }).then(() => {
    //成功時の処理
    console.log("successed")
    alert("ユーザー情報が保存されました！")
  }).catch((error) => {
    console.log("failed")
    alert("データ保存エラー:" + error.message);
  });
}



// ログイン処理
$("#login").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();
  const userType = $("input[name='user-type']:checked").val(); // ユーザータイプ取得

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // ログイン成功
      sessionStorage.setItem('userType', userType); // セッションストレージにユーザータイプを保存

      writeUserData(user.uid, email, userType);

      // ユーザータイプに応じて遷移 //ユーザータイプごとに情報をDatabaseに保存
      if (userType === 'user') {
        window.location.href = 'user/user.html'; // ユーザー画面に遷移

        
      } else if (userType === 'delivery') {
        window.location.href = 'delivery/deliver.html'; // 配達員画面に遷移
      }
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
      //const user = userCredential.user;
      //writeUserData(user.uid, email,userType);
      alert("サインアップ成功！");
    })
    .catch((error) => {
      $("#login-error").text(error.message);
    });
});
