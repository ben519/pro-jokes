'use client';

import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase"
import { collection, query, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {
  const [user, setUser] = useState(undefined);
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const getJokes = async () => {
      const q = query(collection(db, "jokes"));
      try {
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJokes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getJokes();
  }, [])

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
    <main>
      <h1>Pro Jokes</h1>

      {
        jokes.map(joke => (
          <div key={ joke.id }>
            <hr />
            <p>Q: { joke.setup }</p>
            <p>A: { !user
              ? "You must sign in to see this punchline."
              : !user.emailVerified
                ? "You must verify your email address to see this punchline."
                : joke.punchline
            }
            </p>
          </div>
        ))
      }

    </main>
  )
}
