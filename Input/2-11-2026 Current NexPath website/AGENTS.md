<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Enterprise content lives in typed page-local data and section components under `src/components/enterprise`; the route composes them to keep homepage changes additive.
- Enterprise unresolved URLs never become navigable links or active form endpoints; placeholders remain visible to prevent false delivery or broken navigation.
- Enterprise FAQ structured data derives from the visible FAQ data to prevent copy drift.
- Enterprise section layouts live under `src/components/enterprise2` (the only Enterprise page, now at `/enterprise`) and reuse shared tokens and primitives so experiments do not change the homepage. The previous Enterprise v1 comparison page was removed; `/enterprise-2` no longer exists.
