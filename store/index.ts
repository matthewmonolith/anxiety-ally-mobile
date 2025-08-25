import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./features/auth/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "./features/auth/authSlice";

const listener = createListenerMiddleware()

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

listener.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, api) => {
    await AsyncStorage.setItem('token', action.payload.token)
    api.dispatch(setToken(action.payload.token))
    api.dispatch(authApi.util.invalidateTags(['Auth']))
  },
})

setupListeners(store.dispatch);

export { authApi };

export {
  useFetchUserQuery,
  useLogoutUserMutation,
} from "./features/auth/authApi";
