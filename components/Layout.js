import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeToggle from "components/DarkModeToggle";

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  const header =
    <div className="mb-2" style={{ display: "flex" }} >
      <ul className="flex">
        <li className="mr-6">
          <Link href="/"><a className="font-black no-underline font-display" href="#">Home</a></Link>
        </li>
        <li className="mr-6">
          <Link href="/"><a className="font-black no-underline font-display" href="#">Talks</a></Link>
        </li>
        <li className="mr-6">
          <Link href="/"><a className="font-black no-underline font-display" href="#">Contact</a></Link>
        </li>
        <li className="mr-6">
          <Link href="/"><a className="font-black no-underline font-display" href="#">About</a></Link>
        </li>
      </ul>

      <DarkModeToggle></DarkModeToggle>

    </div>

  return (
    <div className="max-w-screen-sm px-4 py-12 mx-auto antialiased font-body">
      <header>{header}</header>
      <main>{children}</main>
      <footer className="text-lg font-light">
        © {new Date().getFullYear()}, Built with ❤️
      </footer>
    </div>
  );
}
