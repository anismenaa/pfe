import React from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";

const Admin = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav />
      </div>
      <div className={styles.rightSection}>

      </div>
    </div>
  )
}

export default Admin