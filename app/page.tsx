import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="h-screen w-full bg-blue-800 pl-20">
        <p>Home Page</p>
        <Link href="/question">
          <button className="orange-bg py-3 px-8 mt-5">Start Game</button>
        </Link>
      </div>
    </main>
  );
}
