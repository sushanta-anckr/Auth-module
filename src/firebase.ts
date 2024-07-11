import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDV-uh9jtUle37izB0K3yCy3kZa2XGIltw",
  authDomain: "fir-push-notification-f1960.firebaseapp.com",
  projectId: "fir-push-notification-f1960",
  storageBucket: "fir-push-notification-f1960.appspot.com",
  messagingSenderId: "675065145650",
  appId: "1:675065145650:web:2bed497ff889b91378cf2b",
  measurementId: "G-86B0903TMV",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// console.log('*** Environment ***', process.env.REACT_APP_ENV)
// console.log('*** Firebase Config ***', firebaseConfig)


export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey:
        "BHbn3y3ysoZrzoOS8d7_GY2JN-Zt3O7uV54XMBBe8e4poG1YPcVUxpMRY6IGwt8B64zEGlavuqUqMncb5ZsfxX0",
      serviceWorkerRegistration,
    })
  );

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));


export {messaging};