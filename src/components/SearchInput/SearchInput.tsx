import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput = ({ term, change }: any) => (
  <>
    <input
      type="text"
      className="input"
      name="search"
      value={term}
      onChange={change}
      placeholder="Search title"
      autoComplete="off"
      id="term"
    />
    <FontAwesomeIcon icon={faSearch} className="append-icon" />
  </>
);

export default SearchInput;
