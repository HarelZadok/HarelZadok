import { FileType } from '@/types/file';
import { storage, auth } from './firebaseConfig';
import { ref, listAll, getDownloadURL, uploadBytesResumable, getMetadata } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';

export async function getPublicFiles() {
  const listRef = ref(storage, 'files/public');
  const res = await listAll(listRef);

  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);

      return <FileType>{
        name: itemRef.name,
        url: url,
        size: metadata.size,
        timeOfCreation: new Date(metadata.timeCreated),
        metadata: metadata,
      };
    }),
  );

  return files;
}

export async function getPrivateFiles() {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in.');
  }

  const uid = auth.currentUser.uid;

  const listRef = ref(storage, `files/private/${uid}`);
  const res = await listAll(listRef);

  const files = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const metadata = await getMetadata(itemRef);

      return <FileType>{
        name: itemRef.name,
        url: url,
        size: metadata.size,
        timeOfCreation: new Date(metadata.timeCreated),
        metadata: metadata,
      };
    }),
  );

  return files;
}

export function uploadPublicFile(file: File) {
  const uploadRef = ref(storage, `files/public/${file.name}`);
  return uploadBytesResumable(uploadRef, file);
}

export function uploadPrivateFile(file: File) {
  if (!auth.currentUser) {
    throw new Error('No user is currently signed in.');
  }

  const uid = auth.currentUser.uid;

  const uploadRef = ref(storage, `files/private/${uid}/${file.name}`);
  return uploadBytesResumable(uploadRef, file);
}

/**
 * @deprecated
 * Use `useAuth()` hook instead.
 */
export function isUserLoggedIn() {
  return auth.currentUser !== null;
}

/**
 * @deprecated
 * Use `useAuth()` hook instead.
 */
export function getLoggedUser() {
  return auth.currentUser;
}

export function useAuth() {
  const [state, setState] = useState<{ isSignedIn: boolean; user: User | null; checked: boolean }>({
    isSignedIn: false,
    user: null,
    checked: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setState({
        isSignedIn: user !== null,
        user: user,
        checked: true,
      });
    });

    return unsubscribe;
  }, []);

  return { auth, ...state };
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
    callback(auth.currentUser !== null, auth.currentUser);
  });
}

export async function updateUserProfile({
  displayName,
  email,
}: {
  displayName?: string;
  email?: string;
}) {
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

export async function updateUserPassword(newPassword: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently signed in.');
  }

  if (newPassword === undefined || newPassword.length === 0) {
    return;
  }

  try {
    await updatePassword(user, newPassword);
  } catch (error) {
    throw error as FirebaseError;
  }
}
