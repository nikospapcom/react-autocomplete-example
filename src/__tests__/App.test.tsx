import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";

test("renders input and button", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: /search/i });
  expect(input).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute("disabled");
});

test("type a term, button should not have disabled attribute & suggestions loading must be visible", async () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: /search/i });
  expect(input).toBeInTheDocument();

  userEvent.type(input, "Javascript");

  await waitFor(() => {
    const list = screen.getByTestId("suggestions-loading");
    expect(list).toBeInTheDocument();
  });

  const button = screen.getByRole("button", { name: /search/i });
  expect(button).not.toHaveAttribute("disabled");
});

const server = setupServer(
  rest.get(
    "https://hn.algolia.com/api/v1/search/",
    async (req, res, ctx) => {
      return res(ctx.json({"hits":[{"created_at":"2016-10-11T15:00:38.000Z","title":"Yarn – A new package manager for JavaScript","url":"https://code.facebook.com/posts/1840075619545360","author":"cpojer","points":1714,"story_text":null,"comment_text":null,"num_comments":469,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1476198038,"relevancy_score":7017,"_tags":["story","author_cpojer","story_12684980"],"objectID":"12684980","_highlightResult":{"title":{"value":"Yarn – A new package manager for \u003cem\u003eJavaScript\u003c/em\u003e","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"url":{"value":"https://code.facebook.com/posts/1840075619545360","matchLevel":"none","matchedWords":[]},"author":{"value":"cpojer","matchLevel":"none","matchedWords":[]}}},{"created_at":"2013-11-13T14:38:18.000Z","title":"A spreadsheet in fewer than 30 lines of JavaScript, no library used","url":"http://jsfiddle.net/ondras/hYfN3/","author":"ondras","points":1396,"story_text":"","comment_text":null,"num_comments":260,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1384353498,"relevancy_score":4974,"_tags":["story","author_ondras","story_6725387"],"objectID":"6725387","_highlightResult":{"title":{"value":"A spreadsheet in fewer than 30 lines of \u003cem\u003eJavaScript\u003c/em\u003e, no library used","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"url":{"value":"http://jsfiddle.net/ondras/hYfN3/","matchLevel":"none","matchedWords":[]},"author":{"value":"ondras","matchLevel":"none","matchedWords":[]},"story_text":{"value":"","matchLevel":"none","matchedWords":[]}}},{"created_at":"2012-04-10T22:55:40.000Z","title":"Show HN: Meteor, a realtime JavaScript framework","url":"http://www.meteor.com","author":"geoffschmidt","points":1362,"story_text":"","comment_text":null,"num_comments":332,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1334098540,"relevancy_score":3858,"_tags":["story","author_geoffschmidt","story_3824908","show_hn"],"objectID":"3824908","_highlightResult":{"title":{"value":"Show HN: Meteor, a realtime \u003cem\u003eJavaScript\u003c/em\u003e framework","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"url":{"value":"http://www.meteor.com","matchLevel":"none","matchedWords":[]},"author":{"value":"geoffschmidt","matchLevel":"none","matchedWords":[]},"story_text":{"value":"","matchLevel":"none","matchedWords":[]}}},{"created_at":"2021-05-15T15:15:57.000Z","title":"Modern Javascript: Everything you missed over the last 10 years (2020)","url":"https://turriate.com/articles/modern-javascript-everything-you-missed-over-10-years","author":"EntICOnc","points":1256,"story_text":null,"comment_text":null,"num_comments":728,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1621091757,"_tags":["story","author_EntICOnc","story_27165954"],"objectID":"27165954","_highlightResult":{"title":{"value":"Modern \u003cem\u003eJavascript\u003c/em\u003e: Everything you missed over the last 10 years (2020)","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"url":{"value":"https://turriate.com/articles/modern-\u003cem\u003ejavascript\u003c/em\u003e-everything-you-missed-over-10-years","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"author":{"value":"EntICOnc","matchLevel":"none","matchedWords":[]}}},{"created_at":"2020-04-02T12:29:04.000Z","title":"How to manage HTML DOM with vanilla JavaScript only?","url":"https://htmldom.dev/","author":"velmu","points":1149,"story_text":null,"comment_text":null,"num_comments":514,"story_id":null,"story_title":null,"story_url":null,"parent_id":null,"created_at_i":1585830544,"_tags":["story","author_velmu","story_22758218"],"objectID":"22758218","_highlightResult":{"title":{"value":"How to manage HTML DOM with vanilla \u003cem\u003eJavaScript\u003c/em\u003e only?","matchLevel":"full","fullyHighlighted":false,"matchedWords":["javascript"]},"url":{"value":"https://htmldom.dev/","matchLevel":"none","matchedWords":[]},"author":{"value":"velmu","matchLevel":"none","matchedWords":[]}}}],"nbHits":27923,"page":0,"nbPages":200,"hitsPerPage":5,"exhaustiveNbHits":true,"exhaustiveTypo":true,"query":"javascript","params":"advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026hitsPerPage=5\u0026query=javascript\u0026restrictSearchableAttributes=title","processingTimeMS":9}));
    }
  )
);

beforeAll(() => server.listen())
afterAll(() => server.close())

test("type a term, wait for results and render suggestions list", async () => {
  render(<App />);
  const input = screen.getByRole("textbox", { name: /search/i });
  expect(input).toBeInTheDocument();

  userEvent.type(input, "Javascript");

  await waitFor(() => {
    const list = screen.getByTestId("suggestions");
    expect(list).toBeInTheDocument();
  });

});
