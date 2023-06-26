import { FrontConfig } from 'src/shared/type/front.type';
import { BaseParser } from './BaseParser';
import { ComponentParser } from './ComponentParser';
import { PageParser } from './PageParser';
import { GlobalStateParser } from './GlobalStateParser';

export class FrontParser extends BaseParser {
  private pageParser: PageParser;
  private cdParser: ComponentParser;
  private globalStateParser: GlobalStateParser;

  constructor(config: FrontConfig) {
    super(config);
    this.pageParser = new PageParser(config);
    this.cdParser = new ComponentParser(config);
    this.globalStateParser = new GlobalStateParser(config);
  }

  parse(): string {
    const componentsCode = this.cdParser.parse();
    const globalStateCode = this.globalStateParser.parse();

    return `
      import * as ReactRouterDOM from "react-router-dom";
      import * as Redux from "@reduxjs/toolkit";
      import * as antd from 'antd';
      import React from 'react';
      import ReactDOM from "react-dom/client";

      (() => {
        const baseUrl = '';
        const serverUrl = 'http://localhost:5000'
        
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