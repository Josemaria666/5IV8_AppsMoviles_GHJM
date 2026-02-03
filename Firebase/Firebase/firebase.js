import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRi8jOZUdV3fqVKVlU0mX2ueNAcrFMZrs",
  authDomain: "login-e1a09.firebaseapp.com",
  projectId: "login-e1a09",
  storageBucket: "login-e1a09.firebasestorage.app",
  messagingSenderId: "105892868286",
  appId: "1:105892868286:web:99e61e80b0ab47708caeef",
  measurementId: "G-XKJPQQHKVZ"
};

const app = initializeApp(firebaseConfig);

// Esta es la forma correcta para evitar el error de la imagen
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});