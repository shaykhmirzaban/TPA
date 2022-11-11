import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCdxNSVj_fhY5Irej7pGgBmbiLzwqLVSUk",
  authDomain: "registration-form-694e2.firebaseapp.com",
  databaseURL: "https://registration-form-694e2-default-rtdb.firebaseio.com",
  projectId: "registration-form-694e2",
  storageBucket: "registration-form-694e2.appspot.com",
  messagingSenderId: "521258671770",
  appId: "1:521258671770:web:8ce8a68ec814e839c50923",
  measurementId: "G-K1BV1144XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;