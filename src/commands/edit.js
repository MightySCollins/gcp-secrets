const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const childProcess = require('child_process')
const fs = require('fs').promises
const {file} = require('tmp-promise')
const {list, getVersion, update, destroy} = require('../manager')

function openEditor(path) {
  const editor = process.env.EDITOR || 'vi'

  return new Promise(((resolve, reject) => {
    let child = childProcess.spawn(editor, [path], {
      stdio: 'inherit',
    })
    child.on('exit', code => {
      if (code === 0) {
        resolve(path)
      } else {
        reject(new Error(`${editor} has non zero exit code: ${code}`))
      }
    })
  }))
}

class EditCommand extends Command {
  async run() {
    const {flags} = this.parse(EditCommand)
    const projectName = flags.project
    let secretName = flags.secret
    if (!secretName) {
      const secrets = await list(projectName)
      let responses = await inquirer.prompt([{
        name: 'secret',
        message: 'Select secret',
        type: 'list',
        choices: secrets,
      }])
      secretName = responses.secret
    }
    const {body, version} = await getVersion(projectName, secretName)

    const {path, cleanup} = await file()
    await fs.writeFile(path, body)
    await openEditor(path)
    const newValue = await fs.readFile(path)
    if (body.toString() === newValue.toString()) {
      this.log('Secrets unchanged. No updated needed')
      return
    }
    await cleanup()
    await update(projectName, secretName, newValue)
    this.log(`Updated secret ${secretName}`)
    if (flags.destroy) {
      await destroy(projectName, secretName, version)
      this.log(`Destroyed old version ${version} of secret`)
    }
  }
}

EditCommand.description = `Describe the command here
...
Extra documentation goes here
`

EditCommand.flags = {
  project: flags.string({char: 'p', description: 'Project name'}),
  secret: flags.string({char: 's', description: 'Secret name'}),
  destroy: flags.boolean({char: 'd', description: 'If the old version of the secret should be destroyed'}),
}

module.exports = EditCommand
