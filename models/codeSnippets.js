import "dotenv/config"


export class ICodeSnippetsModel {
    async get(id) {
        throw new Error("Get no implementado")
    }

    async getAll(page, pageSize) {
        throw new Error("Get no implementado")
    }

    async create(snippet) {
        throw new Error("Create no implementado")
    }

    async delete() {
        throw new Error("Delete no implementado")
    }

    async update(snippet) {
        throw new Error("Update no implementado")
    }
}