import uuid from 'uuid-random';
import {
  CAFAction, CAFActionTypes, CAFState, ItemsProfile, Profile, ServicesRequest,
} from '../types';

const initialProfiler = {
  name: null,
  id: null,
  startProfile: null,
  endProfile: null,
  items: null,
} as Profile;

const initialRequests: ServicesRequest[] = [];
const initialUser = {
  userKeycloakId: null,
  fullName: null,
};

const initialState = {
  user: initialUser,
  location: window?.location?.href ?? '',
  push: {
    api: null,
    limitRequests: 20,
    pushTimer: 10000,
    pushStoreRequestTimer: 500,
    pushStoreProfileTimer: 5000,
  },
  addFields: {},
  tags: [],
  profile: initialProfiler,
  requests: initialRequests,
} as CAFState;

export function rootReducer(
  state: CAFState = initialState,
  action: CAFAction = { type: CAFActionTypes.__INIT__ },
): CAFState {
  const now = Date.now();

  switch (action?.type) {
    case CAFActionTypes.SET_USER:
      return { ...state, user: action.payload ?? initialUser };

    case CAFActionTypes.SET_LOCATION:
      return { ...state, location: action.payload };

    case CAFActionTypes.SET_ADD_FIELDS:
      return { ...state, addFields: { ...state.addFields, ...action.payload } };

    case CAFActionTypes.ADD_TAG:
      if (state.tags.includes(action.payload)) return state;
      return { ...state, tags: [...state.tags, action.payload] };

    case CAFActionTypes.REMOVE_TAG:
      return { ...state, tags: state.tags.filter((item) => item !== action.payload) };

    case CAFActionTypes.BEGIN_PROFILE:
      if (!state.profile.name) {
        return {
          ...state,
          profile: {
            ...state.profile,
            name: action.payload,
            id: uuid(),
            startProfile: now,
          },
        };
      }

      return state;
    case CAFActionTypes.END_EMPTY_PROFILE:
      if (state.profile.name) {
        return {
          ...state,
          profile: {
            ...state.profile,
            endProfile: state.profile.startProfile,
          },
        };
      }

      return state;

    case CAFActionTypes.BEGIN_RENDER:
      if (!state.profile.items || !(action.payload in state.profile.items)) {
        return {
          ...state,
          profile: {
            ...state.profile,
            endProfile: null,
            items: {
              ...state.profile.items,
              [action.payload]: { startRender: now, endRender: null },
            },
          },
        };
      }

      return state;
    case CAFActionTypes.END_RENDER:

      const item = state.profile.items ? {
        ...state.profile.items[action.payload],
        endRender: now,
      } : {};

      const newItems = {
        ...state.profile.items,
        [action.payload]: item,
      } as ItemsProfile;

      return {
        ...state,
        profile: {
          ...state.profile,
          endProfile: !Object.keys(newItems).find((key) => newItems[key].endRender === null)
            ? now
            : null,
          items: newItems,
        },
      };

    case CAFActionTypes.RESET_RENDER_STATE:
      return {
        ...state,
        addFields: {},
        tags: [],
        profile: initialProfiler,
        requests: initialRequests,
      };

    case CAFActionTypes.ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };

    case CAFActionTypes.SET_PUSH_API:
      return {
        ...state,
        push: {
          ...state.push,
          api: action.payload,
        },
      };
    case CAFActionTypes.SET_PUSH_TIMER:
      return {
        ...state,
        push: {
          ...state.push,
          pushTimer: action.payload,
        },
      };
    case CAFActionTypes.SET_PUSH_STORE_REQUEST_TIMER:
      return {
        ...state,
        push: {
          ...state.push,
          pushStoreRequestTimer: action.payload,
        },
      };
    case CAFActionTypes.SET_PUSH_STORE_PROFILE_TIMER:
      return {
        ...state,
        push: {
          ...state.push,
          pushStoreProfileTimer: action.payload,
        },
      };

    case CAFActionTypes.SET_LIMIT_REQUESTS:
      return {
        ...state,
        push: {
          ...state.push,
          limitRequests: action.payload,
        },
      };
    default:
      return state;
  }
}