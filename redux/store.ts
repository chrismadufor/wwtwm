import { combineReducers, configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./features/controlsSlice";
import playReducer from "./features/playSlice";
import { gameApi } from "./services/playService";
import storage from "reduxjs-toolkit-persist/lib/storage";
import sessionStorage from 'reduxjs-toolkit-persist/lib/storage/session'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig: any = {
  key: "root",
  // storage,
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const reducers: any = combineReducers({
  controlsReducer,
  playReducer,
  [gameApi.reducerPath]: gameApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(gameApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = any;
export type AppDispatch = typeof store.dispatch;
