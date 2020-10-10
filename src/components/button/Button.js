import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      type={type}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
