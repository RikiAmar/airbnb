"use client";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface ICalendarProps {
  value: Range;
  disabledDates?: Date[];//התאריכים שהוזמנו
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<ICalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}//התאריך הנוכחי של היום
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
