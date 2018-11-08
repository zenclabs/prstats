prstats
=======

Gather statistics about GitHub pull requests

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/prstats.svg)](https://npmjs.org/package/prstats)
[![CircleCI](https://circleci.com/gh/zenclabs/prstats/tree/master.svg?style=shield)](https://circleci.com/gh/zenclabs/prstats/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/prstats.svg)](https://npmjs.org/package/prstats)
[![License](https://img.shields.io/npm/l/prstats.svg)](https://github.com/zenclabs/prstats/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g prstats
$ prstats COMMAND
running command...
$ prstats (-v|--version|version)
prstats/0.0.0 darwin-x64 node-v10.13.0
$ prstats --help [COMMAND]
USAGE
  $ prstats COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`prstats hello [FILE]`](#prstats-hello-file)
* [`prstats help [COMMAND]`](#prstats-help-command)

## `prstats hello [FILE]`

describe the command here

```
USAGE
  $ prstats hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ prstats hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/zenclabs/prstats/blob/v0.0.0/src/commands/hello.ts)_

## `prstats help [COMMAND]`

display help for prstats

```
USAGE
  $ prstats help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_
<!-- commandsstop -->
