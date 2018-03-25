import {
  addСouple,
  changeSubgroup,
  addSubCouple,
  deleteCouple,
  clearCouples,
  changeCourse,
  getTT,
  setTT,
  setDirections,
  getTimesSuccess,
  addLessonToEdit,
} from '../constants/ActionTypes';

const initialState = {
  table: [],
  directions: [],
  courses: [],
  levels: [],
  couples: [],
  times: [],
  selectedProps: {},
  requestParams: {},
  selectedCouple: {},
};

const changeSub = (couples, id, subgroup) => {
  return couples.map(couple => {
    if (couple.id === Number(id)) {
      return {
        id: couple.id,
        value: [
          {
            teacher: couple.value[0].teacher,
            subject: couple.value[0].subject,
            subgroup: subgroup,
            plus_minus: couple.value[0].plus_minus,
            room: couple.value[0].room,
          }
        ]
      }
    } else return couple;
  })
}

const deleteItem = (array, id) => {
  return array.filter(item => {
    if (item.id === Number(id)) {
      return false;
    } else return true;
  })
}

const addCouple = (couples, id, newCouple) => {
  let newObject = {};
  couples.forEach(couple => {
    if (couple.id === Number(id)) {
      newObject = couple.value[0];
    }
  })
  return couples.map(couple => {
    if (couple.id === Number(newCouple)) {
      return {
        id: couple.id,
        value: [
          couple.value[0],
          newObject,
        ]
      }
    } else return couple;
  })
}

const timetable = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case addСouple:
      return {
        ...state,
        couples: [...state.couples, payload],
      };
    case changeSubgroup:
      return {
        ...state,
        couples: changeSub(state.couples, payload.id, payload.subgroup),
      }
    case deleteCouple:
      return {
        ...state,
        couples: deleteItem(state.couples, payload),
      }
    case addSubCouple:
      return {
        ...state,
        couples: addCouple(state.couples, payload.selected, Number(payload.id)),
      }
    case clearCouples:
      return {
        ...state,
        couples: [],
      }
    case changeCourse:
      return {
        ...state,
        course: payload,
      }
    case getTT:
      return {
        ...state,
        selectedProps: payload,
      }
    case setTT:
      return {
        ...state,
        table: payload.data.timetable,
        directions: payload.data.directions,
        courses: payload.data.courses,
        levels: payload.data.levels,
        requestParams: payload.data.requestParams,
      }
    case setDirections:
      return {
        ...state,
        directions: payload.data,
      }
    case getTimesSuccess:
      return {
        ...state,
        times: payload,
      }
    case addLessonToEdit:
      return {
        ...state,
        selectedCouple: payload,
      }
    default:
      return state;
  }
};

export default timetable;
