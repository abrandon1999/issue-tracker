'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
//import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import React from 'react';

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root>
                <TextField.Input placeholder="Title" />
            </TextField.Root>
            <TextArea placeholder="Description" />
            <Button>Summit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
//Couldn't add SimpleMDE component, because it causes
//issue with building project,had to replace with
//TextArea component
//<SimpleMDE placeholder="Description" />;
