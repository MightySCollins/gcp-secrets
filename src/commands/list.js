const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')
const {list} = require('../manager')

class ListCommand extends Command {
  async run() {
    const {flags} = this.parse(ListCommand)
    const projectName = flags.project
    const secrets = await list(projectName)

    cli.table(secrets, {
      name: {
        minWidth: 7,
      },
      created: {},
    }, {
      printLine: this.log,
      ...flags,
    })
  }
}

ListCommand.description = `Describe the command here
...
Extra documentation goes here
`

ListCommand.flags = {
  project: flags.string({char: 'p', description: 'name to print'}),
  ...cli.table.flags(),
}

module.exports = ListCommand
