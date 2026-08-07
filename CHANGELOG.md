<!-- markdownlint-disable -->
<!-- eslint-disable markdown/no-missing-label-refs -->
# 📜 Changelog

## ✨ What's Changed in v1.0.20

- <b>Commit Range: ➡️</b> [`v1.0.19...v1.0.20`](https://github.com/Nick2bad4u/eslint-plugin-vite/compare/v1.0.19...v1.0.20 "View full commit range on GitHub")

### 🛠️ Bug Fixes

- [`1ceb233`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/1ceb233ad0ddf343610d78283b0cc06cdf2c6c78 "Diff: 2 files, +219 | -3") — *(package)* Pin analyzer pack invocation <sub><em>(2 files, +219, -3)</em></sub>

- [`72e8669`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/72e86692047bd027bc4ffe0b4a63142df4c5cca1 "Diff: 1 file, +3 | -0") — *(lint)* Make Tombi formatting cross-platform <sub><em>(1 file, +3, -0)</em></sub>

- [`fb63447`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/fb6344797a0fb2012d9c60f5777a46cc69de3edd "Diff: 1 file, +4 | -4") — *(docs)* Pin inspector build tooling <sub><em>(1 file, +4, -4)</em></sub>

- [`26b0040`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/26b0040eceb9402dd045c1f3e377efc5348f5d97 "Diff: 2 files, +5 | -3") — *(lint)* Harden docs runtime guard <sub><em>(2 files, +5, -3)</em></sub>

- [`2117002`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/2117002351dc14d548a2815280a92a81d9377e27 "Diff: 2 files, +10 | -10") — *(release)* Address workflow review findings <sub><em>(2 files, +10, -10)</em></sub>

- [`a2b7eaa`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/a2b7eaa8373a723ad1ea2afe08975ae4f5296f97 "Diff: 3 files, +4 | -0") — *(ci)* Disable setup-node auto-cache bootstrap <sub><em>(3 files, +4, -0)</em></sub>

- [`82d9969`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/82d99699d2ccd37d276c612d8e51c12d55673ce1 "Diff: 3 files, +36 | -8") — *(ci)* Bootstrap npm before cache setup <sub><em>(3 files, +36, -8)</em></sub>

- [`4c92a03`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/4c92a03477eaa8b8b2f7e821d61db87709194a1a "Diff: 26 files, +291 | -278") — *(lint)* Resolve upgraded static-analysis findings <sub><em>(26 files, +291, -278)</em></sub>

🚜 [refactor] Simplify rule control flow, remove unused internal exports, and centralize JavaScript language metadata for all 72 rules.

🧪 [test] Assert plugin metadata uses the package version and every registered rule declares the ESLint JavaScript language.

🔧 [chore] Replace broad Knip suppressions with verified dynamic-consumer exceptions, remove an invalid empty secret-scanning config, and synchronize Mermaid defaults.

🎨 [style] Apply the upgraded shared Stylelint ordering and defensive grid rules to the documentation homepage.

### 📝 Documentation

- [`e7f2bb3`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/e7f2bb3e6b2e47b076bbf7275d4558767eadd114 "Diff: 2 files, +14 | -7") — *(contributing)* Clarify maintenance prerequisites <sub><em>(2 files, +14, -7)</em></sub>

### 🧪 Testing

- [`0acf6e9`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/0acf6e911671b676d6bbc14607e1bb78b17c8424 "Diff: 2 files, +20 | -0") — *(rules)* Cover lint-refactor branches <sub><em>(2 files, +20, -0)</em></sub>

### 🧹 Chores

- [`f45f9c5`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/f45f9c5a49759bb21369b1b9ec19033e03893cc8 "Diff: 1 file, +0 | -33") — *(editor)* Remove extension recommendations <sub><em>(1 file, +0, -33)</em></sub>

- [`2d8515d`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/2d8515d4723c25ba7a254a12a411239511b50bac "Diff: 1 file, +58 | -141") — *(labeler)* Align rules with branch conventions <sub><em>(1 file, +58, -141)</em></sub>

- [`c7caf91`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/c7caf91a97a61f1439f2ffdfbce767503338db0b "Diff: 17 files, +2968 | -2478") — *(tooling)* Adopt shared package configs <sub><em>(17 files, +2968, -2478)</em></sub>

Move NCU, JSCPD, TypeDoc, and the remaining validation tools onto maintained shared presets, refresh dependencies, and keep the generated README table formatter-stable.

Validated with npm ci --force, release:verify, lint:all, 400 tests plus typechecks/docs/package, Lychee smoke, Actionlint, recursive script graph, sync checks, and diff audits.

- [`59ded9d`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/59ded9db786dc832bc3a5065087b3b2218eb3896 "Diff: 1 file, +1 | -1") — 🔧 [chore] Keep JSCPD and Lychee out of lint all <sub><em>(1 file, +1, -1)</em></sub>

🔧 [chore] Leave the dedicated JSCPD and Lychee scripts available while keeping aggregate CI lint runs focused on existing gates.

- [`7e2cb1e`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/7e2cb1e2bd19e966f8094f6101cd0f617dc7994f "Diff: 5 files, +175 | -477") — 🔧 [chore] Adopt shared validation configs <sub><em>(5 files, +175, -477)</em></sub>

🔧 [chore] Wire JSCPD, git-cliff, and Lychee through shared config packages.

👷 [ci] Point release-note generation at the shared git-cliff config where workflows invoke git-cliff directly.

### 👷 CI/CD

- [`2ac40a8`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/2ac40a8bb9b90f5637441d8952aa2dc9247d5672 "Diff: 8 files, +213 | -342") — *(release)* Guard git-cliff note generation <sub><em>(8 files, +213, -342)</em></sub>

Validate the authoritative release tag at HEAD immediately before git-cliff and export GitHub authentication for enriched notes. Standardize Actionlint configuration and direct package CLI usage where applicable.

### 🔧 Build System

- [`d077fb1`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/d077fb1e5281832f4e59e5d9a0cf40b6ca744ee6 "Diff: 12 files, +3256 | -6618") — *(npm)* Migrate release tooling to npm 12 <sub><em>(12 files, +3256, -6618)</em></sub>

⬆️ [build] Pin npm 12.0.2 across the root, docs workspace, CI, deployment, and release jobs; refresh all dependencies and remove unused packages.

🔒️ [build] Enforce strict lifecycle-script allowlisting with exact approvals for SWC, esbuild, and unrs-resolver while denying reviewed nonessential scripts.

🐛 [fix] Update npm 12 argument forwarding, changelog generation, clean-install behavior, and pack metadata parsing for package-keyed JSON output.

🧪 [test] Cover npm 11 and npm 12 pack metadata shapes, including missing and ambiguous filenames.

### 📦 Dependencies

- [`4e636b0`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/4e636b0ec50ac2b7046247f866b6236ff4d9a52b "Diff: 1 file, +28 | -28") — ⬆️ [build] Update npm_and_yarn dependencies <sub><em>(1 file, +28, -28)</em></sub>

- [`7759e6c`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/7759e6cd91fdebcc0404fd8f67f7698b97df85b4 "Diff: 1 file, +3 | -3") — ⬆️ [build] Update npm_and_yarn dependencies <sub><em>(1 file, +3, -3)</em></sub>

- [`8eed7ab`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/8eed7ab49aa6f52a01f6d9c80c77af763a669282 "Diff: 1 file, +13 | -29") — ⬆️ [build] Update npm_and_yarn dependencies <sub><em>(1 file, +13, -29)</em></sub>

### 🛡️ Security

- [`b2bf515`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/b2bf5150f472ea5943086281db860e8a00fcfb6f "Diff: 1 file, +2 | -2") — *(ci)* Remove on-demand analyzer risk <sub><em>(1 file, +2, -2)</em></sub>

- [`57389bc`](https://github.com/Nick2bad4u/eslint-plugin-vite/commit/57389bccf53a76b44d9302bebc8890874a2d12b1 "Diff: 3 files, +45 | -17") — *(release)* Harden pack metadata parsing <sub><em>(3 files, +45, -17)</em></sub>

> [!NOTE]
> **Release comparison**: https://github.com/Nick2bad4u/eslint-plugin-vite/compare/v1.0.19...v1.0.20

