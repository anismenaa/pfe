import React from 'react'
import Link from 'next/dist/client/link';
import styles from './leftnav.module.css';


const Item = ({ title, path }) => {
  return(
    <Link href={path}>
      <a className={styles.item}>
        {title}
      </a>
    </Link>
  )
}

export default Item;