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
  const userType = $("input[name='user-type']:checked").val(); // ユーザータイプ取得

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ログイン成功
      localStorage.setItem('userType', userType); // ローカルストレージにユーザータイプを保存

      // ユーザータイプに応じて遷移
      if (userType === 'user') {
        window.location.href = 'user/user.html'; // ユーザー画面に遷移
      } else if (userType === 'delivery') {
        window.location.href = 'deliverly/deliver.html'; // 配達員画面に遷移
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
      alert("サインアップ成功！");
    })
    .catch((error) => {
      $("#login-error").text(error.message);
    });
});

