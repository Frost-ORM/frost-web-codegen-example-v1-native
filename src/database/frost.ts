import { Frost } from '@frost-orm/frost-web-client'


import {
getDatabase
} from "@firebase/database";

const firebaseConfig = {
  }

if(!Object.keys(firebaseConfig).length) {
    alert("Missing Firebase Configuration")
    throw new Error("Missing Firebase Configuration");
}


export const FrostApp = Frost.initialize(firebaseConfig)
console.log(Frost.getIndices())
export const fireDB = getDatabase(FrostApp.firebaseApp)
