
// 画像挿入
const fileInput = document.getElementById('file-input');

const imageContainer = document.getElementById('image-container');

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const image = document.createElement('img');
      image.src = e.target.result;
      image.alt = 'Selected Image';
      image.style.width = '100px';

      imageContainer.innerHTML = '';
      imageContainer.appendChild(image);
    };

    reader.readAsDataURL(file);
  }
});

//読み込まれた際に最初に行う処理
document.addEventListener("DOMContentLoaded", function() {
  let postNumberElement = document.querySelector('.post-number');
  let savedPostNumber = localStorage.getItem('post-count') || "0"; // ない場合は0
  postNumberElement.textContent = savedPostNumber; // 画面に反映
});

//投稿内容を保存
function savePost() {
  let productName = document.querySelector('.product-name-detail').value.trim();
  let productDetail = document.querySelector('.product-detail').value.trim();
  let postNumberElement = document.querySelector('.post-number'); // span要素の取得
  let postNumber = Number(postNumberElement.textContent); // 数値として取得
  let costElement = document.querySelector('.cost');
  let cost = Number(costElement.textContent.replace(/[^\d]/g, '')); // ¥記号を除去して数値に変換

  if (isNaN(postNumber)) {
    postNumber = 0; // 初期値を設定（数値でない場合）
  }

  let postNewNumber = postNumber + 1; // 1を加算

  localStorage.setItem('post-count', postNewNumber);

  // 入力チェック
  if (productName.length === 0 || productDetail.length === 0) {
    alert("商品名と商品説明を入力してください。");
    return;
  }

  if (productName.length > 20) {
    alert("商品名は20字以内で入力してください。");
    return;
  }

  if (productDetail.length > 100) {
    alert("商品説明は1000字以内で入力してください。");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");

  posts.push({
    id: postNewNumber, // 投稿番号を保存
    name: productName,
    detail: productDetail,
    costs: cost,
    timestamp: new Date().toLocaleString()
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  // 画面上の `postNumber` を更新
  postNumberElement.textContent = postNewNumber;

  productName.value = "";
  productDetail.value = "";

  alert("投稿が保存されました！");
}

//チェックボックスの確認と処理
let costElement = document.querySelector('.cost');
let cost = Number(costElement.textContent.replace(/[^\d]/g, '')); // ¥記号を除去して数値に変換

document.querySelectorAll('.date input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {

      if (this.id === 'day3') {
        cost = 0;
      } else if (this.id === 'day2') {
        cost = 200;
      }
       else {
        cost = 500; // 初期値に戻す例
      }

      // costElementに新しい値を反映
      costElement.textContent = `¥${cost}`;

      document.querySelectorAll('.date input[type="checkbox"]').forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    }
  });
});


