# Branch Protection Recommendations

Apply these to `main` once the GitHub repo exists:

- require pull requests before merge
- require at least one approval
- require status checks to pass:
  - `lint`
  - `typecheck`
  - `test`
  - `build`
- require branches to be up to date before merge
- block force pushes
- block branch deletion
- enable Dependabot security updates
- enable CodeQL analysis

If you later add production secrets or admin content flows, add CODEOWNERS for:

- deployment config
- Supabase schema
- admin auth
- environment and secret handling
