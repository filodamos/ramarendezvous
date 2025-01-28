import React, { useState } from 'react'
import styles from './index.module.css'


export function ContentBoxes() {
  return (
    <div className={styles.ContentBoxes}>
        <div className={styles.box}>
        <p> Hello user</p>
        <p>Last login:9/06/2025 </p>
        </div>

    </div>
  )
}
