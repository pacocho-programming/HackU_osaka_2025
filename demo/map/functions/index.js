const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.saveUserLocation = functions.database.ref('/users/{userId}')
    .onCreate((snapshot, context) => {
        const newValue = snapshot.val();
        const userId = context.params.userId;
        
        // ユーザーの位置情報を保存または処理
        console.log(`New user location: ${newValue.latitude}, ${newValue.longitude}`);
    });
