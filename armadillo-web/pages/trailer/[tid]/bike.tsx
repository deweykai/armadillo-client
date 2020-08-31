import React from 'react';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';

export default function Bike() {
    const router = useRouter();
    const {tid} = router.query;

    return (
        <Layout>
            <h1>Bike</h1>
            <p>{tid}</p>
        </Layout>
    );
};