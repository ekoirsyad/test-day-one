import firebase from "firebase";
const config = {
  apiKey: "AIzaSyCCcO1m4EpcnQLu-iX7tW3aO9L9q6ivGnE",
  authDomain: "todo-107d2.firebaseapp.com",
  projectId: "todo-107d2",
  databaseUrl: "https://todo-107d2-default-rtdb.firebaseio.com/",
  storageBucket: "todo-107d2.appspot.com",
  messagingSenderId: "352927128658",
  appId: "1:352927128658:web:760a44204558f558ad538b",
  measurementId: "G-SEV9RV4CNJ",
};
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
