export interface ParsedElement {
  type: string,
  props: any,
  children: any[] | undefined
}

export interface JsonElement {
  type: string;
  attributes: any;
  content: any[] | undefined;
}