'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ShadCN UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
    name: z.string()
        .min(1, {message: "Name is required"})
        .min(2, {message: "Name must be at least 2 characters"}),
    email: z.email({message: "Please enter a valid email"}).toLowerCase()
        .endsWith('@gmail.com', {message: "Please enter a valid gmail address"}),
    role: z.enum(["admin", "moderator"]),
});

type FormValues = z.infer<typeof FormSchema>;

export default function App() {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "admin",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block mb-2">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block mb-2">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            className="flex"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <div className="flex-1 hover:bg-teal-100 rounded-xl">
                                                <RadioGroupItem value="admin" id="admin" className="peer sr-only"/>
                                                <Label
                                                    htmlFor="admin"
                                                    className="peer-data-[state=checked]:bg-green-300 p-2 rounded-xl cursor-pointer transition-colors w-full flex items-center justify-center"
                                                >
                                                    Admin
                                                </Label>
                                            </div>
                                            <div className="flex-1 hover:bg-teal-100 rounded-xl">
                                                <RadioGroupItem value="moderator" id="moderator" className="peer sr-only"/>
                                                <Label
                                                    htmlFor="moderator"
                                                    className="peer-data-[state=checked]:bg-emerald-300 p-2 rounded-xl cursor-pointer transition-colors w-full flex items-center justify-center"
                                                >
                                                    Moderator
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}