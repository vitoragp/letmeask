import React from "react";

import { auth, firebase } from "../../services/firebase";

import { User } from "../../models/User";

/***
 * AuthContextType
 */

type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

/***
 * Cria o contexto de autenticação.
 */

export const AuthContext = React.createContext({} as AuthContextType);

/***
 * AuthContextProviderProps
 */

type AuthContextProviderProps = {
  children: React.ReactNode;
};

/***
 * AuthContextProvider
 */

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userResponse) => {
      if (userResponse) {
        if (!userResponse.displayName || !userResponse.photoURL) {
          throw new Error("Missing information from google account.");
        }

        setUser({
          id: userResponse.uid,
          name: userResponse.displayName,
          avatar: userResponse.photoURL,
        });
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  /***
   * signWithGoogle
   */

  async function signWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (!response.user.displayName || !response.user.photoURL) {
      throw new Error("Missing information from google account.");
    }

    setUser({
      id: response.user.uid,
      name: response.user.displayName,
      avatar: response.user.photoURL,
    });
  }

  /***
   * signOut
   */

  async function signOut() {
    await auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, signWithGoogle, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
