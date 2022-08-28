import React from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import adminStyle from "./css/createUser.module.css"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"

const Admin_get_departements = () => {
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav />
      </div>
      <div className={adminStyle.rightSection}>
        <table className="table table-dark">
          <thead className="thead-dark">
            <tr>
              <th>id departement</th>
              <th>name of departement</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row">
              <td>id departement</td>
              <td>name of departement</td>
              <td><button className="btn btn-danger">delete</button><button className="btn btn-info">update</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin_get_departements