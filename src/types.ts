export interface AddFields {
  [key: string]: any
}

export interface UserType {
  userKeycloakId: string | null;
  fullName: string | null;
}

export interface Push {
  api: string | null;
  limitRequests: number;
  pushTimer: number;
  pushStoreRequestTimer: number;
  pushStoreProfileTimer: number;
}

export interface CAFState {
  user: UserType;
  location: string;
  push: Push;
  tags: string[];
  addFields: AddFields;
  profile: Profile;
  requests: ServicesRequest[];
}

export type ItemsProfile = {
  [key: string]: { startRender: number, endRender: number | null }
};

export type itemsDataProfile = {
  [key: string]: number | null;
};

export interface Profile {
  name: string | null;
  id: string | null;
  startProfile: number | null;
  endProfile: number | null;
  items: ItemsProfile | null;
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

export type Response = {
  status: number;
  url?: any;
  headers: {
    get: any
  }
  data?: Record<string, unknown>;
  json?: any;
  text?: () => Promise<string>;
  config?: {
    url?: any,
    method?: any,
    data?: any;
  };
};

export interface ServicesRequest {
  method: Method;
  requestUri: string;
  status: number;
  time: number;
  responseSize: number;
  requestSize?: number | null;
  type: requestType
}

export type requestType = 'request' | 'profile';
export interface UserTypeRequest extends UserType {
  sessionId: string
}
export interface ClientAnalyticsFrontendRequest {
  id: string,
  name: string | null,
  type: requestType,
  method: Method | null,
  requestUri: string | null,
  status: number | null,
  time: number | null,
  requestSize: number | null,
  responseSize: number | null,
  tags: string[],
  addFields: AddFields,
  location: string,
  user: UserTypeRequest
}

// --- Start Actions ---
export enum CAFActionTypes {
  __INIT__ = '__INIT__',
  SET_USER = 'SET_USER',
  SET_LOCATION = 'SET_LOCATION',
  SET_ADD_FIELDS = 'SET_ADD_FIELDS',
  ADD_TAG = 'ADD_TAG',
  REMOVE_TAG = 'REMOVE_TAG',
  BEGIN_PROFILE = 'BEGIN_PROFILE',
  END_EMPTY_PROFILE = 'END_EMPTY_PROFILE',
  BEGIN_RENDER = 'BEGIN_RENDER',
  END_RENDER = 'END_RENDER',
  RESET_RENDER_STATE = 'RESET_RENDER_STATE',
  ADD_REQUEST = 'ADD_REQUEST',
  SET_PUSH_API = 'SET_PUSH_API',
  SET_PUSH_TIMER = 'SET_PUSH_TIMER',
  SET_PUSH_STORE_REQUEST_TIMER = 'SET_PUSH_STORE_REQUEST_TIMER',
  SET_PUSH_STORE_PROFILE_TIMER = 'SET_PUSH_STORE_PROFILE_TIMER',
  SET_LIMIT_REQUESTS = 'SET_LIMIT_REQUESTS',
}

interface initAction {
  type: CAFActionTypes.__INIT__;
}
interface setUserAction {
  type: CAFActionTypes.SET_USER;
  payload: UserType | null;
}

interface setLocationAction {
  type: CAFActionTypes.SET_LOCATION;
  payload: string;
}
interface setAddFieldsAction {
  type: CAFActionTypes.SET_ADD_FIELDS;
  payload: AddFields;
}
interface addTagAction {
  type: CAFActionTypes.ADD_TAG;
  payload: string;
}
interface removeTagAction {
  type: CAFActionTypes.REMOVE_TAG;
  payload: string;
}

interface beginProfileAction {
  type: CAFActionTypes.BEGIN_PROFILE;
  payload: string;
}

interface endEmptyProfileAction {
  type: CAFActionTypes.END_EMPTY_PROFILE;
}
interface beginRenderAction {
  type: CAFActionTypes.BEGIN_RENDER;
  payload: string;
}
interface endRenderAction {
  type: CAFActionTypes.END_RENDER;
  payload: string;
}

interface resetRenderStateAction {
  type: CAFActionTypes.RESET_RENDER_STATE;
}

interface addRequestAction {
  type: CAFActionTypes.ADD_REQUEST;
  payload: ServicesRequest;
}

interface setPushApiAction {
  type: CAFActionTypes.SET_PUSH_API;
  payload: string;
}

interface setPushTimerAction {
  type: CAFActionTypes.SET_PUSH_TIMER;
  payload: number;
}
interface setPushStoreRequestTimerAction {
  type: CAFActionTypes.SET_PUSH_STORE_REQUEST_TIMER;
  payload: number;
}
interface setPushStoreProfileTimerAction {
  type: CAFActionTypes.SET_PUSH_STORE_PROFILE_TIMER;
  payload: number;
}

interface setLimitRequestsAction {
  type: CAFActionTypes.SET_LIMIT_REQUESTS;
  payload: number;
}

export type CAFAction = initAction
| setUserAction
| setLocationAction
| setAddFieldsAction
| addTagAction
| removeTagAction
| beginProfileAction
| endEmptyProfileAction
| beginRenderAction
| endRenderAction
| resetRenderStateAction
| addRequestAction
| setPushApiAction
| setPushTimerAction
| setPushStoreRequestTimerAction
| setPushStoreProfileTimerAction
| setLimitRequestsAction;

// --- End Actions ---