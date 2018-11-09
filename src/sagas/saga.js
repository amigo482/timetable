import { call, put, takeLatest, fork, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import history from '../history/history';

import {
  addUser,
  setTT,
  setLibraries,
  deleteLibrarySuccess,
  updateLibrarySuccess,
  addLibrarySuccess,
  setTimetables,
  deleteTimetableSuccess,
  updateTimetableSuccess,
  setCurrentModal,
  getTimesSuccess,
  saveCouple,
  addCouple,
} from '../actions/actions';

import { getReqParams, getCoupleData, getCoupleCount } from '../selectors/selectors'

import * as Api from '../api/api';

function* auth() {
  try {
    const user = yield call(Api.getUser);
    yield put(addUser(user));
    history.push('/admin');
  } catch (err) {
    history.push('/login');
    console.log(err);
  }
}

function redirect(action) {
  if (action) {
    history.push(action.payload);
  } else history.push('/');
}

function* login(action) {
  try {
    const data = yield call(Api.login, action.payload);
    localStorage.setItem('token', data);
    const user = yield call(Api.getUser);
    yield put(addUser(user));
    history.push('/admin');
  } catch (err) {
    console.log(err);
  }
}

function* getTimeTable(action) {
  try {
    const data = yield call(Api.getTimeTable, action.payload);
    yield put(setTT(data));
  } catch (err) {
    console.log(err);
  }
}

function* getManagersLibraries(action) {
  try {
    const data = yield call(Api.getAllManagersLibraries, action.payload);
    yield put(setLibraries(data));
  } catch (err) {
    console.log(err);
  }
}

function* getTimetables(action) {
  try {
    const data = yield call(Api.getAllTimetables, action.payload);
    yield put(setTimetables(data));
  } catch (err) {
    console.log(err);
  }
}

function* getAdminsLibraries(action) {
  try {
    const data = yield call(Api.getAllAdminsLibraries, action.payload);
    yield put(setLibraries(data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteLibrary(action) {
  try {
    yield call(Api.deleteLibrary, action.payload);
    yield put(deleteLibrarySuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* updateLibrary(action) {
  try {
    yield call(Api.updateLibrary, action.payload);
    yield put(updateLibrarySuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* addLibrary(action) {
  try {
    let data = yield call(Api.addLibrary, action.payload);
    yield put(addLibrarySuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* addTimetable(action) {
  try {
    yield call(Api.addTimetable, action.payload);
    const data = yield call(Api.getAllTimetables, action.payload.faculty);
    yield put(setTimetables(data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteTimetable(action) {
  try {
    yield call(Api.deleteTimetable, action.payload);
    yield put(deleteTimetableSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}

function* updateTimetable(action) {
  try {
    yield call(Api.updateTimetable, action.payload);
    yield put(updateTimetableSuccess(action.payload));
    yield put(setCurrentModal(''));
  } catch (err) {
    console.log(err);
  }
}

function* getTimesSaga() {
  try {
    const data = yield call(Api.getTimes);
    yield put(getTimesSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* addLessonSaga(action) {
  const req = yield select(getReqParams);
  try {
    yield call(Api.addLesson, action.payload);
    const data = yield call(Api.getTimeTable, req);
    yield put(setTT(data));
  } catch (err) {
    console.log(err);
  }
}

function* updateLessonSaga(action) {
  const req = yield select(getReqParams);
  try {
    yield call(Api.updateLesson, action.payload);
    const data = yield call(Api.getTimeTable, req);
    yield put(setTT(data));
  } catch (err) {
    console.log(err);
  }
}

function* removeLessonSaga(action) {
  const req = yield select(getReqParams);
  try {
    yield call(Api.deleteLesson, action.payload);
    const data = yield call(Api.getTimeTable, req);
    yield put(setTT(data));
  } catch (err) {
    console.log(err);
  }
}

function* saveCoupleSaga() {
  const value = yield select(getCoupleData);
  const count = yield select(getCoupleCount);
  try {
    yield put(addCouple({ id: count, value: [value] }));
    yield put(saveCouple.success());
  } catch (error) {
    yield put(saveCouple.failure());
  }
}

export default function* root() {
  yield fork(auth);
  yield takeLatest(actionTypes.redirect, redirect);
  yield takeLatest(actionTypes.login, login);
  yield takeLatest(saveCouple.REQUEST, saveCoupleSaga);
  yield takeLatest(actionTypes.getTT, getTimeTable);
  yield takeLatest(actionTypes.getAllManagersLibraries, getManagersLibraries);
  yield takeLatest(actionTypes.getAllAdminsLibraries, getAdminsLibraries);
  yield takeLatest(actionTypes.deleteLibraryRequest, deleteLibrary);
  yield takeLatest(actionTypes.updateLibraryRequest, updateLibrary);
  yield takeLatest(actionTypes.addLibraryRequest, addLibrary);
  yield takeLatest(actionTypes.getAllTimetables, getTimetables);
  yield takeLatest(actionTypes.addTimetable, addTimetable);
  yield takeLatest(actionTypes.deleteTimetable, deleteTimetable);
  yield takeLatest(actionTypes.updateTimetable, updateTimetable);
  yield takeLatest(actionTypes.getTimes, getTimesSaga);
  yield takeLatest(actionTypes.addLesson, addLessonSaga);
  yield takeLatest(actionTypes.updateLesson, updateLessonSaga)
  yield takeLatest(actionTypes.deleteLesson, removeLessonSaga);
}