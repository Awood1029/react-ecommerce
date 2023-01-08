import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDWHH9_LMycT0izDFo9r4yIEmsTvBHQSSI",
	authDomain: "crwn-clothing-db-9b33d.firebaseapp.com",
	projectId: "crwn-clothing-db-9b33d",
	storageBucket: "crwn-clothing-db-9b33d.appspot.com",
	messagingSenderId: "487200991823",
	appId: "1:487200991823:web:b9d1580005aa3bb990583a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);

	//if user data exists, return userDocRef
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}

	return userDocRef;

	//if data does not exists, create/set document with data from userAuth
};
