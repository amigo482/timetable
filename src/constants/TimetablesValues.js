const year = new Date().getFullYear();

const groupFields = [
  {
    name: 'Год',
    type: 'select',
    values: [ `${year} - ${year + 1}` , `${year + 1} - ${year + 2}` ],
    item: 'year',
  },
  {
    name: 'Семестр',
    type: 'select',
    values: [ 'Осень', 'Весна' ],
    item: 'semester',
  },
  {
    name: 'Курс',
    type: 'select',
    values: [ 1, 2, 3, 4, 5, 6 ],
    item: 'course',
  },
  {
    name: 'Название группы',
    type: 'text',
    item: 'groupName',
  },
  {
    name: 'Названия подрупп',
    type: 'checkbox',
  },
  {
    name: 'Дата начала занятий',
    type: 'date',
    item: 'start',
  },
  {
    name: 'Дата окончания занятий',
    type: 'date',
    item: 'end',
  },
  {
    name: 'Время',
    type: 'select',
    values: [],
    item: 'time',
  },
  {
    name: 'Направление',
    type: 'select',
    values: [],
    item: 'direction',
  },
];

export const subFields = [
  {
    name: 'Название первой подруппы',
    type: 'text',
    item: 'subgroups',
    index: 0,
  },
  {
    name: 'Название второй подруппы',
    type: 'text',
    item: 'subgroups',
    index: 1,
  },
  {
    name: 'Дата начала занятий',
    type: 'date',
    item: 'start',
  },
  {
    name: 'Дата окончания занятий',
    type: 'date',
    item: 'end',
  },
]


export const dateOptions = {
  labelMonthNext: 'След месяц',
  labelMonthPrev: 'Пред месяц',
  labelMonthSelect: 'Выбор месяца',
  labelYearSelect: 'Выбор года',
  monthsFull: [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ],
  monthsShort: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
  weekdaysFull: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
  weekdaysShort: [ 'Вос', 'Пон', 'Вт', 'Ср', 'Чет', 'Пят', 'Суб' ],
  weekdaysLetter: [ 'Во', 'П', 'Вт', 'С', 'Ч', 'П', 'С' ],
  today: 'Сег',
  clear: 'Очистить',
  close: 'Закр',
  format: 'dd.mm.yyyy'
}

export default groupFields;