import * as actionTypes from '../constants/ActionTypes';
import { createFormAction } from 'redux-form-saga';

export function addCouple(object) {
  return {
    payload: object,
    type: actionTypes.addСouple,
  };
}

export function changeSubgroup(id, subgroup) {
  return {
    payload: {
      id,
      subgroup,
    },
    type: actionTypes.changeSubgroup,
  };
}

export function addSubCouple(selected, id) {
  return {
    payload: {
      selected,
      id,
    },
    type: actionTypes.addSubCouple,
  };
}

export function deleteCouple(id) {
  return {
    payload: id,
    type: actionTypes.deleteCouple,
  };
}

export function clearCouples() {
  return {
    payload: 'all',
    type: actionTypes.clearCouples,
  };
}

export function changeCourse(number) {
  return {
    payload: number,
    type: actionTypes.changeCourse,
  };
}

export function login(login, pass) {
  return {
    payload: {
      login,
      pass,
    },
    type: actionTypes.login,
  };
}

export function addUser(user) {
  return {
    payload: user,
    type: actionTypes.addUser,
  };
}

export function redirect(url) {
  return {
    payload: url,
    type: actionTypes.redirect,
  };
}


export function getTT(faculty, year, semester, level, course) {
  return {
    payload: {
      faculty,
      year,
      semester,
      level,
      course,
    },
    type: actionTypes.getTT,
  }
}

export function setTT(data) {
  return {
    payload: {
      data
    },
    type: actionTypes.setTT,
  }
}

export function getTimes() {
  return {
    type: actionTypes.getTimes,
  }
}

export function getTimesSuccess(data) {
  return {
    type: actionTypes.getTimesSuccess,
    payload: data,
  }
}

export function setDirections(data) {
  return {
    payload: {
      data,
    },
    type: actionTypes.setDirections,
  }
}

export function getAllManagersLibraries(faculty) {
  return {
    payload: faculty,
    type: actionTypes.getAllManagersLibraries,
  }
}

export function getAllAdminsLibraries(faculty) {
  return {
    payload: faculty,
    type: actionTypes.getAllAdminsLibraries,
  }
}

export function setLibraries(data) {
  return {
    payload: {
      data,
    },
    type: actionTypes.setLibraries,
  }
}

export function selectLibrary(data) {
  return {
    payload: {
      data,
    },
    type: actionTypes.selectLibrary,
  }
}

export function deleteLibraryRequest(type, id) {
  return {
    payload: {
      type,
      id
    },
    type: actionTypes.deleteLibraryRequest,
  }
}

export function deleteLibrarySuccess(data) {
  return {
    payload: data,
    type: actionTypes.deleteLibrarySuccess,
  }
}

export function updateLibraryRequest(data) {
  return {
    payload: data,
    type: actionTypes.updateLibraryRequest,
  }
}

export function updateLibrarySuccess(data) {
  return {
    payload: data,
    type: actionTypes.updateLibrarySuccess,
  }
}

export function addLibraryRequest(data) {
  return {
    payload: data,
    type: actionTypes.addLibraryRequest,
  }
}

export function addLibrarySuccess(data) {
  return {
    payload: data,
    type: actionTypes.addLibrarySuccess,
  }
}

export function getAllTimetables(faculty) {
  return {
    payload: faculty,
    type: actionTypes.getAllTimetables,
  }
}

export function setTimetables(data) {
  return {
    payload: data,
    type: actionTypes.setTimetables,
  }
}

export function addTimetable(data) {
  return {
    payload: data,
    type: actionTypes.addTimetable,
  }
}

export function selectTimetable(data) {
  return {
    payload: data,
    type: actionTypes.selectTimetable,
  }
}

export function deleteTimetable(id) {
  return {
    payload: id,
    type: actionTypes.deleteTimetable,
  }
}

export function updateTimetable(data) {
  return {
    payload: data,
    type: actionTypes.updateTimetable,
  }
}

export function updateTimetableSuccess(data) {
  return {
    payload: data,
    type: actionTypes.updateTimetableSuccess,
  }
}

export function deleteTimetableSuccess(id) {
  return {
    payload: id,
    type: actionTypes.deleteTimetableSuccess,
  }
}

export function setCurrentModal(data) {
  return {
    payload: data,
    type: actionTypes.setCurrentModal,
  }
}

export function addLesson(data) {
  return {
    payload: data,
    type: actionTypes.addLesson,
  }
}

export function updateLesson(data) {
  return {
    payload: data,
    type: actionTypes.updateLesson,
  }
}

export function deleteLesson(data) {
  return {
    payload: data,
    type: actionTypes.deleteLesson,
  }
}

export function addLessonToEdit(data) {
  return {
    payload: data,
    type: actionTypes.addLessonToEdit,
  }
}

export const saveCouple = createFormAction('SAVE_COUPLE');