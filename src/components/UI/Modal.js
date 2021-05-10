import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const overlayElement = document.getElementById('overlay');

const Overlay = (props) => {
  return (
    <Fragment>
      <div className={styles.backdrop} onClick={props.onClick}></div>
      <div className={styles.modal}>
        <div>{props.children}</div>
      </div>
    </Fragment>
  );
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <Overlay onClick={props.onClose}>{props.children}</Overlay>,
    overlayElement,
  );
};

export default Modal;
