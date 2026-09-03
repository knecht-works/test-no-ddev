<div align="center">

  <img src="https://knecht.works/styleguide/favicon/favicon.svg" alt="Knecht" width="112" height="112">

# test-no-ddev

<p>
  <img src="https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt&logoColor=white" alt="Nuxt 4">
  <img src="https://img.shields.io/badge/Node-22-5FA04E?logo=nodedotjs&logoColor=white" alt="Node 22">
  <img src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white" alt="pnpm 10">
  <img src="https://img.shields.io/badge/DDEV-none-9ca3af?logo=docker&logoColor=white" alt="no DDEV">
  <img src="https://img.shields.io/badge/Knecht-e2e%20fixture-b7f8a2?labelColor=09090b" alt="Knecht e2e fixture">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

</div>

A minimal [Nuxt](https://nuxt.com) 4 app used as an end-to-end test fixture for [Knecht](https://knecht.works). It deliberately ships **no** `.ddev/config.yaml`, so Knecht has to detect the environment on its own — from `.nvmrc`, the `packageManager` field in `package.json`, the pnpm lockfile, and `composer.json` — and run `pnpm dev` as the preview dev server. The start page renders the request host, Node and Nuxt versions, the package manager, and `KNECHT_PREVIEW_URL` server-side so Knecht can assert against what actually runs inside its container.

## Setup

Requires [Node](https://nodejs.org) 22 and [pnpm](https://pnpm.io) 10 (see `.nvmrc` and `packageManager`).

```bash
pnpm install   # install dependencies
pnpm dev       # start the Nuxt dev server on 0.0.0.0:3000
```

## URLs

| Role  | URL                           |
| ----- | ----------------------------- |
| Site  | `http://localhost:3000`       |
| About | `http://localhost:3000/about` |
