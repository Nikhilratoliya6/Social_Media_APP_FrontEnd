import * as actionTypes from './message.actionType';

const initialState = {
  chats: [],
  loading: false,
  error: null,
  messages: {},
  selectedChat: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Chat related cases
    case actionTypes.GET_ALL_CHATS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.GET_ALL_CHATS_SUCCESS:
      return { ...state, loading: false, chats: action.payload };
    case actionTypes.GET_ALL_CHATS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case actionTypes.CREATE_CHAT_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: [action.payload, ...state.chats]
      };
    case actionTypes.CREATE_CHAT_FAILURE:
      return { ...state, loading: false, error: action.error };

    // Message related cases
    case actionTypes.GET_ALL_MESSAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.GET_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: {
          ...state.messages,
          [action.payload.chatId]: action.payload.messages
        }
      };
    case actionTypes.GET_ALL_MESSAGES_FAILURE:
      return { ...state, loading: false, error: action.error };

    case actionTypes.CREATE_MESSAGE_REQUST:
      return { ...state, loading: true, error: null };
    case actionTypes.CREATE_MESSAGE_SUCCESS:
      const chatId = action.payload.chatId;
      return {
        ...state,
        loading: false,
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), action.payload]
        }
      };
    case actionTypes.CREATE_MESSAGE_FAILURE:
      return { ...state, loading: false, error: action.error };

    case actionTypes.NEW_MESSAGE_RECEIVED:
      const messageChat = action.payload.chatId;
      return {
        ...state,
        messages: {
          ...state.messages,
          [messageChat]: [...(state.messages[messageChat] || []), action.payload]
        }
      };

    case actionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      };

    default:
      return state;
  }
};

export default messageReducer;
