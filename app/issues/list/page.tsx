import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
//import delay from 'delay';
import IssueToolbar from './IssueToolbar';
import { Status } from '@prisma/client';

interface Props {
    searchParams: { status: Status };
}
const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const issues = await prisma.issue.findMany({
        where: {
            status
        }
    });
    //console.log(searchParams.status);
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
