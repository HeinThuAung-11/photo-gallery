import { getAuth, signOut } from "firebase/auth";

export const LogOut = () => {
    const auth = getAuth();
    console.log('logout called')
    signOut(auth).then(() => {
    }).catch((error) => {
        console.log("ERROR", error)
    });

}