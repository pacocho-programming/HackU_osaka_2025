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
      ${post.detail.trim()} 
      <button onclick="deletePost(${index})">削除</button>
    `;

    postList.appendChild(div);
  });
}

function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
//消去ボタンを押した時に出品数を減らしていく
  let postNumberElement = document.querySelector('.post-number');
  let postNumber = Number(localStorage.getItem("post-count")) || 0;

  if (postNumber > 0) {
    postNumber -= 1;
    localStorage.setItem("post-count", postNumber);
    postNumberElement.textContent = postNumber; // 表示を更新
  }
  displayPosts(); // 再表示
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", displayPosts);
