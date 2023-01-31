import Link from "next/link";


export default function Navbar() {
    return (
        <nav>
            <Link href="/">Home</Link> |&nbsp;
            <Link href="/signup">Sign up</Link> |&nbsp;
            <Link href="/signin">Sign in</Link>
        </nav>
    )
}