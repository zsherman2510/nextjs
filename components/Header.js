import styles from "../styles/Header.module.css";
import { useContext } from "react";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/events/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary">
                  <a>Logout</a>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/account/register">
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
