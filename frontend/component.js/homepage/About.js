import React from "react";
import Card from "./Card";
import styles from "./home.module.css"

class About extends React.Component {

  content1 = "we provide the best supply system to your company"
  content2 = "stock system is pretty easy to work with"
  content3 = "users are handled by the admin, you can at any time create, update or delete a user at any departement"

  render() {
    return( 
      <div className={styles.about_section} id="about">
          <div className={styles.about_section_title}>
            About Us
          </div>
          <div className={styles.about_section_cards}>
            <Card title="achat process" img="" content={this.content1} />
            <Card title="stock process" img="" content={this.content2}/>
            <Card title="user system" img="" content={this.content3}/>
          </div>
      </div>
    )
  }
}

export default About

