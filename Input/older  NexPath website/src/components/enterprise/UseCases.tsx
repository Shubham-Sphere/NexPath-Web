import { enterpriseData } from "./enterprise.data";

export function UseCases() {
  return (
    <section className="border-b py-24" id="use-cases">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">
            USE CASES
          </span>
          <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Standards that hold up under every kind of work.
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            The same review applies everywhere. These are the workflows where enterprise teams see
            the difference first.
          </p>
        </div>

        <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5" role="list">
          {enterpriseData.useCases.map((useCase, i) => (
            <li key={i} className="bg-card p-5">
              <h4 className="text-sm font-bold">{useCase.title}</h4>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{useCase.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default UseCases;
