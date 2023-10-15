import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Heading, Text, Card, Flex, Grid, Box, Button } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
//import delay from 'delay';

import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
interface Props {
    params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();
    //await delay(2000);
    return (
        <Grid
            gap={'5'}
            columns={{
                initial: '1',
                md: '2'
            }}
        >
            <Box>
                <div className="my-6">IssueDetailPage</div>
                <Heading>{issue.title}</Heading>
                <Flex gap="3" className="my-3">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAT.toDateString()}</Text>
                </Flex>
                <Card>
                    <p>{issue.description}</p>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
