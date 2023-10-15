import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes';
import React from 'react';

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
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
    );
};

export default IssueDetails;
