import { useEffect, useState, Fragment, useContext } from 'react';
import styles from './TopReaders.module.css';
import TopReader from './TopReader';
import ReadBooksContext from '../../store/readBooks-context';
import AuthContext from '../../store/auth-context';

const TopReaders = () => {
  const [topReaders, setTopReaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const { readBooksNum } = useContext(ReadBooksContext);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://bookclub-b44e0-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    )
      .then((response) => response.json())
      .then((data) => {
        const readers = [];
        for (const key in data) {
          const userReadBooks = data[key]?.lists?.read;
          const userReadBooksNum = userReadBooks
            ? Object.keys(userReadBooks).length
            : 0;
          readers.push({
            userEmail: data[key].email,
            userName: data[key].userName,
            readBooks:
              email === data[key].email ? readBooksNum : userReadBooksNum,
          });
        }
        readers.sort(
          (reader1, reader2) => reader2.readBooks - reader1.readBooks,
        );
        const top5Readers = readers.slice(0, 5);
        setTopReaders(top5Readers);
        setLoading(false);
      });
  }, [readBooksNum, email]);

  return (
    <Fragment>
      {topReaders && !loading && (
        <Fragment>
          <div className={styles.container}>
            <div className={styles.text}>
              <span>Top Readers</span>
            </div>
            {topReaders.map((reader, index) => (
              <TopReader
                order={index + 1}
                key={reader.userEmail}
                userName={reader.userName}
                userEmail={reader.userEmail}
                readBooks={reader.readBooks}
                currentUserBooks={readBooksNum}
              ></TopReader>
            ))}
          </div>
        </Fragment>
      )}
      {loading && <div className={styles.container}></div>}
    </Fragment>
  );
};

export default TopReaders;
