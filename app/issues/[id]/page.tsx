import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
//import delay from 'delay';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
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
            <IssueDetails issue={issue} />
            <EditIssueButton issueId={issue.id} />
        </Grid>
    );
};

export default IssueDetailPage;
