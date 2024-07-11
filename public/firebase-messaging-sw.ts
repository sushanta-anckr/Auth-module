importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyDV-uh9jtUle37izB0K3yCy3kZa2XGIltw",
    authDomain: "fir-push-notification-f1960.firebaseapp.com",
    projectId: "fir-push-notification-f1960",
    storageBucket: "fir-push-notification-f1960.appspot.com",
    messagingSenderId: "675065145650",
    appId: "1:675065145650:web:2bed497ff889b91378cf2b",
    measurementId: "G-86B0903TMV"
  };

  firebase.initializeApp(firebaseConfig)

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload)=>{
    console.log('Received background message: ', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {body:payload.notification.body};

    self.registration.showNotificaiton(notificationTitle,notificationOptions)
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }