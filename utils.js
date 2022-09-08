import { rejects } from 'assert'
import fs from 'fs'
import { resolve } from 'path'

export const writeToFile = (filename, content) => {
    fs.writeFileSync(filename, content, 'utf-8', (err)=>{
        if(err){
            console.log(err)
        }
    })
}


export const getDataFromRequest = async (req) => {
    return new Promise((resolve, reject)=>{
        
        try{
            let body = ''
            req.on('data', (chunk)=>{
                body += chunk.toString()
            })
    
            req.on('end', ()=>{
                resolve(body)
            })
        }catch(e){
            reject(e)
        }
    })
}