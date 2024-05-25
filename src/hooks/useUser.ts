import { create } from "zustand";

interface UserState {
  userLoggedIn: boolean;
  userId: string;
  logIn: () => void;
  logOut: () => void;
  setUserId: (userId: string) => void;
}

const useUser = create<UserState>((set) => ({
  userLoggedIn: false,
  userId: "",
  logIn: () => set({ userLoggedIn: true }),
  logOut: () => set({ userLoggedIn: false, userId: "" }),
  setUserId: (userId: string) => set({ userId }),
}));

export default useUser;
