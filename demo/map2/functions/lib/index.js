"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRoute = exports.saveDriverLocation = exports.saveUserLocation = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();
// Cloud Function: ユーザーの位置情報をFirestoreに保存
exports.saveUserLocation = functions.https.onRequest(async (req, res) => {
    const { userId, latitude, longitude } = req.body;
    try {
        // Firestoreの 'users' コレクションに位置情報を保存
        const userRef = admin.firestore().collection('users').doc(userId);
        await userRef.set({
            latitude: latitude,
            longitude: longitude,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).send(`User location saved for ${userId}`);
    }
    catch (error) {
        res.status(500).send('Error saving user location: ' + error.message);
    }
});
// Cloud Function: 配達員の位置情報をFirestoreに保存
exports.saveDriverLocation = functions.https.onRequest(async (req, res) => {
    const { driverId, latitude, longitude } = req.body;
    try {
        // Firestoreの 'drivers' コレクションに位置情報を保存
        const driverRef = admin.firestore().collection('drivers').doc(driverId);
        await driverRef.set({
            latitude: latitude,
            longitude: longitude,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).send(`Driver location saved for ${driverId}`);
    }
    catch (error) {
        res.status(500).send('Error saving driver location: ' + error.message);
    }
});
// Cloud Function: ユーザーと配達員の経路を計算
exports.calculateRoute = functions.https.onRequest(async (req, res) => {
    const { userLat, userLon, driverLat, driverLon } = req.body;
    try {
        const routeResponse = await fetch(`https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${driverLon},${driverLat}?overview=full&geometries=geojson`);
        const routeData = await routeResponse.json();
        if (routeData.routes && routeData.routes.length > 0) {
            res.status(200).send(routeData.routes[0].geometry);  // 経路情報を返す
        }
        else {
            res.status(400).send('No route found');
        }
    }
    catch (error) {
        res.status(500).send('Error calculating route: ' + error.message);
    }
});
