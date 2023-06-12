import styles from '../styles/dashboard.module.css'

//simple dashboard mockup

const dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
          <li className={styles.li}>Orders</li>
          <li className={styles.li}>Products</li>
          <li className={styles.li}>Analytics</li>
          <li className={styles.li}>Customers</li>
        </ul>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>Dashboard</p>
          <div className={styles.info}>
            <p>name</p>
            <div className={styles.photo}>
          </div>

          </div>
        </div>
        <div className={styles.productlist}>
          <div className={styles.product}></div>
          <div className={styles.product}></div>
          <div className={styles.product}></div>
          <div className={styles.product}></div>
        </div>
      </div>
    </div>
  )
}

export default dashboard