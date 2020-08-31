import React from 'react';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';

export default function Solar() {
    const router = useRouter();
    const {tid} = router.query;

    return (
        <Layout>
            <h1>Solar</h1>
            <p>{tid}</p>
        </Layout>
    );
};