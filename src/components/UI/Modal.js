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

/**
 * @returns an Overlay with a modal window which closes when clicked outside
 */

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>{children}</Overlay>,
    overlayElement,
  );
};

export default Modal;
