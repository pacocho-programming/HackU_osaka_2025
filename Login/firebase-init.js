// Firebase SDKを読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase } from  "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase 設定をグローバル変数として定義
window.firebaseConfig = {
  apiKey: "AIzaSyCfhWYBmoRDI5e4jLVjSBPuBWZ8XR2WFVE",
  authDomain: "paco-90ab4.firebaseapp.com",
  projectId: "paco-90ab4",
  storageBucket: "paco-90ab4.firebasestorage.app",
  messagingSenderId: "708200423892",
  appId: "1:708200423892:web:c77b88f8fb66ea29147641",
  measurementId: "G-14CGHVFVER"
};

// Firebase 初期化をグローバル変数として設定
window.app = initializeApp(window.firebaseConfig);
window.auth = getAuth(window.app); // どのページでも認証が使えるようにする
window.db = getDatabase(window.app);

