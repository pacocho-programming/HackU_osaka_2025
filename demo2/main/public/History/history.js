document.addEventListener("DOMContentLoaded", function () {
  displayHistory();
});

function displayHistory() {
  let historyList = document.querySelector(".history-display"); // `.history-display` を取得
  historyList.innerHTML = "<h2>購入履歴</h2>"; // 見出しを追加

  let history = JSON.parse(localStorage.getItem("History") || "[]");

  if (history.length === 0) {
    historyList.innerHTML += "<p>購入履歴がありません。</p>";
    return;
  }

  history.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <strong>${item.name}</strong> <br>
      <p>${item.detail}</p>
      <span>料金: ¥${item.costs}</span>
      <span class="add-cost">+ 送料</span>
    `;
    historyList.appendChild(div);
  });
}
