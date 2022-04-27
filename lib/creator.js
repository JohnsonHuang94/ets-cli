import downloadRepo from "download-git-repo"
import {promisify} from 'util'
import { waitLoading } from "../util/common.js"

const download = promisify(downloadRepo)
function Creator(projectName, targetPath, config){
    this.projectName = projectName
    this.targetPath = targetPath
    this.config = config
}

Creator.prototype.create = async function(){
    console.log('create')
    const config = this.config || {
        platform: 'pc',  // 默认pc项目
    }
    console.log(config)
    switch(config.platform){
        case 'pc': 
            console.log('pc repo')
            // const res = await waitLoading(download, '下载模板...', 'git@github.com:JohnsonHuang94/student-app.git', this.targetPath)
            const res = await waitLoading(download, '下载模板...', 'https://github.com:JohnsonHuang94/pr', this.targetPath, {clone: true})
            
            console.log(res)
            console.log('初始化成功')
        case 'mobile':
            console.log('mobile repo')
        default:
            return
    }
}

export default Creator
