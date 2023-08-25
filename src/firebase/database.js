import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { app } from "./init";

const database = getDatabase(app);

function writeData(link, data) {
  const reference = ref(database, link);
  return set(reference, data);
}

function readData(link) {
  const reference = ref(database, link);
  return get(reference);
}

function subscribeToUpadate(link, callback) {
  const reference = ref(database, link);
  return onValue(reference, callback);
}

export { writeData, readData, subscribeToUpadate };
