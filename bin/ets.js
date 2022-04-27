#! /usr/bin/env node 
import { Command } from 'commander'
import chalk from 'chalk'
import { packageJson } from '../util/common.js'
import create from '../lib/create.js'
// console.log(packageJson)
const program = new Command();
program.command('create <project-name>')
        .description('create a new vue project')
        .option('-f, --force', 'overwrite target directory if it exists')
        .action((projectName, cmd) => {
            console.log(projectName, cmd)
            create(projectName, cmd)
        })

program.command('config [value]')
        .description('inspect and modify config')
        .option('-g, --get <path>', 'get value from option')
        .option('-s, --set <path> <value>', 'set config')
        .option('-d, --delete <path>', 'delete value from option')
        .option('-a, --all [value]', 'get all config')
        .action((val, cmd) => {
            console.log(val, cmd)
        })

program.usage('<command> [option]')
        .version(packageJson.version)

program.on('--help', () => {
    // 运行ku <command> --help 获取命令的详细用法
    console.log(`Run ${chalk.cyan('ku <command> --help')} for detailed usage of given command`)
})

program.parse(process.argv)