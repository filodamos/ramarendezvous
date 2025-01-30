import React from 'react'
import styles from './index.module.css'

export function ContentBoxes() {
  return (
    <div className={styles.ContentBoxes}>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        <div className={styles.timelinePoint}></div>
        <div className={styles.timelinePoint}></div>
        <div className={styles.timelinePoint}></div>
      </div>

      <div className={styles.box}>
        <p>Hello User</p>
        <p>Last login: 9/06/2025</p>
      </div>

      <div className={styles.box}>
        <p>Completed Onboarding</p>
        <p>10/06/2025</p>
      </div>

      <div className={styles.box}>
        <p>Profile Updated</p>
        <p>12/06/2025</p>
      </div>
      <div className={styles.news}>
        <div className={styles.tab}></div>
        <div className={styles.tab}></div>
        <div className={styles.tab}></div>
      </div>
    </div>
  )
}

