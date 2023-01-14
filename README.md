# vite-vscode

This creates jsconfig.json tsconfig.json vscode/settings.json from viteConfig/resolve/alias.

<a href="https://npmjs.com/package/vite-vscode">
  <img src="https://img.shields.io/npm/v/vite-vscode" alt="npm package"> 
</a>

<br/>

# Features

- No configuration
- Lightweight

<br/>

## Installation

- with npm

```shell
npm i vite-vscode
```

- with yarn

```shell
yarn add vite-vscode
```

- with pnpm

```shell
pnpm add vite-vscode
```

<br/>

# Setup

`/* vite.config.js */`

Configure your application with whatever configuration you want.

## Basic Usage:

```js
import viteVSCode from 'vite-vscode'

const plugins = [/* Other plugins... */ viteVSCode()]

export default defineConfig({ plugins /* Whatever.... */ })
```

## Advanced usages :

```js
import viteVSCode, { config } from 'vite-vscode'

const resolve = { alias: config.aliases('$', './src') }
const plugins = [/* Other plugins... */ viteVSCode()]

// createAlias takes a prefix and target dir
// Returns child dirs with the prefix

// ./src/components  ---  $components
// ./src/layouts     ---  $layouts
// ./src/store       ---  $store

export default defineConfig({ plugins /* Whatever.... */ })
```

---

<br/>

---

Made by [Nazmus Sayad](https://github.com/NazmusSayad) with ❤️.
