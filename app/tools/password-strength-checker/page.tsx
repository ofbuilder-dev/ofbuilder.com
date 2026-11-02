import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import PasswordChecker from "@/components/tools/PasswordChecker";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Password Strength Checker: How Secure Is My Password?" },
  description: "Check how strong your password is and how long it could take to crack. Runs entirely on your device: nothing is sent or saved. Plus a passphrase generator.",
  alternates: { canonical: "/tools/password-strength-checker/" },
}, "security-plus");

export default function PasswordStrength() {
  return (
    <ToolShell
      path="/tools/password-strength-checker/"
      name="Password strength checker"
      eyebrow="Security · free tool"
      title="Password strength checker"
      intro="See how strong a password is, roughly how long it could take to crack, and how to make it stronger. It runs entirely in your browser."
      apps={["security-plus"]}
    >
      <PasswordChecker />
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">What makes a password strong?</h2>
          <p className="mt-2 text-[#3d3d52]">Length matters most. A long passphrase of random words beats a short password full of symbols. Use a different password for every account, ideally with a password manager.</p>
        </div>
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">Turn on MFA</h2>
          <p className="mt-2 text-[#3d3d52]">Multi-factor authentication (MFA) protects you even if a password leaks. Use an authenticator app or a security key where you can.</p>
        </div>
      </section>
      <p className="mt-6 text-sm text-[#6b6b80]">Crack times are rough estimates for a fast offline attack. Real attacks also use leaked password lists, so never reuse passwords.</p>
    </ToolShell>
  );
}
