import { FrontConfig } from '@shared/model/type/front.type';
import { BaseParser } from './BaseParser';
import { ComponentParser } from './ComponentParser';
import { PageParser } from './PageParser';
import { GlobalStateParser } from './GlobalStateParser';

export class FrontParser extends BaseParser {
  private pageParser: PageParser;
  private cdParser: ComponentParser;
  private globalStateParser: GlobalStateParser;
  private projectId: string;

  constructor(config: FrontConfig, projectId: string) {
    super(config);
    this.projectId = projectId;
    this.pageParser = new PageParser(config);
    this.cdParser = new ComponentParser(config, projectId);
    this.globalStateParser = new GlobalStateParser(config);
  }

  parse(): string {
    const componentsCode = this.cdParser.parse();
    const globalStateCode = this.globalStateParser.parse();

    return `
      (() => {
        const baseUrl = '/projects/${this.projectId}/preview/';
        
        ${globalStateCode}
        ${componentsCode}
        const domContainer = document.querySelector('#app');
        const root = ReactDOM.createRoot(domContainer);
        const Component = () => {
          return ${this.pageParser.parse()}
        }
        root.render(<Component />);
      })();
    `
  }
}