'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


export default function Navbar() {
    const [user, setUser] = useState(undefined);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("=== onAuthStateChanged() invoked ============");

            if (currentUser) {
                // User signed in
                console.log("currentUser", currentUser)
                setUser(currentUser);
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
                &nbsp;|
                <Link href="/signin" onClick={ e => handleSignOut(e) }>
                    Sign out
                </Link>
            </> }
            { user && <>&nbsp;| { user.email }</> }
        </nav>
    )
}
