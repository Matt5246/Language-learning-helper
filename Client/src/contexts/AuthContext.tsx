import * as React from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  signInWithPopup,
  UserCredential,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  DocumentData,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Subtitle, SubtitlesState } from "../features/subtitles/subtitlesSlice";

interface AuthContextType {
  currentUser: User | any;
  signup: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateMyEmail: (email: string) => Promise<void>;
  updateMyPassword: (password: string) => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  getUserData: () => Promise<DocumentData | null>;
  saveSubtitles: (subtitles: SubtitlesState) => Promise<void>;
  loadSubtitles: () => Promise<Subtitle[] | null>;
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  signup: async () => {
    throw new Error("signup function not implemented");
  },
  signin: async () => {
    throw new Error("signin function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
  resetPassword: async () => {
    throw new Error("resetPassword function not implemented");
  },
  updateMyEmail: async () => {
    throw new Error("updateMyEmail function not implemented");
  },
  updateMyPassword: async () => {
    throw new Error("updateMyPassword function not implemented");
  },
  signInWithGoogle: async () => {
    throw new Error("signInWithGoogle function not implemented");
  },
  getUserData: async () => {
    throw new Error("getUserData function not implemented");
  },
  saveSubtitles: async () => {
    throw new Error("saveSubtitles function not implemented");
  },
  loadSubtitles: async () => {
    throw new Error("loadSubtitles function not implemented");
  },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  async function signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function signin(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return await auth.signOut();
  }

  async function resetPassword(email: string) {
    return await sendPasswordResetEmail(auth, email);
  }

  async function updateMyEmail(email: string) {
    if (!currentUser) {
      throw new Error("No current user found");
    }
    return await updateEmail(currentUser, email);
  }

  async function updateMyPassword(password: string) {
    if (!currentUser) {
      throw new Error("No current user found");
    }
    return await updatePassword(currentUser, password);
  }

  async function signInWithGoogle() {
    return await signInWithPopup(auth, googleProvider);
  }

  async function getUserData(): Promise<DocumentData | null> {
    if (!currentUser) {
      return null;
    }

    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  async function saveSubtitles(subtitles: SubtitlesState): Promise<void> {
    if (!currentUser) {
      throw new Error("No current user found");
    }
    console.log("Saving subtitles", subtitles);
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { subtitles });
    } else {
      await updateDoc(docRef, { subtitles });
    }
  }

  async function loadSubtitles(): Promise<Subtitle[] | null> {
    if (!currentUser) {
      throw new Error("No current user found");
    }
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    } else {
      return docSnap.data().subtitles;
    }
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
    updateMyEmail,
    updateMyPassword,
    signInWithGoogle,
    getUserData,
    saveSubtitles,
    loadSubtitles,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
