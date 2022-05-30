import React from "react";
import { TextField } from "@material-ui/core";
import moment from "moment";

export const printDateValue = (filterValue) => {
  if (filterValue) {
    const milliseconds = filterValue * 1000;
    const dateObject = new Date(milliseconds);

    return moment(dateObject).format("DD/MM/YYYY");
  }
  return "";
};

export const DateRangeFieldComponent = ({ headerGroups }) => {
  const { setFilter, filterValue = [] } = headerGroups[0].headers[3];

  return (
    <>
      <TextField
        type="date"
        className="DateRangeField DateRangeFieldMin"
        helperText="From"
        defaultValue={new Date(printDateValue(filterValue[0]))}
        onChange={(e) => {
          const val = e.target.value;
          const parsedValue = Date.parse(val);
          const newDate = new Date(parsedValue);
          newDate.setHours(24, 0, 1);
          const timeStamp = Date.parse(newDate);
          setFilter((old = []) => [
            val ? parseInt(timeStamp / 1000, 10) : undefined,
            old[1]
          ]);
        }}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
      <TextField
        type="date"
        className="DateRangeField DateRangeFieldMax"
        helperText="To"
        defaultValue={new Date(printDateValue(filterValue[1]))}
        onChange={(e) => {
          const val = e.target.value;
          const parsedValue = Date.parse(val);
          const newDate = new Date(parsedValue);
          newDate.setHours(47, 59, 59);
          console.log({ newDate });
          const timeStamp = Date.parse(newDate);
          setFilter((old = []) => [
            old[0],
            val ? parseInt(timeStamp / 1000, 10) : undefined
          ]);
        }}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
    </>
  );
};

export default DateRangeFieldComponent;
