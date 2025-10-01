import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(10, {
        message: "Title must be at least 10 characters.",
    }),
    slug: z.string(),
    content: z.string().min(10, {
        message: "Content must be at least 100 characters.",
    }),
    user: z.string().min(1, {
        message: "Please select a valid user.",
    }),
    category: z.enum(["tech", "life", "sports", "food", "travel"]),
    images: z.array(z.instanceof(File), {
        message: "Please upload at least one file.",
    }).min(1, "Please upload a file"),
})