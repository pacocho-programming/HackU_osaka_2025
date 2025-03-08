function displayPurchases() {
  let purchaseList = document.getElementById("purchaseList");
  let purchaseHistory = JSON.parse(localStorage.getItem("purchase") || "[]");

  purchaseList.innerHTML = ""; // リセット

  if (purchaseHistory.length === 0) {
    purchaseList.innerHTML = "<p>購入予定がありません。</p>";
    return;
  }

  purchaseHistory.forEach((purchase, index) => {
    let div = document.createElement("div");
    div.className = "purchase-item";
    div.innerHTML = `
      <strong>${purchase.name}</strong><br>
      <p class="detail">${purchase.detail}</p>
      <span >料金:</span>
      <span class="cost">¥${purchase.costs}</span>
      <span class="add-cost">+送料</span>
      <button onclick="buyAgain(${index})">購入確定</button>
    `;
    purchaseList.appendChild(div);
  });
}

function buyAgain(index) {
  let purchaseHistory = JSON.parse(localStorage.getItem("purchase") || "[]");
  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  let history = JSON.parse(localStorage.getItem("History") || "[]"); // 初めてなら空配列

  let purchaseItem = purchaseHistory[index];

  // 投稿リストから削除
  let updatedPosts = posts.filter(post => post.name !== purchaseItem.name);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));

  // 購入履歴 (purchase) から削除
  purchaseHistory.splice(index, 1);
  localStorage.setItem("purchase", JSON.stringify(purchaseHistory));

  // post-countを更新
  let postCount = parseInt(localStorage.getItem("post-count") || "0");
  postCount = Math.max(0, postCount - 1); // マイナスにならないようにする
  localStorage.setItem("post-count", postCount.toString());

  // 購入履歴 (History) に追加
  history.push(purchaseItem);
  localStorage.setItem("History", JSON.stringify(history));

  // 画面を更新
  displayPurchases();
  alert("購入しました！");
  displayHistory();

  
}



// 🟢 ページ読み込み時に購入履歴を表示
document.addEventListener("DOMContentLoaded", displayPurchases);
