import React, { useEffect, useState } from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import adminStyle from "./css/createUser.module.css"
import axios from "axios";

const Admin_get_users = () => {
  const [users, setUsers] = useState([])
  const [emailUser, setEmailUser] = useState('')
  const [departementUser, setDepartementUser] = useState('')

  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    setEmailUser(currentUser.data.currentUser.email)
    setDepartementUser(currentUser.data.currentUser.departementId)
  }


  const getAllUSers = async() => {
    try {
      const response = await axios.get('/api/users/getAllUsers')
      setUsers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getAllUSers()
    getMeCurrentUser()
  })


  const deleteUser =async (id) => {
    try {
      const uri = '/api/users/delete/'+id
      axios.delete(uri)
        .then(()=>{
          console.log("user deleted successfully")
        })
    } catch (error) {
        console.log(error)
    }
  }
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav email={emailUser} departement={departementUser}/>
      </div>
      <div className={adminStyle.rightSection}>
      <table className="table table-dark">
          <thead className="thead-dark">
            <tr>
              <th>full name</th>
              <th>email</th>
              <th>departement</th>
              <th>role</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
            
              return(
               
                <tr scope="row">
                  <td>{user.name} {user.surname}</td>
                  <td>{user.email}</td>
                  <th>{user.departementId}</th>
                  <th>{user.authorization}</th>
                  <td>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">delete</button>
                    <button  className="btn btn-info">update</button>
                  </td>
                </tr>
             
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin_get_users