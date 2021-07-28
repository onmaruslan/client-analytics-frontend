import {
  CAFAction,
  CAFActionTypes,
  Response,
  UserType,
  Method, AddFields, ServicesRequest,
} from '../types';

export function setUserA(user: UserType | null): CAFAction {
  return { type: CAFActionTypes.SET_USER, payload: user };
}

export function setLocationA(url: string): CAFAction {
  return { type: CAFActionTypes.SET_LOCATION, payload: url };
}

export function setAddFieldsA(additionalData: AddFields): CAFAction {
  return { type: CAFActionTypes.SET_ADD_FIELDS, payload: additionalData };
}

export function addTagA(tag: string): CAFAction {
  return { type: CAFActionTypes.ADD_TAG, payload: tag };
}

export function removeTagA(tag: string): CAFAction {
  return { type: CAFActionTypes.REMOVE_TAG, payload: tag };
}

export function beginProfileA(tag: string): CAFAction {
  return { type: CAFActionTypes.BEGIN_PROFILE, payload: tag };
}

export function endEmptyProfileA(): CAFAction {
  return { type: CAFActionTypes.END_EMPTY_PROFILE };
}

export function beginRenderA(tag: string): CAFAction {
  return { type: CAFActionTypes.BEGIN_RENDER, payload: tag };
}

export function endRenderA(tag: string): CAFAction {
  return { type: CAFActionTypes.END_RENDER, payload: tag };
}

export function resetRenderStateA(): CAFAction {
  return { type: CAFActionTypes.RESET_RENDER_STATE };
}

export function addRequestA(response: Response, time: number, method: Method = 'GET', requestSize?: number): CAFAction {
  const payload = {
    status: response.status,
    time,
    type: 'request',
  } as ServicesRequest;

  if (response.config && response.data) {
    payload.method = response.config.method.toUpperCase();
    payload.requestUri = response.config.url;
    payload.responseSize = JSON.stringify(response.data).length;
    payload.requestSize = response.config.data.length;
  } else {
    payload.method = method;
    payload.requestUri = response.url;
    if (response.text) {
      response.text().then((e) => {
        payload.responseSize = e.length;
      });
    }
    payload.requestSize = requestSize ?? null;
  }

  return { type: CAFActionTypes.ADD_REQUEST, payload };
}

export function setPushApiA(api: string): CAFAction {
  return { type: CAFActionTypes.SET_PUSH_API, payload: api };
}

export function setPushTimerA(milliseconds: number): CAFAction {
  return { type: CAFActionTypes.SET_PUSH_TIMER, payload: milliseconds };
}
export function setPushStoreRequestTimerA(milliseconds: number): CAFAction {
  return { type: CAFActionTypes.SET_PUSH_STORE_REQUEST_TIMER, payload: milliseconds };
}
export function setPushStoreProfileTimerA(milliseconds: number): CAFAction {
  return { type: CAFActionTypes.SET_PUSH_STORE_PROFILE_TIMER, payload: milliseconds };
}

export function setLimitRequestsA(limitRequests: number): CAFAction {
  return { type: CAFActionTypes.SET_LIMIT_REQUESTS, payload: limitRequests };
}