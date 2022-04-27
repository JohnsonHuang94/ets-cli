function Creator(projectName, targetPath, config){
    this.projectName = projectName
    this.targetPath = targetPath
    this.config = config
}

Creator.prototype.create = function(){
    const config = this.config || {
        platform: 'pc',  // 默认pc项目
        vueVersion: 'Vue2'  //默认使用Vue2
    }
}