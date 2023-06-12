import React from "react";
import styles from "../styles/navbar.module.css";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    deleteCookie("theToken", { path: "/" });
    router.push("/");
  };
  return (
    <div>
      <button onClick={logout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
