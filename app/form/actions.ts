export type FormState = { error: string | null };

export async function handleSubmit(_prevState: FormState, formData: FormData): Promise<FormState> {
    // Log on the server (visible in the terminal, not the browser console)
    console.log("[server action] formData:", Object.fromEntries(formData.entries()));

    return { error: null };
}