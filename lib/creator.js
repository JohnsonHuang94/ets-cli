import download from "download-git-repo"
import { waitLoading } from "../util/common.js"

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
    let res = null;
    switch(config.platform){
        case 'pc': 
            // 下载PC端模板
            res = await waitLoading('下载模板...', download, 'JohnsonHuang94/ets-pc', this.targetPath)
            break
        case 'mobile':
            // 下载移动端模板
            res = await waitLoading('下载模板...', download, 'JohnsonHuang94/ets-mobil', this.targetPath)
            break
        default:
            return
    }
    console.log(res)
}

export default Creator
