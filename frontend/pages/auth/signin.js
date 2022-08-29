import React, {useState} from "react";
import Link from 'next/link'
import { TextField } from "@mui/material"
import styles from "./signin.module.css"
import axios from "axios"
import Router from "next/router"

//import logoImg from "/images/rail_logistic_logo.png"



 const SignInPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const signInSubmit = async (event) => {
      event.preventDefault()
      console.log(email," ", password)
      try {
        const response = await axios.post("https://pfe.dev/api/users/signin", {
          email, password
        })
        const authorization = response.data.authorization

        console.log(authorization)

        if (authorization === 1) {
          Router.push('/users/admin/admin')
        }
        if (authorization === 2) {
          Router.push('/users/achat-director/achatDirector')
        }
        if (authorization === 3) {
          Router.push('/users/director/director')
        }
        if (authorization === 4) {
          Router.push('/users/stock/stock')
        }
        if (authorization === 5) {
          Router.push('/users/employe/employe')
        }
        if (authorization === 6) {
          Router.push('/users/achat/achat')
        }

      } catch (error) {
        console.log(error.response.data.errors)
        setErrors(error.response.data.errors)
      }

    }

    /* const messageAffichage = () => {
      if(errors.length > 0) {
        return(
          <div className="alert alert-danger" role="alert">  
            <ul>
                      
                  {errors.map(err => {
                    return(
                      <li>{err.message}</li>
                    )
                  })}            
              
            </ul>
          </div>
        )
      }
    } */
    return(
      <div className={styles.signin_page}>
        <div className={styles.sigin_title}>
          title
        </div>
        <div className={styles.signin_block}>
          <img src="/images/rail_logistic_logo.png" alt="logo rail" />
          <div className={styles.signin_form}>
            <div className={styles.sign_in_field}>
              <TextField value={email} onChange={e => setEmail(e.target.value)} name="email" fullWidth id="standard-basic" label="Email" variant="filled" type="email" required/>
            </div>
            <div className={styles.sign_in_field}>
              <TextField value={password} onChange={e => setPassword(e.target.value)} name="password" fullWidth id="standard-basic" label="Password" variant="filled" type="password" required/>
            </div>
          </div>
          <div className={styles.signin_buttons}>
              <button  onClick={signInSubmit} type="submit" className="btn btn-dark btn-lg btn-block w-60 justify-content-center">Signin</button>
            <Link href="/">
              <button className="btn btn-secondary btn-lg btn-block w-60 justify-content-center">Block level button</button>
            </Link>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    )
  }

export default SignInPage