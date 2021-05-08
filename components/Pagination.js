import Link from "next/link";

export default function Pagination({ lastPage, page, total }) {
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
      <div>
        Page {page} of {lastPage}
      </div>
      <div>Total: {total}</div>
    </>
  );
}
