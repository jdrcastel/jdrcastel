---
name: add-shadcn-component
description: Add a shadcn/ui component to the portfolio, including in the cloud sandbox where the shadcn registry is blocked.
---

# Add a shadcn/ui component

Components live in `src/components/ui/` (new-york style). `components.json` is configured for the CLI.

## On Juan's machine (registry reachable)

```bash
npx shadcn@latest add <component>
```

## In the cloud sandbox (ui.shadcn.com is blocked)

1. Get the official source from GitHub (public repo, readable through the git proxy):
   ```bash
   git clone -q --depth 1 --filter=blob:none --sparse https://github.com/shadcn-ui/ui /home/user/vendor/shadcn-ui
   git -C /home/user/vendor/shadcn-ui sparse-checkout set apps/v4/registry/new-york-v4/ui
   ```
2. Copy the component and fix the utils import:
   ```bash
   sed 's|from "cn"|from "@/lib/utils"|' \
     /home/user/vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/<component>.tsx > src/components/ui/<component>.tsx
   ```
3. Install any new package it imports, at the latest stable version (`npm view <pkg> version`).

## Using components

- Static rendering is the default. In `.astro` files, React components render to HTML with no JavaScript.
- Add `client:visible` only to the island that needs interaction, and pass it only the props it uses.
- For links that look like buttons, use `buttonVariants()` on an `<a>` instead of hydrating a `Button`.
