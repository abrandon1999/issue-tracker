'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
//import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
//import { useForm } from 'react-hook-form';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Issue } from '@prisma/client';

//interface IssueForm {
//    title: string;
//    description: string;
//}
type IssueFormData = z.infer<typeof createIssueSchema>;
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false
});
const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    //const { register, control, handleSubmit } = useForm<IssueForm>();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IssueFormData>({
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
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller defaultValue={issue?.description} name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Summit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default IssueForm;
//Couldn't add SimpleMDE component, because it causes
//issue with building project,had to replace with
//TextArea component
//<SimpleMDE placeholder="Description" />;
//<TextArea placeholder="Description" {...register('description')} />
//-------------------------------------------------------------------------------------------
//<Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />;
