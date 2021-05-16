import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const overlayElement = document.getElementById('overlay');

const Overlay = ({ onClick, children }) => {
  return (
    <Fragment>
      <div className={styles.backdrop} onClick={onClick}></div>
      <div className={styles.modal}>
        <div>{children}</div>
      </div>
    </Fragment>
  );
};

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>{children}</Overlay>,
    overlayElement,
  );
};

export default Modal;
