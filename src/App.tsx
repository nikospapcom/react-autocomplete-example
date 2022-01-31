import { useState, useEffect, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { debounce } from "lodash";
import "./App.scss";
import { getRequest } from "./utils/axiosClient";

import { IState } from "./interfaces/state";
import { STATUS_CODE } from "./interfaces/status";
import { REQUEST_STATUS } from "./interfaces/request-status";

import { SearchInput, SuggestionList, ErrorFallback } from "./components";

function App() {
  const [term, setTerm] = useState("");
  const [state, setState] = useState<IState>({
    status: REQUEST_STATUS.IDLE,
    data: [],
    error: null,
  });
  
  const updateQuery = () => {
    if (term.length > 2) {
      fetchData();
    } else {
      setState({ ...state, data: [], status: REQUEST_STATUS.IDLE });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce(updateQuery, 300), [term]);

  const fetchData = async () => {
    setState({ ...state, status: REQUEST_STATUS.PENDING });
    const response = await getRequest(
      `?query=${term}&restrictSearchableAttributes=title&hitsPerPage=5`
    );
    if (response && response.status === STATUS_CODE.OK) {
      setState({
        ...state,
        data: response.data.hits,
        status: REQUEST_STATUS.RESOLVED,
      });
    } else {
      setState({ ...state, status: REQUEST_STATUS.REJECTED, error: "Ooops!" });
    }
  };

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [term, delayedQuery]);

  const handleTermChange = (event: any) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <div className="App-content">
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="term">Search</label>
          <div className="form-group">
            <div className="form-group__inner">
              <SearchInput term={term} change={handleTermChange} />
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <SuggestionList state={state} />
              </ErrorBoundary>
            </div>
            <button type="submit" className="btn" disabled={term.length < 4}>
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
