import { codeSnippetSchema } from "../schemas/codeSnippets.js";

export class CodeSnippetsController {

    constructor({ codeSnippetsModel }) {
        this.codeSnippetsModel = codeSnippetsModel
    }

    create = async (req, res) => {

        const parseResult = codeSnippetSchema.safeParse(req.body)

        if (!parseResult.success) {
            res.status(400).send({
                error: parseResult.error.errors
            })
            return
        }

        try {
            const snippet = await this.codeSnippetsModel.create(parseResult.data)
            res.status(201).send(snippet)

        } catch (error) {
            res.status(500).send()
        }

        return
    }

    delete = async (req, res) => {
        const { id } = req.params

        if (!id || typeof (id) !== "string") {
            res.status(400).send()
            return
        }

        try {
            await this.codeSnippetsModel.delete(id)
            res.status(200).send()

        } catch (error) {
            res.status(500).send()
        }

        return
    }

    update = async (req, res) => {
        const parseResult = codeSnippetSchema.optional().safeParse(req.body)

        if (!parseResult.success || !req.params.id) {
            res.status(400).send()
            return
        }

        try {
            const snippet = await this.codeSnippetsModel.update(req.params.id, parseResult.data)
            res.status(200).send(snippet)

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }

        return
    }

    getById = async (req, res) => {
        const { id } = req.params

        if (!id || typeof (id) !== "string") {
            res.status(400).send()
            return
        }

        try {
            const snippet = await this.codeSnippetsModel.get(id)
            res.send(snippet)

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }

        return
    }

    getAll = async (req, res) => {
        const { pageSize, nextPageToken } = req.query

        try {
            const codes = await this.codeSnippetsModel.getAll(pageSize, nextPageToken)
            res.send(codes)

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }

        return
    }
}