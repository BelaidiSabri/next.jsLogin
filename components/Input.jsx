// i made one input so we can reuse them (registration...) and to style them easily
import styles from "../styles/Login.module.css";

const Input = ({ label, id, onChange, error, ...inputProps }) => {
  return (
    <div className={styles.input_container}>
      <label htmlFor="" className={styles.label}>
        {label}
      </label>
      <div>
        <input {...inputProps} onChange={onChange} className={styles.input} />
        <p className={styles.p}>{error}</p>
      </div>
    </div>
  );
};
export default Input;
