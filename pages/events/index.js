import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";

import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  console.log(events);
  console.log(total);
  console.log(page);

  const lastPage = Math.ceil(total / PER_PAGE);
  //calucalte last page with math.ceil taking in the total /per page
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id} />
      ))}

      <Pagination total={total} page={page} lastPage={lastPage} />
    </Layout>
  );
}
//destructure query and set default page to 1, create a per page variable and pass it in the query beside the date

export async function getServerSideProps({ query: { page = 1 } }) {
  const totalRes = await fetch(`${API_URL}/events/count`);

  const total = await totalRes.json();

  //calculte start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );

  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
