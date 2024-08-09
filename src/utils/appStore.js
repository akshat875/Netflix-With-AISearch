import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Specify ignored actions or paths if necessary
        ignoredActions: [], // Add action types with non-serializable data if needed
        ignoredPaths: [],   // Add paths in state with non-serializable data if needed
      },
    }),
});

export default appStore;
