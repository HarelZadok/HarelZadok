import { FileType } from '@/types/file';
import { storage, auth } from './firebaseConfig';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export async function getPublicFiles() {
  const listRef = ref(storage, 'files/public');
  const res = await listAll(listRef);

  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);

      return <FileType>{
        name: itemRef.name,
        url: url,
      };
    }),
  );

  return files;
}

export function isUserLoggedIn() {
  return auth.currentUser !== null;
}

export function getLoggedUser() {
  return auth.currentUser;
}

export async function logoutUser() {
  return auth.signOut();
}

export async function loginUser(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error as FirebaseError;
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredentials) {
      updateProfile(userCredentials.user, {
        displayName: email,
      });
    }
    return userCredentials;
  } catch (error) {
    throw error as FirebaseError;
  }
}

export function onUserStateChanged(callback: (isUserLoggedIn: boolean, user: User | null) => void) {
  return onAuthStateChanged(auth, () => {
    callback(isUserLoggedIn(), auth.currentUser);
  });
}

export async function updateUserProfile({ displayName, email }: { displayName?: string; email?: string }) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently signed in.');
  }

  const updates = [];
  
  if (displayName !== undefined && user.displayName !== displayName) {
    updates.push(updateProfile(user, { displayName }));
  }
  
  if (email !== undefined && user.email !== email) {
    updates.push(updateEmail(user, email));
  }
  
  await Promise.all(updates);
}