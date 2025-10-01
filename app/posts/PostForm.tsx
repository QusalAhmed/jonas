"use client"

import { useEffect, useState } from "react"
import axios from "axios";
import slugify from "slugify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { nanoid } from 'nanoid'

// Local import
import handleSubmit from "@/app/posts/SubmitForm";
import MyEditor from "@/app/posts/Editor";

// ShadCN UI
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Next.js
import Image from "next/image"

// Icon
import { CircleX } from "lucide-react"


export default function ProfileForm() {
    const [users, setUsers] = useState<{ id: string, name: string }[] | null>(null);
    const [editorContent, setEditorContent] = useState<string>('');

    useEffect(() => {
        axios.get('api/users').then((response) => {
            if (response.data.length > 0) {
                setUsers(response.data)
            }
        }).catch((error) => {
                console.error('Error fetching users:', error);
            }
        )
    }, []);

    const formSchema = z.object({
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

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            user: users ? users[0].id : "",
            category: "life",
            slug: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        handleSubmit(values).then((response) => {
            console.log(response);
            if (response.status === 200) {
                alert("Post created successfully!");
                form.reset();
            } else {
                alert("Failed to create post.");
            }
        });
    }

    const titleValue = form.watch('title');
    const selectedImages = form.watch('images');

    useEffect(() => {
        selectedImages?.filter((file) => file.size > 5 * 1024 * 1024).forEach((file) => {
            alert(`File ${file.name} is too large. Maximum size is 5MB.`);
            const updatedFiles = selectedImages.filter((f) => f !== file);
            form.setValue('images', updatedFiles);
        });
    }, [selectedImages, form]);

    useEffect(() => {
        const newSlug = slugify(titleValue || '', {lower: true})
        form.setValue('slug', newSlug + '-' + nanoid());
    }, [titleValue, form])

    useEffect(() => {
        form.setValue('content', editorContent);
    }, [editorContent, form])

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Post Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Post title" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Title of the post
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/* Auto-Generated, Disabled Slug Field */}
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="slug-will-appear-here" disabled {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={() => (
                            <FormItem>
                                <FormLabel>Post Content</FormLabel>
                                <FormControl>
                                    {/* Use TipTap editor instead of a textarea. It updates form.content via setEditorContent/useEffect. */}
                                    <div>
                                        <MyEditor setEditorContent={(html) => {
                                            setEditorContent(html)
                                            // Keep form value in sync for validation/submission
                                            form.setValue('content', html, { shouldValidate: true })
                                        }} />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Rich text content for your post
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="user"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Select User</FormLabel>
                                <FormControl>
                                    <select {...field} className="border rounded px-2 py-1">
                                        {users?.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <select {...field} className="border rounded px-2 py-1">
                                        <option value="tech">Tech</option>
                                        <option value="life">Life</option>
                                        <option value="sports">Sports</option>
                                        <option value="food">Food</option>
                                        <option value="travel">Travel</option>
                                    </select>
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/*Display selected images*/}
                    <div className="grid grid-cols-4 md:grid-cols-8 items-center gap-4">{/*Image upload*/}
                        <FormField
                            control={form.control}
                            name="images"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"bg-amber-300 px-4 py-2 rounded-lg cursor-pointer text-center"}>
                                        <div className={'flex flex-col items-center justify-center'}>
                                            {selectedImages?.length ? `Add More Images` : `Upload Images`}
                                            {selectedImages?.length > 8 ?
                                                <div className={'font-light font-mono'}>
                                                    It is recommended to upload upto 8 images
                                                </div> : ''}
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => {
                                                const newFile = [...selectedImages || [], ...(e.target.files || [])];
                                                console.log(newFile);
                                                field.onChange(newFile);
                                            }}
                                            multiple={true}
                                            accept="image/*"
                                            hidden
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {selectedImages?.length > 0 && (
                            Array.from(selectedImages as unknown as FileList).map((file, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={URL.createObjectURL(file as File)}
                                        alt={(file as File).name.split('.')[0]}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <Button type={'button'}
                                            variant={'ghost'}
                                            className="absolute top-1 right-1 p-1 h-auto w-auto"
                                            onClick={() => {
                                                const updatedFiles = selectedImages.filter((f) => f !== file);
                                                form.setValue('images', updatedFiles);
                                            }}
                                    >
                                        <CircleX size={16}/>
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>

                    <Button type="submit" className={'w-full'}>Submit</Button>
                </form>
            </Form>
        </>
    )
}