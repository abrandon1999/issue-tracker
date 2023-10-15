import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Card, Flex, Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssueDetailPage = () => {
    return (
        <Box className="max-w-xl">
            <div className="my-6">IssueDetailPage</div>
            <Skeleton />
            <Flex gap="3" className="my-3">
                <Skeleton width={'5rem'} />
                <Skeleton width={'8rem'} />
            </Flex>
            <Card>
                <Skeleton count={3} />
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;
