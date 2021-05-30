import React, { useState, useContext } from 'react';
import Modal from '../../UI/Modal';

import styles from './AvatarForm.module.css';
import Button from '../../UI/Button';
import Avatar from './Avatar';
import AvatarContext from '../../../store/avatar-context';

const avatars = [
  'avatar1',
  'avatar2',
  'avatar3',
  'avatar4',
  'avatar5',
  'avatar6',
];

const AvatarForm = ({ onClose }) => {
  const { avatar, changeAvatar } = useContext(AvatarContext);

  const [selectedAvatar, setSelectedAvatar] = useState(avatar);

  const selectAvatarHandler = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const changeAvatarHandler = (event) => {
    event.preventDefault();
    changeAvatar(selectedAvatar);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h1 className={styles.avatarHeading}>Choose Your Avatar</h1>
      <form onSubmit={changeAvatarHandler}>
        <div className={styles.avatars}>
          {avatars.map((avatar) => (
            <Avatar
              key={avatar}
              value={avatar}
              onSelect={selectAvatarHandler}
              selected={selectedAvatar}
            />
          ))}
        </div>
        <div className={styles.action}>
          <Button type="submit" onClick={() => {}} extraClass="button--primary">
            Change
          </Button>
          <Button type="button" onClick={onClose} extraClass="button--medium">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AvatarForm;
