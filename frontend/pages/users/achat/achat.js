import React, { useEffect } from "react";
import styles from "../profile.module.css"
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import axios from "axios";

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