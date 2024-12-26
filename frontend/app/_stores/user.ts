import { atom } from "recoil";
import { IUser } from "../_service/user";

const userState = atom<IUser | null>({
    key: 'userState',
    default: null,
});

export default userState;