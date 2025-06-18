import { TextField } from "@mui/material";

const SearchBar = ({ value, onChange }) => (
  <TextField fullWidth label="Поиск..." variant="outlined" value={value} onChange={(e) => onChange(e.target.value)} />
);

export default SearchBar;
