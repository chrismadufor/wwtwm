import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./features/controlsSlice"
import playReducer from "./features/playSlice"

export const store = configureStore({
  reducer: {
    controlsReducer,
    playReducer,
  },
//   devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
