import React from "react";
import styles from "../profile.module.css"
import EmployeLeftNav from "../../../component.js/leftNav/EmployeLeftNav";
import employeStyle from "./employe.module.css";
import { Link } from "@mui/material";

const DemandeAchatCreate = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <EmployeLeftNav />
      </div>
      <div className={employeStyle.rightSection}>
        <div className={employeStyle.form_area}>
          <div className={employeStyle.createUSer_bigTitle}>
            create a new demand
          </div>
          <form className={employeStyle.createUser_form}>
            <div className={employeStyle.personnal_infromation_1}>
              <input placeholder="title of the demand" className={employeStyle.input} type="text" name="demande-achat" required />
            </div>
            <div className={employeStyle.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button type="submit" className="btn btn-primary">next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DemandeAchatCreate