import {
  setDirections,
  setLibraries,
  deleteLibrarySuccess,
  selectLibrary,
  updateLibrarySuccess,
  addLibrarySuccess,
} from '../constants/ActionTypes';

const initialState = {
  list: [],
  current: {},
  faculty: '',
};

const deleteItem = (type, id) => {
  return {
    ...type,
    value: type.value.filter(item => {
      return item._id !== id;
    })
  }
}

const updateItem = (array, newValue) => {
  return array.map(item => {
    return {
      ...item,
      value: item.value.map(elem => {
        if (item.type === newValue.type && elem._id === newValue.value._id) {
          return newValue.value;
        }
        return elem;
      })
    }
  })
}

const addItem = (array, newValue) => {
  return array.map(item => {
    if (item.type === newValue.type) {
      return {
        ...item,
        value: [...item.value, newValue.value],
      }
    }
    return item;
  })
}

const libraries = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case setLibraries:
      return {
        ...state,
        list: payload.data,
      }
    case deleteLibrarySuccess:
      const newList = state.list.map(element => {
        return deleteItem(element, payload.id);
      })
      return {
        ...state,
        list: newList,
      }
    case selectLibrary:
      return {
        ...state,
        current: payload.data,
      }
    case updateLibrarySuccess:
      return {
        ...state,
        list: updateItem(state.list, payload),
      }
    case addLibrarySuccess:
      return {
        ...state,
        list: addItem(state.list, payload),
      }
    default:
      return state;
  }
};

export default libraries;
