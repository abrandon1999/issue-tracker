import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Heading, Text, Card, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
    params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();
    return (
        <>
            <div className="my-6">IssueDetailPage</div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" className="my-3">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAT.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </>
    );
};

export default IssueDetailPage;
