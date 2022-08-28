import React from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";
import DirectorLeftNav from "../../../component.js/leftNav/DirectorLeftNav";

const Director = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorLeftNav />
      </div>
      <div className={styles.rightSection}>

      </div>
    </div>
  )
}

export default Director