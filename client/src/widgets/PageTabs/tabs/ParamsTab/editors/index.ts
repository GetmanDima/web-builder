import { TableColumnEditor } from "./TableColumnEditor";
import { TableDataEditor } from './TableDataEditor';
import { MenuEditor } from "./MenuEditor";

export const editors: {[key: string]: (props: any) => JSX.Element} = {
  TableColumnEditor, 
  TableDataEditor,
  MenuEditor
}