'use client';
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes';
//import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
//import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

//interface IssueForm {
//    title: string;
//    description: string;
//}
type IssueForm = z.infer<typeof createIssueSchema>;
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
});
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
    const [isSubmitting, setSubmitting] = useState(false);
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
                        setSubmitting(true);
                        await axios.post('/api/issues', data);
                        router.push('/issues');
                    } catch (error) {
                        setSubmitting(false);
                        setError('an unexpected error occurred');
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Summit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
//Couldn't add SimpleMDE component, because it causes
//issue with building project,had to replace with
//TextArea component
//<SimpleMDE placeholder="Description" />;
//<TextArea placeholder="Description" {...register('description')} />
//-------------------------------------------------------------------------------------------
//<Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />;
