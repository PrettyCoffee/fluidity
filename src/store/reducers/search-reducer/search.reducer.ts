export interface SearchInterface {
  search: string
}

export const searchInitialState: SearchInterface = {
  search: "",
}

export interface SearchAction {
  type: string
  payload: SearchInterface
}

export const searchReducer = (
  state = searchInitialState,
  action: SearchAction
) => {
  switch (action.type) {
    case "SEARCH_UPDATE": {
      return {
        ...state,
        search: action.payload.search,
      }
    }
    case "DELETE": {
      return state
    }
    case "INPUT": {
      return state
    }
    default:
      return state
  }
}
