import app from "firebase";
import "firebase/auth";
import "firebase/functions";

const devConfig = {
  apiKey: "AIzaSyB6eW2oH4xQenxD014j5PaWMQC96eC9QQQ",
  authDomain: "airspace-development-app.firebaseapp.com",
  databaseURL: "https://airspace-development-app.firebaseio.com",
  projectId: "airspace-development-app",
  storageBucket: "airspace-development-app.appspot.com",
  messagingSenderId: "109202295273",
  appId: "1:109202295273:web:9cb8dade421f367f9da378",
  measurementId: "G-8L0JLGSN9Y"
};

// Use this when to set up production version
//   const devConfig = {
//     apiKey: process.env.REACT_APP_DEV_API_KEY,
//     authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//     projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
//   };
//  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

var config = prodConfig;

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.functions = app.functions();
    this.storage = app.storage();
    this.database = app.firestore();
  }
}

export default Firebase;
