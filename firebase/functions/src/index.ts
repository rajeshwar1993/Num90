import * as functions from 'firebase-functions';
import {
  createGamePlay,
  approveRejectTicketRequest,
  convertLiveGameToHistory
} from './gamePlay';
import { joinGameOrFetchExistingPlayer } from './playerActions';
import { initializeApp } from 'firebase-admin/app';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

export const createGameplayFF = functions.https.onCall(createGamePlay);
export const approveRejectTicketRequestFF = functions.https.onCall(
  approveRejectTicketRequest
);
export const joinGameOrFetchExistingFF = functions.https.onCall(
  joinGameOrFetchExistingPlayer
);
export const convertLiveGameToHistoryFF = functions.https.onCall(
  convertLiveGameToHistory
);
