import React from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import createUSer from "./css/createUser.module.css"

const Admin_add_user = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav />
      </div>
      <div className={createUSer.rightSection}>
        <div className={createUSer.form_area}>
          <div className={createUSer.createUSer_bigTitle}>
            create a new user
          </div>
          <form className={createUSer.createUser_form}>
            <div className={createUSer.personnal_infromation_1}>
              <input placeholder="name" className={createUSer.input} type="text" name="name" required />
              <input placeholder="surname" className={createUSer.input} type="text" name="surname" required />
            </div>
            <div className={createUSer.personnal_information_2}>
              <input placeholder="email" className={createUSer.input} type="email" name="email" required />
              <input placeholder="password" className={createUSer.input} type="password" name="password" required />
            </div>
            <div className={createUSer.personnal_information_3}>
              <input placeholder="departement" className={createUSer.input} type="text" name="departement" required />
              <input placeholder="authorization" className={createUSer.input} type="text" name="authorization" required />
            </div>
            <div className={createUSer.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button type="submit" className="btn btn-primary">save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin_add_user