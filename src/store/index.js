import { createStore } from "vuex";
import { getKey } from "../js/RandomKeys";
import { writeData, subscribeToUpadate, readData } from "../firebase/database";

export default createStore({
  state: {
    roomKey: "",
    userID: "",
    users: { first: false, second: false },
    play: false,
    moves: [],
    win: false,
  },
  actions: {
    startGame({ commit }, key) {
      writeData(`rooms/${key}/play`, true).then(() => {
        writeData(`games/${key}`, { moves: [], win: false });
      });
      commit("setPlay", true);
    },
    connectToRoom({ commit, dispatch }, settings) {
      const userID = getKey();
      commit("setUserID", userID);

      readData(`rooms/${settings.key}`)
        .then((snapshot) => {
          const data = snapshot.val();
          commit("setRoomKey", data.roomKey);

          writeData(`rooms/${settings.key}/users/second`, userID).then(() => {
            commit("setUsers", { first: data.users.first, second: userID });
            settings.cb();
            dispatch("subscribeToStartGame", data.roomKey);
          });
        })
        .catch((err) => {
          console.log("ошибка подключения к комнате");
          console.log(err);
        });
    },
    createRoom({ commit, dispatch }, cb) {
      const userID = getKey();
      const key = getKey();

      writeData(`rooms/${key}`, {
        roomKey: key,
        users: { first: userID, second: false },
        play: false,
      }).then(() => {
        commit("setUserID", userID);
        commit("setRoomKey", key);
        commit("setUsers", { first: userID, second: false });
        dispatch("subscribeToRoomUpdate", key);
        cb(key);
      });
    },
    subscribeToRoomUpdate({ commit, state }, key) {
      subscribeToUpadate(`rooms/${key}/users`, (snapshot) => {
        const data = snapshot.val();
        if (state.users.first == state.userID) {
          if (data.second) commit("setUsers", data);
        } else {
          commit("setUsers", data);
        }
      });
    },
    subscribeToStartGame({ commit }, key) {
      subscribeToUpadate(`rooms/${key}/play`, (snapshot) => {
        commit("setPlay", snapshot.val());
      });
    },
    subscribeToGame({ commit }, key) {
      subscribeToUpadate(`games/${key}/moves`, (snapshot) => {
        commit("setMoves", snapshot.val() ? snapshot.val() : []);
      });
      subscribeToUpadate(`games/${key}/win`, (snapshot) => {
        commit("setWin", snapshot.val());
      });
    },
    writeNewMove({ state }, move) {
      writeData(`games/${state.roomKey}/moves`, [...state.moves, move]);
    },
    exitFromGame({ dispatch, state }) {
      writeData(
        `games/${state.roomKey}/win`,
        state.users.first == state.userID ? 1 : 0
      ).then(() => {
        dispatch("clearAll");
      });
    },
    clearAll({ commit }) {
      commit("setRoomKey", "");
      commit("setUserID", "");
      commit("setUsers", { first: false, second: false });
      commit("setPlay", false);
      commit("setMoves", []);
    },
  },
  mutations: {
    setRoomKey(state, key) {
      state.roomKey = key;
    },
    setUserID(state, id) {
      state.userID = id;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setPlay(state, value) {
      state.play = value;
    },
    setMoves(state, value) {
      state.moves = value;
    },
    setWin(state, value) {
      state.win = value;
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    userID(state) {
      return state.userID;
    },
    roomKey(state) {
      return state.roomKey;
    },
    play(state) {
      return state.play;
    },
    moves(state) {
      return state.moves;
    },
    win(state) {
      return state.win;
    },
  },
});
