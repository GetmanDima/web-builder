import { useEffect, useState } from "react";
import {
  BasicElement,
} from "@shared/model/type/front.type";
import { PageElementParser } from "./lib/PageElementParser";
import { convertParsedToElement } from "./lib/convertParsedToElement";
import { ParsedElement } from "./type";

interface PageElementProps {
  element: BasicElement,
  selectElement: (element: BasicElement) => void
}

const pageElementParser = new PageElementParser();

export const PageElement = ({ element, selectElement }: PageElementProps) => {
  const [parsedElement, setParsedElement] = useState<ParsedElement>();
  const [error, setError] = useState('');

  useEffect(() => {
    pageElementParser.parse(element).then((res) => {
      setParsedElement(res);
      setError('');
    }).catch(() => {
      setError('Error. check parameters, styles, events!');
    })
  }, [element]);

  if (!parsedElement) {
    return null;
  }

  if (error) {
    return (
      <h3 className="text-[18px]">{error}</h3>
    )
  }

  return convertParsedToElement(element, parsedElement, selectElement);
};
