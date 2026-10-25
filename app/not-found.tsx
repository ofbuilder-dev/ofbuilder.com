import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-16 pt-44 text-center">
        <Blobs opacity={0.35} fade />
        <div className="relative mx-auto max-w-2xl">
          <p className="font-display text-rainbow text-8xl font-extrabold sm:text-9xl">404</p>
          <h1 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">This page took a wrong turn.</h1>
          <p className="mt-4 text-lg text-[#3d3d52]">The link may be old or mistyped. Here are some good places to go instead.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-[#0f0f1a] px-7 py-4 font-bold text-white transition-transform hover:-translate-y-1">
              Go home
            </Link>
            <Link href="/free-tests/" className="rounded-full bg-[#10b981] px-7 py-4 font-bold text-white transition-transform hover:-translate-y-1">
              Free mock tests
            </Link>
            <Link href="/apps/" className="rounded-full bg-white px-7 py-4 font-bold ring-1 ring-black/10 transition-transform hover:-translate-y-1">
              All apps
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
