import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const connectDb = await openDB('jate', 1);
  const txt = connectDb.transaction('jate', 'readwrite');
  const obStore = txt.objectStore('jate');
  const request = obStore.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
  result
    ? console.log('content saved to the database', result.value)
    : console.error('putDb not implemented');
    return result?.value;
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const connectDb = await openDB('jate', 1);
  const txt = connectDb.transaction('jate', 'readonly');
  const obStore = txt.objectStore('jate');
  const request = obStore.get(1);
  const result = await request;
  console.log(result);
  result
    ? console.log('content received from database', result.value)
    : console.error('getDb not implemented');
  return result?.value;
};

initdb();
