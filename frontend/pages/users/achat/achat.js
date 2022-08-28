import React from "react";
import styles from "../profile.module.css"
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";

const Achat = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AchatLeftNav />
      </div>
      <div className={styles.rightSection}>

      </div>
    </div>
  )
}

export default Achat