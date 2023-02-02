'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState(undefined);
    const [fullName, setFullName] = useState('');

    // Lookup a user's full name based on their uid
    async function getFullName(uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFullName(docSnap.data().fullName);
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("=== onAuthStateChanged() invoked ============");

            if (currentUser) {
                // User signed in
                console.log("currentUser", currentUser)
                setUser(currentUser);

                // Update fullName
                getFullName(currentUser.uid);
            } else {
                // User signed out
                setUser(undefined);
            }
        });

        // unsubscribe from the listener when the component unmounts
        return unsubscribe;
    }, []);

    function handleSignOut(event) {
        // Prevent page redirect
        event.preventDefault();

        // Sign the user out
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push('/signin');
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <nav>
            <Link href="/">Home</Link>
            { !user && <>&nbsp;| <Link href="/signup">Sign up</Link></> }
            { !user && <>&nbsp;| <Link href="/signin">Sign in</Link></> }
            { user && <>
                &nbsp;|&nbsp;
                <Link href="/signin" onClick={ e => handleSignOut(e) }>
                    Sign out
                </Link>
            </> }
            { user && <>&nbsp;| { fullName }</> }
        </nav>
    )
}
