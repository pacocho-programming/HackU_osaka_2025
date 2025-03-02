let product_name_input = document.querySelector('.product-name-detail'); // 正しいクラス名を指定

product_name_input.addEventListener('input', function() {
  let product_name_length = product_name_input.value.length;  // "length" に修正

  if (product_name_length > 20) {
    alert("20字以内で記入してください");
    product_name_input.value = "";  // 入力をクリア
    product_name_input.focus();     // 再度入力欄にフォーカスを当てる
  }
});

