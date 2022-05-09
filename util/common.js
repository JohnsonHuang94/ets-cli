import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'

const __dirname = path.resolve()
export const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))

function sleep(time) {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, time)
    })
}

export function waitLoading(msg, download , src, dir) {
    return new Promise( async (resolve, reject) => {
        const spinner = ora(msg) // 加载动画
        spinner.color = 'yellow'
        spinner.start()
        let retryTimes = 0;
        function load(){
            if(retryTimes > 0){
                spinner.text = '重试中...'
            }
            download(src, dir, async function(err) {
                if(err){
                    if(retryTimes < 2){
                        console.log(+new Date())
                        spinner.text = '下载失败，即将重试...'
                        await sleep(1000)
                        console.log(+new Date())
                        retryTimes++
                        load()
                    }else{
                        spinner.stop()
                        reject(err)
                    }                    
                }else{
                    spinner.stop()
                    resolve('Download Sucess!')
                }
            })
        }
        load()
    })
}