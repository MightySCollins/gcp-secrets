const {Command, flags} = require('@oclif/command')
const fs = require('fs').promises
const {file} = require('tmp-promise')
const {addSecret, update} = require('../manager')
const {openEditor} = require('../files')
const {cli} = require('cli-ux')

class AddCommand extends Command {
  async run() {
    const {flags} = this.parse(AddCommand)
    const projectName = flags.project
    let secretName = flags.secret
    if (!secretName) {
      secretName = cli.prompt('Secret Name')
    }
    await addSecret(projectName, secretName)

    const {path, cleanup} = await file()
    await openEditor(path)
    const newValue = await fs.readFile(path)
    await cleanup()
    await update(projectName, secretName, newValue)
    this.log(`Created secret ${secretName}`)
  }
}

AddCommand.description = `Describe the command here
...
Extra documentation goes here
`

AddCommand.flags = {
  project: flags.string({char: 'p', description: 'Project name'}),
  secret: flags.string({char: 's', description: 'Secret name'}),
}

module.exports = AddCommand
