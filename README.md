gcp-secrets
===========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gcp-secrets.svg)](https://npmjs.org/package/gcp-secrets)
[![Downloads/week](https://img.shields.io/npm/dw/gcp-secrets.svg)](https://npmjs.org/package/gcp-secrets)
[![License](https://img.shields.io/npm/l/gcp-secrets.svg)](https://github.com/MightySCollins/gcp-secrets/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gcp-secrets
$ gcp-secrets COMMAND
running command...
$ gcp-secrets (-v|--version|version)
gcp-secrets/0.1.0 linux-x64 node-v14.7.0
$ gcp-secrets --help [COMMAND]
USAGE
  $ gcp-secrets COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gcp-secrets add`](#gcp-secrets-add)
* [`gcp-secrets edit`](#gcp-secrets-edit)
* [`gcp-secrets help [COMMAND]`](#gcp-secrets-help-command)
* [`gcp-secrets list`](#gcp-secrets-list)
* [`gcp-secrets view`](#gcp-secrets-view)

## `gcp-secrets add`

Describe the command here

```
USAGE
  $ gcp-secrets add

OPTIONS
  -p, --project=project  Project name
  -s, --secret=secret    Secret name

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/add.js](https://github.com/MightySCollins/gcp-secrets/blob/v0.1.0/src/commands/add.js)_

## `gcp-secrets edit`

Describe the command here

```
USAGE
  $ gcp-secrets edit

OPTIONS
  -d, --destroy          If the old version of the secret should be destroyed
  -p, --project=project  Project name
  -s, --secret=secret    Secret name

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/edit.js](https://github.com/MightySCollins/gcp-secrets/blob/v0.1.0/src/commands/edit.js)_

## `gcp-secrets help [COMMAND]`

display help for gcp-secrets

```
USAGE
  $ gcp-secrets help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `gcp-secrets list`

Describe the command here

```
USAGE
  $ gcp-secrets list

OPTIONS
  -p, --project=project   name to print
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/list.js](https://github.com/MightySCollins/gcp-secrets/blob/v0.1.0/src/commands/list.js)_

## `gcp-secrets view`

Describe the command here

```
USAGE
  $ gcp-secrets view

OPTIONS
  -p, --project=project  Project name
  -s, --secret=secret    Secret name

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/view.js](https://github.com/MightySCollins/gcp-secrets/blob/v0.1.0/src/commands/view.js)_
<!-- commandsstop -->
