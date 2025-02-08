import { atom } from "recoil";
import { IParent, IStudent, ITeacher, IUser } from "../_service/user";

type UserType = IParent | IStudent | ITeacher | null;

export const userState = atom<IUser | null>({
    key: 'userState',
    default: null,
});

export const userInfoByTypeState = atom<UserType | null>({
    key: 'userInfoByTypeState',
    default: null,
});

export const accessTokenState = atom<string | null>({
    key: 'accessTokenState',
    default: null,
});
  