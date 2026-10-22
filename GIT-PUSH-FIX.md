# Fixing `git push` to `Shubham-Sphere/NexPath-Web`

Status: **One browser step left** · Last updated: 2026-10-22 16:55
Goal: push to the **Shubham-Sphere** repo, with **no CLI login** and **no logout**.

---

## TL;DR

Your terminal is already fully prepared. Exactly one thing is missing and it is
**not a login**: GitHub does not know that the key
`~/.ssh/id_ed25519_shubham` belongs to the **Shubham-Sphere** account.

**Do this in the browser (signed in as Shubham-Sphere):**

1. Open <https://github.com/settings/ssh/new>
2. Title: `NexPath-Web - jemi`
3. Key (paste this whole line):

   ```
   ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMrhcqkct11ETsD+py2/S1T/MKbnj7rNrKKU34Xy9HJ6 shubham@emptyops.com
   ```

4. Click **Add SSH key**

**Then in the terminal:**

```bash
cd "/home/jemi/Desktop/NexPath web"
ssh -T git@github-shubham      # expect: Hi Shubham-Sphere! You've successfully authenticated
git push -u origin main
```

That is it. No `gh auth login`. No `gh auth logout`. The existing `bhavnesh75`
session is untouched and still works exactly as before.

---

## What is already done (no action needed)

| Item | State |
|---|---|
| SSH key for Shubham-Sphere | `~/.ssh/id_ed25519_shubham` (+ `.pub`) created, fingerprint `SHA256:sC/46jr4d7B7BCsvDYCC0nRXc3V9/ZfYADsFeL/Lu80` |
| `~/.ssh/config` | Created with a `github-shubham` alias that pins `IdentityFile ~/.ssh/id_ed25519_shubham`, `IdentitiesOnly yes` |
| Plain `github.com` | Still maps to `~/.ssh/id_ed25519` → `bhavnesh75`. Unchanged, nothing logged out |
| Repo remote | `origin → git@github-shubham:Shubham-Sphere/NexPath-Web.git` |
| Local commits | `653d4bb` "Add Supermemory v5 memory layer, smoke-test scripts and push-fix notes" (plus the earlier `Initial commit`) |
| Secrets | `.env` is gitignored (verified with `git check-ignore -v .env`); only `.env.example` is tracked |

Undo the remote change at any time:

```bash
git remote set-url origin git@github.com:Shubham-Sphere/NexPath-Web.git
```

---

## Verified state (checked 2026-10-22 16:50)

### Accounts on this machine

| Account | Key | gh session | Role here |
|---|---|---|---|
| `bhavnesh75` | `~/.ssh/id_ed25519` (registered on that account) | logged in, keyring token, active | untouched, not used for this push |
| `Shubham-Sphere` | `~/.ssh/id_ed25519_shubham` (**not registered yet**) | not logged in — and deliberately so | the account that owns the target repo |

### The one blocker

```
$ ssh -T git@github-shubham
git@github.com: Permission denied (publickey).
```

The key is valid and the host alias works; GitHub simply has no record of this
public key for the Shubham-Sphere account. Registering it (steps above) resolves
it — no token, no PAT, no login.

### Why the earlier attempts failed

| Attempt | Result | Reason |
|---|---|---|
| `git push origin main` with the old `git@github.com:` remote | `Permission to Shubham-Sphere/NexPath-Web.git denied to bhavnesh75.` | the key authenticated as `bhavnesh75`, which has only **READ** on that repo |
| `ssh -i ~/.ssh/id_ed25519_shubham -T git@github.com` | `Permission denied (publickey)` | that key is registered on **no** account yet |
| Push with the captured `ghu_uagy…` token | `403 Permission denied` | it is a **GitHub App user token**: ADMIN *viewer* permission, but no `Contents: write`. Also expires in ~1 hour |
| `gh repo fork Shubham-Sphere/NexPath-Web` | `Empty repositories cannot be forked` | the upstream repo has zero commits, GitHub refuses to fork it |
| Device-code flows `4476-E096`, `4DC1-E321` | cancelled / timed out | you asked for no login, so the waiting pollers were stopped. Nothing is pending |

### Paths that were deliberately not taken

- **Pushing to `bhavnesh75/NexPath-Web`** — that account is not yours, so it is
  off-limits. (It is empty and you have ADMIN there, but it is not the target.)
- **`gh auth login --with-token` with a PAT** — it would *add* an account rather
  than log one out, but it is still a login and it needs a PAT minted in the
  browser. Registering an SSH key is strictly less work and creates no token.
- **`gh auth logout` / `gh auth switch`** — nothing was logged out, so there was
  nothing to undo.

---

## After the key is registered

```bash
# 1. confirm the identity
ssh -T git@github-shubham
#   -> Hi Shubham-Sphere! You've successfully authenticated, ...

# 2. push
cd "/home/jemi/Desktop/NexPath web"
git push -u origin main

# 3. verify
gh repo view Shubham-Sphere/NexPath-Web --json url,defaultBranchRef
#   -> the repo now has a main branch
```

To inspect the pushed commits without a web UI:

```bash
git ls-remote origin
```

### If the push is rejected with `Permission denied`

That means the key was added to a **different** account than the one that owns
the repo. Check with:

```bash
ssh -T git@github-shubham   # must say "Hi Shubham-Sphere!"
```

If it says a different name, the key is registered on the wrong account — move
it in GitHub Settings → SSH keys, and make sure the **shubham@emptyops.com**
comment line above was pasted along with the key.

---

## Reference commands (read-only)

```bash
gh auth status                      # bhavnesh75, still active — nothing logged out
gh repo view Shubham-Sphere/NexPath-Web --json viewerPermission,isPrivate
gh repo list bhavnesh75
ssh -T git@github.com               # -> Hi bhavnesh75! (default key, unchanged)
ssh -T git@github-shubham           # -> Hi Shubham-Sphere! (after you register the key)
ssh-keygen -lf ~/.ssh/id_ed25519_shubham.pub
git remote -v
```

## Hygiene notes

- `~/.ssh/id_ed25519_shubham` (private) must never be shared. Only the `.pub`
  file is pasted into GitHub.
- The Supermemory setup is untouched by any of this: `~/.supermemory/` and
  `SUPERMEMORY_API_KEY` in `.env` are separate, and `.env` is not pushed.
