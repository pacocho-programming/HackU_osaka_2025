import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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
const database = getDatabase(app);

// 認証状態をチェック
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // ログインしていない場合はログイン画面にリダイレクト
    alert("ログインしてください");
    window.location.href = "../index.html";
  }
});

// 投稿ボタンのクリック処理
document.getElementById("post-button").addEventListener("click", function () {
  const productName = document.getElementById("product-name").value;
  const productDescription = document.getElementById("product-description").value;
  const productPrice = document.getElementById("product-price").value;

  // 入力された内容が空でないか確認
  if (productName && productDescription && productPrice) {

    //現在の位置情報取得
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;//緯度取得
      const longitude = position.coords.longitude;//経度取得

      const timestamp = new Date().toLocaleString();//時刻を取得

       // 商品データをFirebase Realtime Databaseに保存
      const productRef = push(ref(database, "products"));
      set(productRef, {
        name: productName,
        description: productDescription,
        price: productPrice,
        location: {
          latitude: latitude,
          longitude: longitude
        },
        timestamp: timestamp
      })
      .then(() => {
        alert("商品が投稿されました!");
        // フォームをリセット
        document.getElementById("product-name").value = "";
        document.getElementById("product-description").value = "";
        document.getElementById("product-price").value = "";
      })
      .catch((error) => {
        console.error("投稿エラー:", error);
      });
    },function(error) {
      console.error("位置情報の取得エラー:", error);
      alert("位置情報を取得できませんでした。");
    });
  } else {
    alert("すべての項目を入力してください。");
  }
});


function changingCost() {
  let costElement = document.querySelector('.cost'); // 表示用
  let costInput = document.querySelector(".cost-detail"); // 入力欄
  let costValue = costInput.value.trim(); // 入力値

  // **全角数字チェック**
  if (/[０-９]/.test(costValue)) {
    alert("全角数字は入力できません。半角数字を入力してください。");
    costInput.value = ""; // 入力欄をクリア
    costElement.textContent = "¥0"; // ¥0にリセット
    return;
  }

  // **数値変換 & 検証**
  let cost = parseInt(costValue, 10); // 10進数として変換
  if (isNaN(cost) || costValue === "") {
    cost = 0; // 無効な入力時は¥0に
  }

  // **画面に表示を更新**
  costElement.textContent = "¥" + cost;
}

// **入力が変更されたらリアルタイム更新**
document.querySelector(".cost-detail").addEventListener('input', changingCost);
changingCost(); // 初回実行
