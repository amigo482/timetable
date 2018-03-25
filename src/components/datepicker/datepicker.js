import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
moment.locale('ru', {
  weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
  months : 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
})
class Datepicker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.date ? moment(props.date) : moment(),
      }
      this.onChange = this.onChange.bind(this);
    }
    onChange(date) {
      this.setState({
        value: date,
      })
    }
    render() {
      const {value} = this.state;
      return <DatePicker
                selected={value}
                onChange={this.onChange}
                dateFormat="DD.MM.YYYY"
              />;
    }
}

export default Datepicker;
