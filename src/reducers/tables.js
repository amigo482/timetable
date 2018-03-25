import {
setTimetables,
deleteTimetableSuccess,
selectTimetable,
updateTimetableSuccess,
} from '../constants/ActionTypes';

const initialState = {
  list: [],
  currentTimetable: null,
};

const deleteItem = (list, id) => {
  return list.map(element => {
    return {
      ...element,
      tables: element.tables.filter(item => {
        return item._id !== id;
      }),
    }
  });
}

const updateItem = (list, props) => {
  const {id, subgroups, start, end} = props;
  return list.map(element => {
    return {
      ...element,
      tables: element.tables.map(item => {
        return {
          ...item,
          subgroups: item._id === id ? subgroups : item.subgroups,
          start: item._id === id ? start : item.start,
          end: item._id === id ? end : item.end,
        }
      }),
    }
  });
}

const tables = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case setTimetables:
      return {
        ...state,
        list: payload,
      }
    case deleteTimetableSuccess:
      return {
        ...state,
        list: deleteItem(state.list, payload),
      }
    case selectTimetable:
      return {
        ...state,
        currentTimetable: payload,
      }
    case updateTimetableSuccess:
      return {
        ...state,
        list: updateItem(state.list, payload),
      }
    default:
      return state;
  }
};


export default tables;
