import {
  ADD_ITEM,
  REMOVE_ITEM
} from '../actions/items'

const initialState = {
  onlineList: []
}

export default function reducer(state = initialState, action) {
  let list

  switch (action.type) {
  case ADD_ITEM:
    console.log("data "+action.itemData);
    list = state.onlineList.concat([action.itemData]).sort((a, b) => b.time - a.time)

    return {
      ...state,
      onlineList: list
    }
  case REMOVE_ITEM://TODO: implement this
    list = state.onlineList.slice(0)
    const index = list.map(i => i.id).indexOf(action.id)
    list.splice(index, 1)

    return {
      ...state,
      onlineList: list
    }

  default:
    return state
  }
}
