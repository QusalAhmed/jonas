import { z } from "zod";

// Tiptap
import type {JSONContent} from '@tiptap/core'

export const formSchema = z.object({
    title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    slug: z.string(),
    content: z.custom<JSONContent>(() =>{
        return true
    }),
    user: z.string().min(1, {
        message: "Please select a valid user.",
    }),
    category: z.enum(["tech", "life", "sports", "food", "travel"]),
    images: z.array(z.instanceof(File), {
        message: "Please upload at least one file.",
    }).min(1, "Please upload a file"),
})