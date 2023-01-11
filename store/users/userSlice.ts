import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
    branchId: number;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
}

interface UsersState {
    user_list: User[];
}

const initialState: UsersState = {
    user_list: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<User[]>) => {
      state.user_list = action.payload;
    },
  },
});

export const { setUserList } = usersSlice.actions;

export const getUsers = (state: RootState) => state.user_list;

export default usersSlice.reducer;