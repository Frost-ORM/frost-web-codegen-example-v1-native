import { Frost } from '@frost-orm/frost-web-client'


import {
getDatabase
} from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC-a69VedItFUk2K_9wUyINaQRF_XzJy7M",
    authDomain: "contractors-f1d51.firebaseapp.com",
    databaseURL: "https://contractors-f1d51-default-rtdb.firebaseio.com",
    projectId: "contractors-f1d51",
    storageBucket: "contractors-f1d51.appspot.com",
    messagingSenderId: "765929125502",
    appId: "1:765929125502:web:ed8a7e28fd7751466b8a2f",
    measurementId: "G-E1Z90RWJ2Z"
  }

if(!Object.keys(firebaseConfig).length) {
    alert("Missing Firebase Configuration")
    throw new Error("Missing Firebase Configuration");
}


export const FrostApp = Frost.initialize(firebaseConfig)
console.log(Frost.getIndices())
export const fireDB = getDatabase(FrostApp.firebaseApp)
