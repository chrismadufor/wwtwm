import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="h-screen w-full flex flex-col items-center justify-center bg-blue-800 pl-20">
        <p className="text-5xl">Who Wants To Win Some Money?</p>
        <Link href="/question">
          <button className="orange-bg py-3 px-8 mt-8">Start Game</button>
        </Link>
      </div>
    </main>
  );
}
