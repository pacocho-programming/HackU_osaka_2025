import { get, ref } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const auth = window.auth;
const db = window.db;

// ユーザーの購入履歴を取得
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userID = user.uid;
    const currentGroupRef = ref(db, `users/${userID}/currentGroup`);

    get(currentGroupRef)
      .then((groupSnapshot) => {
        if (groupSnapshot.exists()) {
          const currentGroup = groupSnapshot.val(); // グループ名を取得
          const purchasedRef = ref(db, `groups/${currentGroup}/members/${userID}/purchased`);

          return get(purchasedRef).then((purchasedSnapshot) => {
            if (purchasedSnapshot.exists()) {
              const purchasedProducts = purchasedSnapshot.val();
              console.log("購入履歴", purchasedProducts);
              displayPurchasedProducts(purchasedProducts, currentGroup, userID);
            } else {
              console.log("購入履歴がありません");
            }
          });
        } else {
          console.log("現在のグループが見つかりません");
        }
      })
      .catch((error) => {
        console.error("データ取得エラー:", error);
      });
  } else {
    alert("ログインしてください");
  }
});

// 購入履歴を表示する関数
function displayPurchasedProducts(products, currentGroup, userID) {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = ""; // リストをクリア

  for (const productId in products) {
    const product = products[productId];

    // 非表示フラグがある場合は表示しない
    if (product.hidden) continue;

    const productElement = document.createElement("div");
    productElement.classList.add("history-item");
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.info}</p>
      <p>購入日時: ${product.time}</p>
      <p>価格: ${product.cost} 円</p>
    `;
    historyList.appendChild(productElement);
  }
}
