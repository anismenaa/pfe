import React from "react";
import styles from './home.module.css'

class Background extends React.Component{
  render() {
    return(
        <div className={styles.home_background}>
          <div className={styles.backgroud_text}>
            <div className={styles.left_background_text}>
              <h1 className={styles.left_background_text_h1}>Here where you can automate your process</h1>
              <p>welcome to our plateforme, we provide the best practice to automate your process 
                <br/> and get from it the best experience for your business
              </p>
            </div>
            <div className={styles.right_background_text}>
              <button className="btn bg-light text-dark">see more</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Background