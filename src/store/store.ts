import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { uiReducer } from './ui/slice';


const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
    ui: uiReducer,
})
const preloadedState = {};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(routerMiddleware),
    preloadedState: preloadedState
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch