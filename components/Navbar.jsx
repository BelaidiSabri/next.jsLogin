import styles from "../styles/navbar.module.css";
import { deleteCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LogoutButton = dynamic(() => import("./LogoutButton.jsx"), {
  ssr: false,
});

const Navbar = () => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(true);

  const logout = () => {
    menu();
    deleteCookie("theToken", { path: "/" });
    router.push("/");
  };

  const menu = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn();
    }
  }, []);

  // if logged in show logout button
  const isLoggedIn = () => {
    return hasCookie("theToken");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <ul className={dropdown ? styles.ul : styles.menu_ul}>
        <li className={styles.li}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/dashboard" className={styles.link}>
            Dashboard
          </Link>
        </li>
        <div className={styles.li}>
          {isLoggedIn() && <LogoutButton onClick={logout} />}
        </div>
      </ul>
      <div onClick={menu} className={styles.hamburger}>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
        <span className={styles.span}></span>
      </div>
    </div>
  );
};

export default Navbar;
