import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import {useTrailerList} from '../common/trailer'
import Error from '../components/error'

export default function Home() {
  const trailers = useTrailerList();

  let error;

  if (!trailers) {
    error = <Error msg="Couldn't get trailer list" />
  }

  return (
    <Layout home name="Armadillo">
      {error ? error :
        <div className="container mx-auto m-3 border shadow-md px-4 py-2 rounded">
          

          {trailers.map(trailer => (
            <Link href={`/trailer/${trailer.id}`}>
              <a className="block mb-3 px-8 py-2 w-full rounded hover:bg-gray-500 text-lg">{trailer.name}</a>
            </Link>
          ))}
        </div>
      }
    </Layout>
  )
}
