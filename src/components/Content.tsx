import styles from "../styles/components/Content.module.css";
import Image from "next/image";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

function Content() {
  const { user } = useContext(LoginContext);

  return (
    <div className={styles.contentContainer}>
      <div>
        <h1>
          Welcome, <span>{user && user}</span> !!
        </h1>

        <Image
          className={styles.img}
          src="/festaNoBG.png"
          alt="Picture of the author"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}

export default Content;
