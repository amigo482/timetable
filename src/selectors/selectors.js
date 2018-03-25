import { createSelector } from 'reselect';

export const getReqParams = state => state.timetable.requestParams;

const getCoupleValue = state => {
  const form = state.form.elector;
  return form ? form.values : null;
}

export const getCoupleCount = state => {
  return state.timetable.couples.length;
}

const getCellValues = state => {
  return state.timetable.selectedCouple;
}

export const getCoupleData = createSelector(
  [getCoupleValue],
  (couple) => {
    if (couple) {
      const newCouple = {...couple};
      if (couple.auditory) {
        newCouple.auditory = couple.auditory.label;
      }
      if (couple.subject) {
        newCouple.subject = couple.subject.label;
      }
      if (couple.teacher) {
        newCouple.teacher = couple.teacher.label;
      }
      if (couple.plus_minus === undefined) {
        newCouple.plus_minus = false;
      } else {
        if (couple.plus_minus === false) {
          newCouple.plus_minus = '+';
        } else {
          newCouple.plus_minus = '-';
        }
      }
      return newCouple;
    }
    return null;
  }
);

export const getCellData = createSelector(
  [getCellValues],
  (cell) => {
    if (cell) {
      const newCell = {...cell};
      if (cell.auditory) {
        delete newCell.auditory;
        newCell.auditory =  {
          label: `${cell.auditory.name} корпус: ${cell.auditory.housing}`,
          capacity: cell.auditory.capacity,
          computer: cell.auditory.computer,
          projector: cell.auditory.projector
        }
      }
      if (cell.subgroup === 0) {
        newCell.subgroup = 'all';
      } else if (cell.subgroup === 1) {
        newCell.subgroup = '1';
      } else {
        newCell.subgroup = '2';
      }
      if (cell.plus_minus === '+') {
        newCell.plus_minus = false;
      } else if (cell.plus_minus === '-') {
        newCell.plus_minus = true;
      } else {
        delete newCell.plus_minus;
      }
      if (cell.teacher) {
        delete newCell.teacher;
        newCell.teacher = {
          label: cell.teacher.fio,
        };
      }
      if (cell.subject) {
        delete newCell.subject;
        newCell.subject = {
          label: cell.subject.name,
        };
      }
      return newCell;
    }
    return null;
  }
);

export const hasCellPlusMinus = createSelector(
  [getCellValues],
  (cell) => {
    if (cell) {
      if (cell.plus_minus === '+' || cell.plus_minus === '-') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
);