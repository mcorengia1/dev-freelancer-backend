import { createApp } from "../app.js";
import { CodeSnippetsModel } from "../models/firestore/codeSnippets.js";

export const createFirestoreApp = () => createApp({ codeSnippetsModel: CodeSnippetsModel })