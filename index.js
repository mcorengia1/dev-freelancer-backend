import 'dotenv/config'
import { createFirestoreApp } from './servers/firestore.js'

const provider = process.env.DB_PROVIDER

if (provider === 'firestore') {
    createFirestoreApp()
}
