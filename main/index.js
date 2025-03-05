document.addEventListener("DOMContentLoaded", function () {
  const postButton = document.querySelector(".signin-page");
  const loaderContainer = document.querySelector(".loader-container");

  postButton.addEventListener("click", function (event) {
    event.preventDefault(); // ボタンの通常動作を止める
    loaderContainer.style.display = "flex"; // ローディングを表示

    setTimeout(() => {
      window.location.href = "login&signin/signin.html"; // 3秒後にページ遷移
    }, 2000);
  });
});
