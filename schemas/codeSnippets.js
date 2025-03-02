import z from 'zod'

export const codeSnippetSchema = z.object({
    lang: z.string(),
    tags: z.string().array().optional(),
    title: z.string(),
    description: z.string(),
    imgUrl: z.string(),
    code: z.string()
})