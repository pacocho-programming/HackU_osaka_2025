import { get, ref, set, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const auth = window.auth;
const db = window.db;

document.getElementById("serve").addEventListener("click", () => {
  const name = document.getElementById("product-name").value;
  const info = document.getElementById("product-info").value;
  const cost = document.getElementById("product-cost").value;

  // ユーザーがログインしているか確認
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`); 
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userName = snapshot.val().name || "未設定"; // ユーザー名がない場合のデフォルト値
          console.log("ユーザー情報", userName);

          const currentGroup = snapshot.val().currentGroup; // currentGroupを取得
          if (!currentGroup) {
            alert("現在のグループ情報が設定されていません");
            return; // currentGroup が設定されていない場合は処理を中止
          }

          if (name && info && cost) {
            // 位置情報取得
            navigator.geolocation.getCurrentPosition((position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const time = new Date().toLocaleString();

              // currentGroupが適切なIDや名前であることを確認
              const productRef = push(ref(db, `groups/${currentGroup}/products`));
              set(productRef, {
                userName: userName,
                cost: cost,
                info: info,
                name: name,
                longitude: longitude,
                latitude: latitude,
                time: time
              })
              .then(() => alert("商品が保存されました！"))
              .catch((error) => {
                console.error("エラー:", error);
                alert("データの保存に失敗しました");
              });
            }, () => {
              alert("位置情報の取得に失敗しました");
            });
          } else {
            alert("商品情報を入力してください");
          }
        } else {
          alert("ユーザー情報が見つかりません");
        }
      })
      .catch((error) => {
        console.error("データ取得エラー:", error);
        alert("データの取得に失敗しました");
      });
    } else {
      alert("ログインしてください");
    }
  });
});
