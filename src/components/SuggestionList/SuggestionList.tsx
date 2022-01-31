import { REQUEST_STATUS } from "../../interfaces/request-status";
import { IHit } from "../../interfaces/hit";

const SuggestionList = ({ state }: any) => {
  const { status, data, error } = state;

  switch (status) {
    case REQUEST_STATUS.IDLE:
      return <></>;
    case REQUEST_STATUS.PENDING:
      return (
        <div
          className="suggestions suggestions--loading"
          data-testid="suggestions-loading"
        >
          <p>Loading....</p>
        </div>
      );
    case REQUEST_STATUS.REJECTED:
      throw new Error(error);
    case REQUEST_STATUS.RESOLVED:
      return (
        <div data-testid="suggestions">
          {data ? (
            <ul className="suggestions">
              {data.map((item: IHit) => (
                <li key={item.objectID}>
                  <a
                    href={item.url}
                    target="_blank"
                    className="suggestions__item"
                    rel="noreferrer"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item._highlightResult.title.value,
                      }}
                      className="suggestions__title"
                    ></div>
                    <div className="suggestions__meta">
                      {item.points && <span>{item.points} points | </span>}
                      {item.author && <span>{item.author} author | </span>}
                      {item.num_comments && (
                        <span>{item.num_comments} comments</span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      );
    default:
      throw new Error("Something went wrong");
  }
};

export default SuggestionList;
