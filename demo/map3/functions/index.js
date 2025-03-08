const functions = require("firebase-functions/v1");  // v1 APIを使用
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateDeviceLocation = functions.firestore
    .document("devices/{deviceId}")
    .onWrite((change, context) => {
        const newValue = change.after.data();
        const previousValue = change.before.data();

        // 位置情報が変更された場合の処理
        if (newValue.latitude !== previousValue.latitude || newValue.longitude !== previousValue.longitude) {
            // 必要な処理をここに追加
            console.log(`Document ID: ${context.params.deviceId}`);
        }
    });
