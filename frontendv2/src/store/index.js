import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import donation from "./slices/donation";
import event from "./slices/event";

export const store = configureStore({
    reducer: {
        user,
        donation,
        event
    }
})
