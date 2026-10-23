import { playDeveloperUrl, suites } from "@/lib/apps";
import NavClient from "./NavClient";

export default function Nav() {
  const links = suites.map(({ id, name, tagline, emoji, color }) => ({ id, name, tagline, emoji, color }));
  return <NavClient suites={links} playUrl={playDeveloperUrl} />;
}
