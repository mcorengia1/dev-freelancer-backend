import express from 'express'
import cors from 'cors'
import "dotenv/config"
import { createCodeSnippetsRouter } from './routes/code-snippets.js'

export function createApp({ codeSnippetsModel }) {
    const PORT = process.env.PORT ?? 3000
    const app = express()

    app.use(cors())
    app.use(express.json())

    app.use('/code-snippets', createCodeSnippetsRouter({ codeSnippetsModel }))

    app.listen(PORT, () => console.log("Runing on port = " + PORT))
}

