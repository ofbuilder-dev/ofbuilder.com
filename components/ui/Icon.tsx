import { icons, type LucideProps } from "lucide-react";

// Renders a lucide icon by name. Server-only so the full icon map never ships to the client.
export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as keyof typeof icons] ?? icons.Sparkles;
  return <Cmp aria-hidden {...props} />;
}
