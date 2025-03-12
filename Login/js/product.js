import { get, ref, set, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const auth = window.auth;
const db = window.db;

// 商品データーを取得する関数
function getProducts(user) {
  // currentGroupがグループ名である場合
  const currentGroupRef = ref(db, `users/${user.uid}/currentGroup`);
  get(currentGroupRef).then((snapshot) => {
    if (snapshot.exists()) {
      const currentGroup = snapshot.val(); // ユーザーの現在のグループ名を取得
      const productRef = ref(db, `groups/${currentGroup}/products`); // `products` のデータを取得
      get(productRef).then((snapshot) => {
        if(snapshot.exists()) {
          const products = snapshot.val();
          displayProducts(products);
        } else {
          document.getElementById("product-list").innerText = "商品データは存在しません";
        }
      }).catch((error) => {
        alert("エラー", error);
      });
    } else {
      alert("現在のグループが見つかりません");
    }
  }).catch((error) => {
    alert("エラー", error);
  });
}

// ユーザーが情報の管理
onAuthStateChanged(auth, (user) => {
  if (user) {
    getProducts(user); // ユーザー情報をgetProductsに送信
  } else {
    alert("ログインしてください");
  }
});

// 商品データを表示する関数
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // 既存のリストをクリア

  for (const productId in products) {
    const product = products[productId];

    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
      <span>${product.name}</span>
      <p>${product.info}</p>
      <p>${product.time}</p>
      <p>${product.userName}</p>
      <button class="buy-button" data-product-id="${productId}">購入</button>
    `;
    productList.appendChild(productElement);
  }
}

// `購入` ボタンのクリックイベントを一括設定
document.getElementById("product-list").addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("buy-button")) {
    const productId = event.target.dataset.productId; // 商品の ID を取得

    // 商品IDを元にデータを取得
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentGroupRef = ref(db, `users/${user.uid}/currentGroup`);
        get(currentGroupRef).then((snapshot) => {
          if (snapshot.exists()) {
            const currentGroup = snapshot.val(); // ユーザーの現在のグループ名を取得
            const productRef = ref(db, `groups/${currentGroup}/products/${productId}`);
            get(productRef)
              .then((snapshot) => {
                if (snapshot.exists()) {
                  const productData = snapshot.val();
                  purchaseProduct(user, productId, productData, currentGroup);
                } else {
                  console.error("商品が見つかりません");
                }
              })
              .catch((error) => console.error("エラー:", error));
          } else {
            alert("現在のグループが見つかりません");
          }
        }).catch((error) => {
          console.error("エラー:", error);
        });
      } else {
        alert("ログインしてください");
      }
    });
  }
});

// 商品を購入する処理
function purchaseProduct(user, productId, product, currentGroup) {
  const userID = user.uid;
  const purchasedRef = ref(db, `groups/${currentGroup}/members/${userID}/purchased`);
  const productRef = ref(db, `groups/${currentGroup}/products/${productId}`); // `groups/{currentGroup}/products`の対象商品

  set(purchasedRef, {
    name: product.name,
    info: product.info,
    cost: product.cost,
    longitude: product.longitude,
    latitude: product.latitude
  })
    .then(() => {
      return remove(productRef); // 購入後、商品の削除
    })
    .then(() => {
      alert("商品を購入しました！");
      location.reload(); // ページをリロードしてリストを更新
    })
    .catch((error) => alert("エラー:", error));
}
