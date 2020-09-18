const {Command, flags} = require('@oclif/command')
const inquirer = require('inquirer')
const fs = require('fs').promises
const {file} = require('tmp-promise')
const {list, getVersion} = require('../manager')

class ViewCommand extends Command {
  async run() {
    const {flags} = this.parse(ViewCommand)
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
    const {body} = await getVersion(projectName, secretName)
    this.log(body.toString())
  }
}

ViewCommand.description = `Describe the command here
...
Extra documentation goes here
`

ViewCommand.flags = {
  project: flags.string({char: 'p', description: 'Project name'}),
  secret: flags.string({char: 's', description: 'Secret name'}),
}

module.exports = ViewCommand

