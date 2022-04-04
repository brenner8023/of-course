import { exec } from 'child_process'

function main() {
  exec('tsup')
  exec('cp -r chrome/icons dist')
  exec('cp -r chrome/manifest.json dist')
}

main()
