import { ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const db = window.db;
const auth = window.auth;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // グループ作成ボタンがクリックされた場合
    document.getElementById("make-group").addEventListener("click", () => {
      const groupName = document.getElementById("groupName").value;
      const groupPassword = document.getElementById("password").value;

      if (groupName && groupPassword) {
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userName = userData.name;

            const groupRef = ref(db, `groups/${groupName}`);
            set(groupRef, {
              password: groupPassword,
              leader: userName,
              members: {
                [user.uid]: { name: userName }
              }
            }).then(() => {
              alert("グループが作成されました！");
              document.getElementById("password").value = "";
            }).catch((error) => alert("エラー: " + error.message));
          } else {
            alert("ユーザー情報が見つかりません");
          }
        }).catch((error) => alert("ユーザー情報取得に失敗しました: " + error.message));
      } else {
        alert("グループ名とパスワードを入力してください");
      }
    });

    // グループ入室ボタンがクリックされた場合
    document.getElementById("group-in").addEventListener("click", () => {
      const groupName = document.getElementById("groupName").value;
      const groupPassword = document.getElementById("password").value;

      if (groupName && groupPassword) {
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userName = userData.name;

            const groupRef = ref(db, `groups/${groupName}`);
            get(groupRef).then((snapshot) => {
              if (snapshot.exists()) {
                const groupData = snapshot.val();
                if (groupData.password === groupPassword) {
                  const members = groupData.members || {};
                  members[user.uid] = { name: userName };

                  update(groupRef, { members: members })
                    .then(() => {          
                      return update(userRef, { currentGroup: groupName });
                    })
                    .then(() => {
                      alert("グループに参加しました！");
                      window.location.href = "../html/home.html";
                    })
                    .catch((error) => alert("エラー: " + error.message));
                } else {
                  alert("パスワードが違います");
                }
              } else {
                alert("グループが見つかりません");
              }
            }).catch((error) => alert("グループ情報の取得に失敗しました: " + error.message));
          } else {
            alert("ユーザー情報が見つかりません");
          }
        }).catch((error) => alert("ユーザー情報の取得に失敗しました: " + error.message));
      } else {
        alert("グループ名とパスワードを入力してください");
      }
    });
  } else {
    alert("ログインしてください");
  }
});
