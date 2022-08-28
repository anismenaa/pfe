import React from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "./employe.module.css"
const DemandeAchat = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <EmployeLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
       
      </div>
    </div>
  )
}

export default DemandeAchat