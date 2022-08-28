import React from "react";
import styles from "../profile.module.css"
import DirectorAchatLeftNav from "../../../component.js/leftNav/DirectorAchatLeftNav";

const AchatDirector = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <DirectorAchatLeftNav />
      </div>
      <div className={styles.rightSection}>

      </div>
    </div>
  )
}

export default AchatDirector