import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      messages: [],
      contacts: [],

      unreadNotifications: 0,
      notifications: [],

      user: null,
    };
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setNotifications(state, notifications) {
      state.notifications = notifications;
    },

    setUnreadNotifications(state, unreadNotifications) {
      state.unreadNotifications = unreadNotifications;
    },

    appendMessage(state, newMessage) {
      state.messages.push(newMessage);
    },

    prependMessage(state, newMessage) {
      state.messages.unshift(newMessage);
    },

    setMessages(state, newMessages) {
      state.messages = newMessages;
    },

    setContacts(state, newContacts) {
      state.contacts = newContacts;
    },
  },

  getters: {
    getUser(state) {
      return state.user;
    },

    getNotifications(state) {
      return state.notifications;
    },

    getUnreadNotifications(state) {
      return state.unreadNotifications;
    },

    getMessages(state) {
      return state.messages;
    },

    getContacts(state) {
      return state.contacts;
    },
  },
});
