import React from 'react';
import { Button, Table } from '@radix-ui/themes';
import Link from '../components/Link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
//import delay from 'delay';
import IssueToolbar from './list/IssueToolbar';

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    //await delay(4000);
    return (
        <>
            <IssueToolbar />

            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issue.createdAT.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};
export const dynamic = 'force-dynamic';
//export const revalidate = 60;
export default IssuesPage;
