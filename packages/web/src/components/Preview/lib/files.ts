import { unzip } from 'unzipit'

export const ZIP_MIMES = ['application/zip', 'application/x-zip-compressed', 'multipart/x-zip']

const mimeTypes: Record<string, string> = {
  zip: 'application/zip',
  htm: 'text/html',
  html: 'text/html',
  js: 'text/javascript',
  css: 'text/css',
  csv: 'text/csv'
}

function getMimeType(filename: string): string | false {
  const ext = filename.split('.').pop()
  return (ext && mimeTypes[ext]) || false
}

export async function unzipFile(file: File): Promise<Record<string, Blob>> {
  const { entries } = await unzip(file)

  const blobs: Record<string, Blob> = {}
  for (const name in entries) {
    const mime = getMimeType(name)
    blobs[name] = await entries[name].blob(mime || undefined)
  }

  return blobs
}

export interface FileStructure {
  [key: string]: false | FileStructure
}

export async function toFileStructure(fileList: FileList): Promise<FileStructure> {
  const structure: FileStructure = {}
  if (fileList.length === 1) {
    const file = fileList[0]
    const mime = await getMimeType(file.name)
    if (mime && ZIP_MIMES.includes(mime)) {
      let fileRecords: Record<string, Blob>
      try {
        fileRecords = await unzipFile(file)
      } catch (err) {
        return
      }
      const files = Object.keys(fileRecords)
      if (files) {
        for (const f of files) {
          const dirs = f.split('/')
          let pos = structure
          // build directories
          for (let i = 0; i < dirs.length - 1; i++) {
            if (typeof pos[dirs[i]] === 'undefined') {
              pos[dirs[i]] = {}
            }
            pos = pos[dirs[i]] as FileStructure
          }
          // add file
          pos[dirs[dirs.length - 1]] = false
        }
      }
    }
  }
  return structure
}
