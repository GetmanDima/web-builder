import { Fragment, createElement } from "react";
import { ParsedElement } from "../type";
import { BasicElement } from "@shared/model/type/front.type";
import { PageItem } from "../../PageItem";
import { store } from "@app";

export function convertParsedToElement(
  element: BasicElement,
  parsed: ParsedElement,
  selectElement: (element: BasicElement) => void
): any {
  let children = undefined;
  const elements = store.getState().front.elements;

  if (parsed.children) {
    children = parsed.children.map((item, i) => {
      if (typeof item === "object") {
        return convertParsedToElement(element, item, selectElement);
      }
  
      if (item === '{{children}}') {
        const itemChildren = element.children.map((childId) => {
          return (
            <PageItem
              key={childId}
              element={elements[childId]}
              selectElement={selectElement}
            />
          );
        });
  
        return <Fragment key={i}>{itemChildren}</Fragment>;
      }
  
      return <Fragment key={i}>{item}</Fragment>;
    });
  }

  if (children) {
    return createElement(parsed.type, parsed.props, children);
  }

  return createElement(parsed.type, parsed.props);
}
