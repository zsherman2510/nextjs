import Layout from '@/components/Layout'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {API_URL} from '@/config/index'
import qs from 'qs'
import EventItem from '@/components/EventItem'

export default function Search({events}) {
    const router = useRouter();
  console.log(events);
  return (
    
    <Layout title="Search Results">
      <h1>Search Results for {router.query.term}</h1>
      <Link href='/events'>Go Back</Link>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem evt={evt}key={evt.id}/>
      ))}
    </Layout>
    
  )
}

export async function getServerSideProps({query: {term}}){
  const query = qs.stringify({
      _where:{
          _or: [
              {Name_contains: term},
              {performers_contains: term},
              {description_contains: term},
              {venue_contains: term},
              
          ]
      }
  })
  const res = await fetch(`${API_URL}/events?${query}`)

  const events = await res.json()

  return {
    props: {events}
    
  }
}
