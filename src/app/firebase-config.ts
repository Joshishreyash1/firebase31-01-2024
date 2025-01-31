import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { environment } from "../environments/environment";


if(!firebase.apps.length){
    firebase.initializeApp(environment.firebaseConfig);
}


export default firebase;