function displayPurchases() {
  let purchaseList = document.getElementById("purchaseList");
  let purchaseHistory = JSON.parse(localStorage.getItem("purchase") || "[]");

  purchaseList.innerHTML = ""; // リセット

  if (purchaseHistory.length === 0) {
    purchaseList.innerHTML = "<p>購入履歴がありません。</p>";
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
  let purchase = purchaseHistory[index];
  alert(`「${purchase.name}」を購入しました！`);

}


// 🟢 ページ読み込み時に購入履歴を表示
document.addEventListener("DOMContentLoaded", displayPurchases);
