import claudecodeIcon from "@/assets/claudecode-color.svg";
import cursorIcon from "@/assets/cursor.svg";
import devinIcon from "@/assets/devin.svg";
import replitIcon from "@/assets/replit-color.svg";
import lovableIcon from "@/assets/lovable-color.svg";
import boltIcon from "@/assets/bolt.new.svg";
import vscodeIcon from "@/assets/vs_code.svg";
import { enterpriseData } from "./enterprise.data";

const logos = [
  { name: "Claude Code", src: claudecodeIcon },
  { name: "Cursor", src: cursorIcon },
  { name: "Windsurf (Devin)", src: devinIcon },
  { name: "Replit", src: replitIcon },
  { name: "Lovable", src: lovableIcon },
  { name: "Bolt.new", src: boltIcon },
  { name: "VS Code", src: vscodeIcon },
];

export function TrustStrip() {
  return (
    <section className="border-b py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          WORKS WITH THE AGENTS YOUR TEAM ALREADY SHIPS WITH
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map(({ name, src }) => (
            <img
              key={name}
              src={src}
              alt={name}
              loading="lazy"
              className="h-6 w-auto opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          One standard. Every agent. No rewrite of your workflow.
        </p>
      </div>
    </section>
  );
}

export default TrustStrip;
