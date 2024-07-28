import { storage } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export async function getPublicFiles() {
  const listRef = ref(storage, 'files/public');
  const res = await listAll(listRef);

  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        name: itemRef.name,
        url: url,
      };
    }),
  );

  return files;
}
