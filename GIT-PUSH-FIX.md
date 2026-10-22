# GIT-PUSH-FIX — push to `Shubham-Sphere/NexPath-Web`

**Goal:** push this repo to the **Shubham-Sphere** account, with **no CLI login**
and **no logout** of anything.
**State:** ✅ **DONE.** The SSH key is registered and `main` is pushed.
**Last updated:** 2026-10-22

---

## 1. The one action you needed to take — ✅ completed

Signed in to GitHub as **Shubham-Sphere**, open
<https://github.com/settings/ssh/new> and add this SSH key:

| Field | Value |
|---|---|
| Title | `NexPath-Web - jemi` |
| Key | `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMrhcqkct11ETsD+py2/S1T/MKbnj7rNrKKU34Xy9HJ6 shubham@emptyops.com` |

Paste the key as one single line, including the `ssh-ed25519` prefix and the
`shubham@emptyops.com` suffix. Click **Add SSH key**.

No token, no `gh auth login`, no `gh auth logout`.

---

## 2. Then run these two commands — ✅ both done

```bash
cd "/home/jemi/Desktop/NexPath web"
ssh -T git@github-shubham        # -> Hi Shubham-Sphere! You've successfully authenticated, ...
git push -u origin main          # -> * [new branch]      main -> main
```

`ssh -T` exits with code **1 even on success** — GitHub refuses shell access by
design, so the greeting is the real signal, not the exit code.

Result: `main` now tracks `origin/main` at `a40fca1`.
Repo: <https://github.com/Shubham-Sphere/NexPath-Web>

---

## 3. Why this is the route

Your machine already had everything needed — except one fact that GitHub was
missing: **that the key `~/.ssh/id_ed25519_shubham` belongs to Shubham-Sphere.**
Registering the public key tells GitHub exactly that. No credential, no session,
no login state is involved.

### The other accounts and why they are not part of this

| Account | Role here |
|---|---|
| `bhavnesh75` | **Not your account — excluded.** Its `gh` session and its SSH key were left exactly as they were. Nothing was logged out, nothing was switched, nothing was pushed to it. |
| `Shubham-Sphere` | Owns the target repo. Gets a **new, dedicated key** (`id_ed25519_shubham`) so the two accounts never interfere. |

### Routes that were tested and rejected

| Route | Result | Why it fails |
|---|---|---|
| Push with the old `git@github.com:` remote | `Permission to Shubham-Sphere/NexPath-Web.git denied to bhavnesh75.` | That key authenticates as `bhavnesh75`, which only has **READ** on the repo. |
| `ssh -i ~/.ssh/id_ed25519_shubham -T git@github.com` | `Permission denied (publickey)` | That key was registered on **no** account yet. **Step 1 fixes exactly this.** |
| Push with the captured `ghu_uagy…` token | `403 Permission denied` | It is a GitHub **App user token**: it shows ADMIN *viewer* permission, but it has no `Contents: write` permission, and it expires in about an hour. |
| Fork `Shubham-Sphere/NexPath-Web` and push to the fork | `Empty repositories cannot be forked` | The upstream repo has zero commits, so GitHub refuses to fork it. |
| `gh auth login --with-token` with a PAT | Works, but it **is** a login | It would add an account rather than log one out, but it needs a PAT minted in the browser. An SSH key does the same job with no token at all. |
| `gh auth logout` / `gh auth switch` | Not needed | Nothing was logged out, so there is nothing to undo. |

### Device-code logins that were cancelled

Two GitHub device-code requests were waiting for approval from an earlier
attempt (`4476-E096` and `4DC1-E321`). Both were **cancelled** — no login was
completed and no session was created. The `gh` session for `bhavnesh75` is still
active and unmodified.

---

## 4. What is already done on this machine

| Item | State |
|---|---|
| Key pair | `~/.ssh/id_ed25519_shubham` (+ `.pub`). Fingerprint `SHA256:sC/46jr4d7B7BCsvDYCC0nRXc3V9/ZfYADsFeL/Lu80` |
| `~/.ssh/config` | Created. Alias `github-shubham` → `github.com`, pinned to `IdentityFile ~/.ssh/id_ed25519_shubham`, `IdentitiesOnly yes` |
| Plain `github.com` | Still resolves to `~/.ssh/id_ed25519` → `bhavnesh75`. Unchanged. |
| Repo remote | `origin → git@github-shubham:Shubham-Sphere/NexPath-Web.git` |
| Commits | `a40fca1` "Rewrite GIT-PUSH-FIX as a self-contained instruction sheet", `33fae1a` "Rewrite push-fix notes for the Shubham-Sphere SSH-key route", `653d4bb` "Add Supermemory v5 memory layer, smoke-test scripts and push-fix notes", `c8bbc1c` "Initial commit" — all pushed to `origin/main` |
| Upstream | `Shubham-Sphere/NexPath-Web`, public, default branch `main`, `HEAD = a40fca1` |
| Secrets | `.env` is gitignored (`git check-ignore -v .env` confirms). Only `.env.example` is tracked. Nothing secret is being pushed. |
| Supermemory setup | Untouched by any of this. `.env` stays local, `~/.supermemory/` is untouched. |

Undo the remote change at any time with:

```bash
git remote set-url origin git@github.com:Shubham-Sphere/NexPath-Web.git
```

---

## 5. If the push still fails

| Message | Meaning | Fix |
|---|---|---|
| `Permission denied (publickey)` on `ssh -T git@github-shubham` | The key is not on the Shubham-Sphere account (or was pasted incompletely) | Redo step 1 with the full one-line key. |
| `ssh -T` says `Hi <someone-else>!` | The key was added to a different account | Move it in Settings → SSH and GPG keys on that account, then add it to Shubham-Sphere. |
| `Permission to Shubham-Sphere/NexPath-Web.git denied` | The key maps to Shubham-Sphere but that account lacks write access | Confirm with `gh repo view Shubham-Sphere/NexPath-Web --json viewerPermission` (want `WRITE` or `ADMIN`). |
| `remote: Permission denied` on push only | The branch is protected | Push a different branch or open a PR: `git push -u origin HEAD:push-nexpath-web`. |

---

## 6. Reference commands (all read-only, safe to run any time)

```bash
gh auth status                                  # bhavnesh75 — still active, nothing logged out
gh repo view Shubham-Sphere/NexPath-Web --json viewerPermission,isPrivate
gh repo list bhavnesh75
ssh -T git@github.com                           # -> Hi bhavnesh75!  (default key, unchanged)
ssh -T git@github-shubham                       # -> Hi Shubham-Sphere!  (after step 1)
ssh-keygen -lf ~/.ssh/id_ed25519_shubham.pub
git remote -v
git log --oneline
```

---

## 7. Safety notes

- `~/.ssh/id_ed25519_shubham` is the **private** key — never share it, never paste
  it into GitHub. Only the `.pub` file goes into the web form.
- The public key is safe to paste anywhere.
- Nothing in this document involves a Supermemory credential; the two setups are
  independent.
