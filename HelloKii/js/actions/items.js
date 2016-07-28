import offline from 'react-native-simple-store'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'

export function addItem(itemData) {
  return {
    type: ADD_ITEM,
    itemData: itemData
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id: id
  }
}
