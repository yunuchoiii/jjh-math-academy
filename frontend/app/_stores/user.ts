import { atom } from "recoil";
import { IUser } from "../_service/user";

export const userState = atom<IUser | null>({
    key: 'userState',
    default: null,
});


export const accessTokenState = atom<string | null>({
    key: 'accessTokenState',
    default: null,
});
  