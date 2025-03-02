import { Router } from 'express';
import { CodeSnippetsController } from '../controllers/codeSnippets.js';

export const createCodeSnippetsRouter = ({ codeSnippetsModel }) => {
    const codeSnippetsRouter = Router();
    const codeSnippetsController = new CodeSnippetsController({ codeSnippetsModel })

    codeSnippetsRouter.post('/', codeSnippetsController.create)
    codeSnippetsRouter.get('/', codeSnippetsController.getAll)

    codeSnippetsRouter.get('/:id', codeSnippetsController.getById)
    codeSnippetsRouter.delete('/:id', codeSnippetsController.delete)
    codeSnippetsRouter.patch('/:id', codeSnippetsController.update)

    return codeSnippetsRouter
}
