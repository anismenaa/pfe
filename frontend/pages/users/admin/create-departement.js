import React from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import adminStyle from "./css/createUser.module.css"

const Admin_add_departement = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav />
      </div>
      <div className={adminStyle.rightSection}>
        <div className={adminStyle.form_area}>
          <div className={adminStyle.createUSer_bigTitle}>
            create a new departement
          </div>
          <form className={adminStyle.createUser_form}>
            <div className={adminStyle.personnal_infromation_1}>
              <input placeholder="name of the departement" className={adminStyle.input} type="text" name="departement" required />
            </div>
            <div className={adminStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button type="submit" className="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin_add_departement