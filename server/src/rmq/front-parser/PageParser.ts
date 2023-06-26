import { BaseParser } from "./BaseParser";
import { getComponentNameById } from "./lib";

export class PageParser extends BaseParser {
  parse() {
    const pageElements = this.config.pages.map((pageId) => {
      return this.config.elements[pageId];
    });
    const pageElementsCode = pageElements.map((element) => {
      return `<ReactRouterDOM.Route path={baseUrl + "${
        element.config?.path
      }"} exact element={<${getComponentNameById(element.id.toString())} />} key="${element.id}"></ReactRouterDOM.Route>`;
    }).join('\n');

    return `(
      <ReactRouterDOM.BrowserRouter>
        <ReactRouterDOM.Routes>
          ${pageElementsCode}
        </ReactRouterDOM.Routes>
      </ReactRouterDOM.BrowserRouter>
    )`;
  }
}
