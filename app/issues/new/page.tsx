'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
//import SimpleMDE from 'react-simplemde-editor';
//import 'easymde/dist/easymde.min.css';
import React from 'react';
//import { useForm, Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}
const NewIssuePage = () => {
    const router = useRouter();
    //const { register, control, handleSubmit } = useForm<IssueForm>();
    const { register, control, handleSubmit } = useForm<IssueForm>();
    console.log(register('title'));
    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data);
                router.push('/issues');
            })}
        >
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <TextArea placeholder="Description" {...register('description')} />

            <Button>Summit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
//Couldn't add SimpleMDE component, because it causes
//issue with building project,had to replace with
//TextArea component
//<SimpleMDE placeholder="Description" />;
//-------------------------------------------------------------------------------------------
//<Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />;
