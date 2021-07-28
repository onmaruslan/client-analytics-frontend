import { CAFState, Response, UserType, AddFields } from './types';
declare const clientAnalyticsFrontend: {
    readonly getState: CAFState;
    setUser(user: UserType | null): void;
    setLocation(url: string): void;
    setAddFields(fields: AddFields): void;
    addTag(tag: string): void;
    removeTag(tag: string): void;
    beginProfile(tag: string): void;
    beginRender(tag: string): void;
    endRender(tag: string): void;
    addRequest(response: Response, time: number, method?: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "link" | "LINK" | "unlink" | "UNLINK" | undefined, requestSize?: number | undefined): void;
    setPushApi(api: string): void;
    setPushTimer(milliseconds: number): void;
    setPushStoreRequestTimer(milliseconds: number): void;
    setPushStoreProfileTimer(milliseconds: number): void;
    setLimitRequests(maxRequests: number): void;
};
export default clientAnalyticsFrontend;
