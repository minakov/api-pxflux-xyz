#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import git from 'git-rev-sync'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
})
console.log(process.env)

let githash = ''
try {
  githash = `+${git.short(__dirname)}`
} catch { }

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
const version = `${pkg.name}@${pkg.version}${githash}`

try {
  await build({
    bundle: true,
    sourcemap: true,
    format: 'esm',
    target: 'esnext',
    external: ['__STATIC_CONTENT_MANIFEST'],
    conditions: ['worker', 'browser'],
    entryPoints: [path.join(__dirname, '..', 'src', 'index.ts')],
    outdir: path.join(__dirname, '..', 'dist'),
    outExtension: { '.js': '.mjs' },
    define: {
      PXFLUX_VERSION: JSON.stringify(version)
    },
  })
} catch (err) {
  console.error(err)
  process.exit(1)
}
