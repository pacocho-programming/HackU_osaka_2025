document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.querySelector(".post-button");
  const loaderContainer = document.querySelector(".loader-container");

  postButton.addEventListener("click", function (event) {
    event.preventDefault(); // ボタンの通常動作を止める
    loaderContainer.style.display = "flex"; // ローディングを表示

    setTimeout(() => {
      window.location.href = "post-02/post02.html"; // 3秒後にページ遷移
    }, 2000);
  });
});


function displayPosts() {
  let postList = document.getElementById("postList");
  
  postList.innerHTML = ""; // 一度リセット

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");

  if (posts.length === 0) {
    postList.innerHTML = "<p>投稿がありません。</p>";
    return;
  }

  posts.forEach((post, index) => {
    let div = document.createElement("div");
    div.className = "post-item";
    div.innerHTML = `
      <strong>${post.name.trim()}</strong> (${post.timestamp})<br>
      <p>${post.detail.trim()}</p>
      <button onclick="buy(${index})">購入</button>
    `;

    postList.appendChild(div);
  });
}


function displayPosts() {
  let postList = document.getElementById("postList");
  postList.innerHTML = ""; // 一度リセット

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  let purchaseHistory = JSON.parse(localStorage.getItem("purchase") || "[]");

  if (posts.length === 0) {
    postList.innerHTML = "<p>投稿がありません。</p>";
    return;
  }

  posts.forEach((post, index) => {
    let isPurchased = purchaseHistory.some(p => p.name === post.name); // 購入済みチェック

    let div = document.createElement("div");
    div.className = "post-item";
    
    // Google マップのリンク（緯度・経度をパラメータとして渡す）
    let mapLink = post.latitude && post.longitude
      ? `<br><a href="https://www.google.com/maps?q=${post.latitude},${post.longitude}" target="_blank" class="post-location">投稿場所を地図で見る</a>`
      : "";

    div.innerHTML = `
      <strong>${post.name.trim()}</strong> (${post.timestamp})<br>
      ${post.detail.trim()} <strong>¥${post.costs}</strong>${mapLink}<br>
      <button id="buy-btn-${index}" 
              ${isPurchased ? "disabled" : ""}
              style="${isPurchased ? "background:#ccc; cursor:not-allowed;" : ""}" 
              onclick="buy(${index})">購入</button>
    `;

    postList.appendChild(div);
  });
}




// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", displayPosts);

//購入ボタンが押された時の処理
let purchaseHistory = [];

function buy(index) {
  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  let purchaseHistory = JSON.parse(localStorage.getItem("purchase") || "[]");

  let post = posts[index]; // 対象の投稿データを取得

  // すでに購入しているかチェック
  if (purchaseHistory.some(p => p.name === post.name)) {
    alert(`「${post.name}」はすでに購入済みです！`);
    return;
  }

  // 購入履歴に追加して保存
  purchaseHistory.push(post);
  localStorage.setItem("purchase", JSON.stringify(purchaseHistory));

  // ボタンを無効化
  let button = document.getElementById(`buy-btn-${index}`);
  if (button) {
    button.disabled = true;
    button.style.background = "#ccc"; // グレーにする
    button.style.cursor = "not-allowed";
  }

  alert(`「${post.name}」を購入予定に追加しました！`);
}


