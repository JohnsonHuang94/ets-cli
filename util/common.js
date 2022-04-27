import fs from 'fs-extra'
import path from 'path'
// import { fileURLToPath } from 'url'
import ora from 'ora'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
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

export function waitLoading(fn , msg, ...args) {
    return new Promise( async (resolve, reject) => {
        const spinner = ora(msg) // 加载动画
        spinner.color = 'yellow'
        try{
            spinner.start()
            const data = await fn(...args)
            spinner.stop()
            resolve(data)
        }catch(err) {
            spinner.fail(`${msg} failed`)
            // await sleep(1500)
            // waitLoading(fn, msg, ...arg)
        }
    })
}