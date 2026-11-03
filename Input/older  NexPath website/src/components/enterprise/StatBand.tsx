import { cn } from "@/lib/utils";
import { enterpriseData } from "./enterprise.data";

export function StatBand() {
  return (
    <section className="border-b py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {enterpriseData.statBand.map((cell, i) => (
            <div key={i} className="bg-card p-6 lg:p-8">
              <span
                className={cn(
                  "text-4xl font-extrabold",
                  cell.primary ? "text-primary" : "text-foreground",
                )}
              >
                {cell.value}
              </span>
              <h3 className="mt-3 text-sm font-bold">{cell.label}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{cell.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatBand;
