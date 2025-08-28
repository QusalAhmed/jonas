"use client";
import React, { useActionState, useOptimistic, startTransition } from "react";
import { useFormStatus } from "react-dom";

// Local
import { handleSubmit, type FormState as State } from "./actions";
import App from "./Optimistic"

// Shad CN
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        // Doesn't work
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Submitting...' : 'Submit'}
        </Button>
    );
}

function FormPage() {
    const [state, formAction, isPending] = useActionState<State, FormData>(handleSubmit, {error: null});
    const [optimisticState, addOptimistic] = useOptimistic(
        {name: 'jonas', email: 'qusalcse@gmail.com', role: 'admin'},
        (state) => {
            return {
                ...state,
                email: 'email@gmail.com',
            }
        },
    );

    console.log(state, isPending);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <App/>
            {Object.entries(optimisticState).map(([key, value]) => (
                <div key={key}>{value}</div>
            ))}
            <form action={formAction}
                  className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
                  onClick={()=> startTransition(async () => {
                      addOptimistic({name: 'jonas', email: '', role: 'admin'})
                      await new Promise((res) => setTimeout(res, 1000));
                  })}
            >
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                <div className="mb-4">
                    <Label htmlFor="name" className="block mb-2">
                        Name
                    </Label>
                    <Input id="name" type="text" name="name" placeholder="Enter your name" required/>
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" className="block mb-2">
                        Email
                    </Label>
                    <Input id="email" type="email" name="email" placeholder="Enter your email" required/>
                </div>
                <div className="mb-4">
                    <RadioGroup defaultValue="admin" name="role" className="flex">
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
                            <RadioGroupItem id="moderator" value="moderator" className="peer sr-only"/>
                            <Label
                                htmlFor="moderator"
                                className="peer-data-[state=checked]:bg-emerald-300 p-2 rounded-xl cursor-pointer transition-colors w-full flex items-center justify-center"
                            >
                                Moderator
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <SubmitButton/>
            </form>
        </div>
    );
}

export default FormPage;
