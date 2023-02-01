'use client';

import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


export default function Navbar() {
    const [user, setUser] = useState(undefined);

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

    return (
        <nav>
            <Link href="/">Home</Link>
            { !user && <>&nbsp;| <Link href="/signup">Sign up</Link></> }
            { !user && <>&nbsp;| <Link href="/signin">Sign in</Link></> }
            { user && <>&nbsp;| <Link href="#">Sign out</Link></> }
            { user && <>&nbsp;| { user.email }</> }
        </nav>
    )
}
