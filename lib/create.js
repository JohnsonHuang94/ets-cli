import creator from './creator.js'
import path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import chalk from 'chalk'

export default async (projectName, options) => {
    const cwd = process.cwd()
    
    const targetPath = path.join(cwd, projectName)
    const config = {}
    // 判断是否有同名文件夹，做相应处理
    if(fs.existsSync(targetPath)) {
        // 如果当前目录已存在，判断是否有force参数，有的话先删除已有目录
        if(options.force) {
            await fs.remove(targetPath)
        }else {
            const { action } = await inquirer.prompt([{
                name: 'action',
                type: 'list',
                message: '目录已存在，是否覆盖？',
                choices: [
                    {name: '覆盖', value: 'overwrite'},
                    {name: '取消', value: false}
                ]
            }])
            console.log(action)
            if(!action) {
                // 如果选择取消，直接退出程序
                return 
            }
            else {
                await fs.remove(targetPath)
            }
        }
    }
    // 选择 mobile 项目还是 pc 项目  ，安装不同的依赖
    const initAction = await inquirer.prompt([{
        name: 'platform',
        type: 'list',
        message: '创建mobile项目还是pc项目',
        choices: [
            {name: 'mobile', value: 'mobile'},
            {name: 'pc', value: 'pc'}
        ]
    }, {
        name: 'vueVersion',
        type: 'list',
        message: '使用Vue2还是Vue3',
        choices: [
            {name: 'Vue2', value: 'Vue2'},
            {name: 'Vue3', value: 'Vue3'}
        ]
    },])
    console.log(initAction)
    spinner.start()
    spinner.color = 'yellow'
    spinner.text = '创建文件夹'
    fs.mkdirSync(projectName)
    const creator = new Creator(projectName, targetPath, config)
}