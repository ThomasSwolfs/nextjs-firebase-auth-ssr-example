
var admin = require("firebase-admin");
var serviceAccount = require("./serviceaccount.json");

async function getFirebaseAdmin() {
if(!admin.apps.length){
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
}
return admin;
}

export default getFirebaseAdmin;