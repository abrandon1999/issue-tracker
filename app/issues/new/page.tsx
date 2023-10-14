'use client';
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes';
//import SimpleMDE from 'react-simplemde-editor';
//import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
//import { useForm, Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

//interface IssueForm {
//    title: string;
//    description: string;
//}
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
    const router = useRouter();
    //const { register, control, handleSubmit } = useForm<IssueForm>();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setError('an unexpected error occurred');
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                {errors.title && (
                    <Text color="red" as="p">
                        {errors.title.message}
                    </Text>
                )}
                <TextArea placeholder="Description" {...register('description')} />
                {errors.description && (
                    <Text color="red" as="p">
                        {errors.description.message}
                    </Text>
                )}
                <Button>Summit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
//Couldn't add SimpleMDE component, because it causes
//issue with building project,had to replace with
//TextArea component
//<SimpleMDE placeholder="Description" />;
//-------------------------------------------------------------------------------------------
//<Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />;
