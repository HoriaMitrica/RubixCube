import Link from 'next/link';

export default function Home() {
  return (
    <>
    <h1 className="m-8 font-bold bg-sky-400">
    Homepage
    </h1>
    <Link href="/Cube3x3">
        <button>Go to Cube 3x3</button>
      </Link>
    </>
  );
}
