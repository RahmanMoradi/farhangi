// Date Persian
import persian from 'react-date-object/calendars/persian'
import persian_en from 'react-date-object/locales/persian_en'
import { DateObject } from 'react-multi-date-picker'

function useDatePersian() {
  const newDateFunc = (oldDate, format = 'YYYY/MM/DD') => {
    return new DateObject(oldDate).convert(persian, persian_en).format(format)
  }

  return { newDateFunc }
}

export default useDatePersian
