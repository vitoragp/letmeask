import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

/***
 * Configuracao
 */

const configFirebase = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

/***
 * Inicia o serviço
 */

firebase.initializeApp(configFirebase);

/***
 * Exporta interfaces do serviço: auth e database.
 */

const auth = firebase.auth();
const database = firebase.database();

/***
 * Configura emuladores.
 */

// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
  database.useEmulator("http://localhost", 9000);
}

export { firebase, auth, database };
