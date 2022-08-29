import React,{useEffect, useState} from "react";
import styles from "../profile.module.css"
import AdminLeftNav from "../../../component.js/leftNav/AdminLeftNav";
import createUSer from "./css/createUser.module.css"
import axios from 'axios'

const Admin_add_user = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [departement, setDepartement] = useState('')
  const [authorization, setAuthorization] = useState('')

  const [departements, setDepartements] = useState([])

  const [errors, setErrors] = useState([])
  const [userAdded, setUserAdd] = useState('')

  const [emailUser, setEmailUser] = useState('')
  const [departementUser, setDepartementUser] = useState('')

  // we get all the authorizations and the departements
  const getAllDepartements = async() => {
    try {
      const response = await axios.get('/api/departements/')
      console.log(response)
      setDepartements(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMeCurrentUser = async() => {
    const currentUser = await axios.get("https://pfe.dev/api/users/currentUser")
    setEmailUser(currentUser.data.currentUser.email)
    setDepartementUser(currentUser.data.currentUser.departementId)
  }

  useEffect(()=> {
    getAllDepartements()
    getMeCurrentUser()
  }, [])

  const addUserSubmit = async (event)=> {
    event.preventDefault()

    const newUser = {
     departementId: departement,
     authorization: authorization,
     name: name,
     surname: surname,
     email: email,
     password: password
    }

    console.log(newUser)
    try {
      const response = await axios.post('/api/users/signup', newUser)
      setUserAdd('user added successfully')
      setErrors([])
    } catch (error) {
      setErrors(error.response.data.errors)
      setUserAdd('')
    }    
  }

  const messageAffichage = () => {
    if (userAdded != '') {
      return(
        <div class="alert alert-success" role="alert">
          {userAdded}
        </div>
      )
    }
    if (errors.length > 0) {
      return(
        <div class="alert alert-danger" role="alert">
          <ul>
            {errors.map(err => {
              return <li>{err.message}</li>
            })}
          </ul>
        </div>
      )
    }

  }
  return(
    <div className={styles.profile}>
      <div className={styles.leftSection}>
        <AdminLeftNav email={emailUser} departement={departementUser}/>
      </div>
      <div className={createUSer.rightSection}>
        <div className={createUSer.form_area}>
          <div className={createUSer.createUSer_bigTitle}>
            create a new user
          </div>
          <form className={createUSer.createUser_form}>
            <div className={createUSer.personnal_infromation_1}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="name" className={createUSer.input} type="text" name="name" required />
              <input value={surname} onChange={e=>setSurname(e.target.value)} placeholder="surname" className={createUSer.input} type="text" name="surname" required />
            </div>
            <div className={createUSer.personnal_information_2}>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className={createUSer.input} type="email" name="email" required />
              <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" className={createUSer.input} type="password" name="password" required />
            </div>
            <div className={createUSer.personnal_information_3}>
              <select name="departements" placeholder="departement" onChange={e => setDepartement(e.target.value)}>
                <option disabled selected>select the departement</option>
                {departements.map(dep => {
                  return(
                    <option value={dep.id}>{dep.name}</option>
                  )
                })}
              </select>
              <select name="authorization" onChange={e => setAuthorization(e.target.value)}>
                <option disabled selected>select the role</option>
                <option value="1">admin</option>
                <option value="2">achat director</option>
                <option value="3">director</option>
                <option value="4">stock employe</option>
                <option value="5">simple employe</option>
                <option value="6">achat employe</option>
              </select>
            </div>
            <div className={createUSer.add_user_from_button}>
              <button type="reset" className="btn btn-secondary">reset</button>
              <button onClick={addUserSubmit} type="submit" className="btn btn-primary">save</button>
            </div>
          </form>
        </div>
        <div>
          {messageAffichage()}
        </div>
      </div>
    </div>
  )
}

export default Admin_add_user