import { connection } from "./db.js";
import fs from 'fs'
import path from "path";

const __dirname = path.resolve()

export const runMigrations = async (dirPath) => {
  const filePath = path.resolve(__dirname, dirPath)
  fs.readdir(filePath, async (error, files) => {
    files.forEach( async file => {
      fs.readFile(`${filePath}/${file}`, async (error, data) => {
        connection.query(data.toString())
      })
    })
  })
}