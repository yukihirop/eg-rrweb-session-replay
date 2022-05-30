import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useAsyncDebounce } from "react-table";

export const SearchFieldComponent = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <TextField
      className="SearchField"
      placeholder="Search"
      helperText={`Total records: ${count}`}
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      variant="outlined"
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

export default SearchFieldComponent;
