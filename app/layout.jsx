import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
