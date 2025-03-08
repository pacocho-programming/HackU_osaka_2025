/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

const db = admin.database();

// ドライバーの位置情報を取得する
exports.getDriverLocation = functions.https.onRequest((req, res) => {
    const driverId = req.query.driver_id; // クエリパラメータからドライバーIDを取得
    const driverRef = db.ref(`drivers/${driverId}/location`);
    
    driverRef.once('value', snapshot => {
        const driverLocation = snapshot.val();
        res.status(200).send(driverLocation);
    }).catch((error) => {
        res.status(500).send('Error fetching driver location: ' + error);
    });
});
