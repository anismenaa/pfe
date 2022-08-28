import React from "react";
import styles from "../profile.module.css"
import AchatLeftNav from "../../../component.js/leftNav/AchatLeftNav";
import StockLeftNav from "../../../component.js/leftNav/StockLeftNav";

const stock = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <StockLeftNav />
      </div>
      <div className={styles.rightSection}>

      </div>
    </div>
  )
}

export default stock