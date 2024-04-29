import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import donation from "./slices/donation";

export const store = configureStore({
    reducer: {
        user,
        donation
    }
})
