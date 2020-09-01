import Head from 'next/head'
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Link from 'next/link'

const useTrailerList = () => {
  const [trailerList, setTrailerList] = useState(null);

  useEffect(() => {
      fetch('/api/trailer')
          .then((res) => res.json())
          .then((trailerList) => setTrailerList(trailerList))
          .catch(setTrailerList(null));
  }, []);

  return trailerList;
};

export default function Home() {
  const trailers = useTrailerList() || [];

  return (
    <Layout home>
      <ul>
        {trailers.map(trailer => (
          <li><Link href={`/trailer/${trailer.id}`}>
            <a>Trailer</a>
          </Link></li>
        ))}
      </ul>
    </Layout>
  )
}
