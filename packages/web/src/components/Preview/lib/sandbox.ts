export type SandboxFiles = Record<string, { blob?: Blob; url: string }>

export function toSandboxFiles(files: Record<string, Blob>): SandboxFiles {
  // go through the files to create object URLS
  const record: SandboxFiles = {}
  for (const name in files) {
    // if the file is a SVG file, we force the blob to take correct MIME type
    if (name.slice(-4) === '.svg') {
      files[name] = files[name].slice(0, files[name].size, 'image/svg+xml')
    }
    record[name] = {
      url: URL.createObjectURL(files[name])
    }
    if (name === 'index.html') {
      record[name].blob = files[name]
    }
  }
  return record
}
