import { combineReducers, createStore } from "redux"

import { searchReducer } from "./reducers/search-reducer/search.reducer"

export type RootStore = ReturnType<typeof rootStore>

const rootStore = combineReducers({
  search: searchReducer,
})

export const store = createStore(rootStore)
