import uuid from 'uuid-random';
import {
  setUserA,
  beginRenderA,
  endRenderA,
  beginProfileA,
  endEmptyProfileA,
  addRequestA,
  resetRenderStateA,
  rootReducer,
  setPushApiA,
  setPushTimerA,
  setAddFieldsA,
  setLocationA,
  addTagA, removeTagA, setLimitRequestsA, setPushStoreRequestTimerA, setPushStoreProfileTimerA,
} from './reducer';

import {
  CAFAction,
  CAFState,
  itemsDataProfile, Response,
  UserType,
  Method, ClientAnalyticsFrontendRequest, AddFields,
} from './types';
import { debounce, fetchData } from './utils';

function clientAnalyticsFrontendCore() {
  let state: CAFState = rootReducer();
  const dispatch = (action: CAFAction) => {
    if (state.location !== window?.location?.href) {
      state = rootReducer(state, resetRenderStateA());
      state = rootReducer(state, setLocationA(window?.location?.href));
    }
    state = rootReducer(state, action);
  };

  const sessionId: string = sessionStorage.getItem('clientAnalyticsFrontend_sessionID') ?? uuid();

  sessionStorage.setItem('clientAnalyticsFrontend_sessionID', sessionId);

  const timerPost = debounce((callback) => callback());

  const setLocalStorage = debounce(() => {
    if (!state.profile.items && state.profile.name) {
      dispatch(endEmptyProfileA());
    }

    const { items } = state.profile;
    const itemsData = {} as itemsDataProfile;

    if (items) {
      Object.keys(items).forEach((key) => {
        itemsData[key] = items[key].endRender
          ? ((items[key].endRender ?? 0) - items[key].startRender)
          : null;
      });
    }

    const cafDataInitial = {
      location: state.location,
      user: { ...state.user, sessionId },
      addFields: { ...state.addFields, ...itemsData },
      tags: state.tags,
      name: null,
      type: null,
      method: null,
      requestUri: null,
      status: null,
      time: null,
      requestSize: null,
      responseSize: null,
    };

    if (state.profile.id) {
      cafDataInitial.addFields = { ...cafDataInitial.addFields, 'profile-id': state.profile.id };
      cafDataInitial.tags = [...cafDataInitial.tags, `profile_id: ${state.profile.id}`];
    }

    const profileItem = {
      ...cafDataInitial,
      id: state.profile.id,
      name: state.profile.name,
      type: 'profile',
      time: state.profile.endProfile && state.profile.startProfile
        ? state.profile.endProfile - state.profile.startProfile
        : null,
    } as ClientAnalyticsFrontendRequest;

    const requestArr: ClientAnalyticsFrontendRequest[] = state.requests.map((item) => ({
      ...cafDataInitial,
      ...item,
      id: uuid(),
    }));

    const storageData: string | null = localStorage.getItem('clientAnalyticsFrontend');
    const data: ClientAnalyticsFrontendRequest[] = storageData
      ? [...JSON.parse(storageData), ...requestArr]
      : [...requestArr];
    if (profileItem.name) data.push(profileItem);

    const dataJSON = JSON.stringify(data);

    const postData = () => {
      if (state.push.api) fetchData(state.push.api, dataJSON);
      else console.log(data);
      localStorage.removeItem('clientAnalyticsFrontend');
    };

    if (!!data.length && data.length > state.push.limitRequests) {
      postData();
    } else {
      if (data.length) localStorage.setItem('clientAnalyticsFrontend', dataJSON);
      dispatch(resetRenderStateA());
      timerPost(state.push.pushTimer, postData);
    }
  });
  return {
    get getState() {
      return state;
    },
    setUser(user: UserType | null) {
      if (user !== state.user) {
        dispatch(setUserA(user));
      }
    },
    setLocation(url: string) {
      if (url !== state.location) {
        dispatch(setLocationA(url));
      }
    },

    setAddFields(fields: AddFields) {
      dispatch(setAddFieldsA(fields));
    },

    addTag(tag: string) {
      dispatch(addTagA(tag));
    },
    removeTag(tag: string) {
      dispatch(removeTagA(tag));
    },

    beginProfile(tag: string) {
      if (!state.profile.id || state.profile.name !== tag) {
        setLocalStorage(state.push.pushStoreProfileTimer);
        dispatch(beginProfileA(tag));
      }
    },

    beginRender(tag: string) {
      if ((!state.profile.items || !(tag in state.profile.items)) && !!state.profile.id) {
        setLocalStorage(30000);
        dispatch(beginRenderA(tag));
      }
    },

    endRender(tag: string) {
      const { items } = state.profile;
      if (items && (tag in items) && !items[tag].endRender && !!state.profile.id) {
        dispatch(endRenderA(tag));
        if (!state.profile.id || (!!state.profile.endProfile && !!items)) {
          setLocalStorage(state.push.pushStoreProfileTimer);
        }
      }
    },

    addRequest(response: Response, time: number, method?: Method, requestSize?: number) {
      dispatch(addRequestA(response, time, method, requestSize));
      if (!state.profile.id || (!!state.profile.endProfile && !!state.profile.items)) {
        setLocalStorage(state.push.pushStoreRequestTimer);
      }
    },

    setPushApi(api: string) {
      dispatch(setPushApiA(api));
    },

    setPushTimer(milliseconds: number) {
      dispatch(setPushTimerA(milliseconds));
    },
    setPushStoreRequestTimer(milliseconds: number) {
      dispatch(setPushStoreRequestTimerA(milliseconds));
    },
    setPushStoreProfileTimer(milliseconds: number) {
      dispatch(setPushStoreProfileTimerA(milliseconds));
    },

    setLimitRequests(maxRequests: number) {
      dispatch(setLimitRequestsA(maxRequests));
    },
  };
}
const clientAnalyticsFrontend = clientAnalyticsFrontendCore();

export default clientAnalyticsFrontend;