import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import {useTrailerList} from '../common/trailer'

export default function Home() {
  const trailers = useTrailerList();

  return (
    <Layout home>
      <Head>
        <title>Armadillo</title>
      </Head>
      {trailers ? (
        <ul>
          {trailers.map(trailer => (
            <li><Link href={`/trailer/${trailer.id}`}>
              <a>{trailer.name}</a>
            </Link></li>
          ))}
        </ul>
      ) : (
        <div>No Trailers Found</div>
      )}
    </Layout>
  )
}
