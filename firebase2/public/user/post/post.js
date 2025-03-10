import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, get, remove, set, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ユーザーID（仮にサンプルIDとして設定）
const userId = "sampleUserId"; // 実際のユーザーIDを設定

// データを取得して表示する関数
async function displayProducts() {
  const productListRef = ref(database, "products");
  try {
    const snapshot = await get(productListRef);
    const productList = snapshot.val();
    const productListDiv = document.getElementById("product-list");

    if (productList) {
      for (const key in productList) {
        const product = productList[key];
        const productDiv = document.createElement("div");
        productDiv.classList.add("post-item");

        // 商品情報をHTMLに追加
        productDiv.innerHTML = `
          <strong>${product.name}</strong>
          <p>${product.description}</p>
          <p>価格: ¥${product.price}</p>
          <p>${product.timestamp}</p>
        `;

        // 位置情報がある場合、リンクを表示
        if (product.location) {
          const latitude = product.location.latitude;
          const longitude = product.location.longitude;

          // Google Mapsのリンクを生成
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          productDiv.innerHTML += `
            <p><a href="${googleMapsLink}" target="_blank">地図で確認</a></p>
            <button class="buy-button" data-product-id="${key}">購入</button>
          `;
        }

        productListDiv.appendChild(productDiv);
      }
    } else {
      productListDiv.innerHTML = "<p>まだ投稿された商品はありません。</p>";
    }
  } catch (error) {
    console.error("データ取得エラー:", error);
  }
}

// 購入ボタンがクリックされたときの処理
document.getElementById("product-list").addEventListener("click", async function (event) {
  if (event.target && event.target.classList.contains("buy-button")) {
    const productId = event.target.getAttribute("data-product-id");
    const productRef = ref(database, "products/" + productId);
    
    try {
      // 商品データを取得
      const productSnapshot = await get(productRef);
      const productData = productSnapshot.val();

      if (productData) {
        // ユーザーの購入データとして保存
        const userPurchasesRef = ref(database, `users/${userId}/purchases`);
        const newPurchaseRef = push(userPurchasesRef); // 購入を追加する場所

        await set(newPurchaseRef, productData);

        // 商品データを削除
        await remove(productRef);
        console.log('商品が購入され、データが削除されました');

        // UIの更新（例: 購入ボタンを無効化）
        event.target.disabled = true;
        event.target.textContent = "購入済み";
      }
    } catch (error) {
      console.error("購入処理エラー:", error);
    }
  }
});

// ページ読み込み時にデータを表示
window.onload = displayProducts;
