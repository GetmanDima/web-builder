import React from 'react';
import { ElEvents } from "./event.type";

export interface FrontConfig {
  globalState: GlobalState;
  elements: { [elementId: number]: BasicElement };
  pages: number[];
}

export interface GlobalState {
  [name: string]: StateVar;
}

export interface BasicElement {
  id: number;
  type: string;
  name: string;
  template: string;
  style?: ElStyle;
  events?: ElEvents;
  params?: ElParams;
  startCode: string;
  finishCode: string;
  wrapperCode: string;
  withChildren: boolean;
  allowedParams: string[];
  allowedEvents: string[];
  children: number[];
  config?: { 
    params?: {
      [key:string]: {
        component: string,
        config?: any
      }
    }
    [key: string]: any 
  };
}

export interface ElParams {
  [name: string]: ElParam;
}

export interface ElParam {
  name: string;
  source: string;
  value: string;
}

export interface StateVar {
  name: string;
  value: string;
}

export interface ElStyle {
  [property: string]: {
    source: string;
    value: string;
  };
}

export interface PageElement extends BasicElement {
  config: { title: string; path: string };
}

export interface LibElement {
  id: number;
  title: string;
  elements: { [elementId: number]: BasicElement };
  img: React.ReactNode;
  elementId: number;
}
