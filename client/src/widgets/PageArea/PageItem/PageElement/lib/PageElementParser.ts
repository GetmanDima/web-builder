import { parseStyle } from "@entities/Page/lib/lib";
import * as antd from "antd";
import HTMLParser from "html-to-json-parser";
import { ElParam, ElStyle, BasicElement } from "@shared/model/type/front.type";
import { ParsedElement, JsonElement } from "../type";

export class PageElementParser {
  public async parse(element: BasicElement) {
    const json = (await HTMLParser(
      element.template.replace(/\s/g, " ").trim()
    )) as JsonElement;

    const attributes = Object.keys(json.attributes ?? {}).reduce(
      (res, attrName) => {
        const clearAttrName = attrName.replace("bind-", "");

        return {
          ...res,
          [clearAttrName]: json.attributes[attrName]
        }
      },
      {}
    );

    return this.formatJson(element, {...json, attributes});
  }

  private formatJson(element: BasicElement, json: JsonElement): ParsedElement {
    let elementType: any = json.type;
    const antdMatches = elementType.match(/antd\.(.*)/);

    if (antdMatches && antdMatches.length > 1) {
      elementType = antd;
      const parts = antdMatches[1].split('.') as string[];

      parts.forEach((part) => {
        elementType = elementType[part];
      })
    }

    const props = this.getProps(element, json);
    const children = this.getChildren(element, json);

    return { type: elementType, props, children };
  }

  private getChildren(element: BasicElement, json: JsonElement) {
    return json.content
      ? json.content.map((item) => {
          if (typeof item !== "string") {
            return this.formatJson(element, item);
          }

          const param = this.getParamFromTemplate(item, element);

          if (param) {
            return param.value;
          }

          return item;
        })
      : undefined;
  }

  private getProps(element: BasicElement, json: JsonElement) {
    const props: { [name: string]: any } = {};
    const attributes = json.attributes;

    if (!attributes) {
      return props;
    }

    Object.keys(attributes).forEach((attrName) => {
      const param = this.getParamFromTemplate(attributes[attrName], element);
      const style = this.getStyleValue(attributes[attrName], element);

      if (param) {
        props[attrName] = this.getParamValue(attributes[attrName], param);
      } else if (style) {
        props[attrName] = style;
      } else {
        props[attrName] = undefined;
      }
    });

    return props;
  }

  private getParamFromTemplate(
    paramTemplate: string,
    element: BasicElement
  ): ElParam | undefined {
    let paramRegex = /{{params\.(.*?)}}/;
    let matches = paramTemplate.match(paramRegex);

    if (!element.params || !matches || matches.length < 2) {
      return undefined;
    }

    return element.params[matches[1]];
  }

  private getStyleValue(
    styleTemplate: string,
    element: BasicElement
  ): ElStyle | undefined {
    if (element.style && styleTemplate === "{{style}}") {
      return parseStyle(element.style);
    }

    return undefined;
  }

  private getParamValue(paramTemplate: string, param: ElParam): any {
    if (param.source === "string") {
      return param.value;
    } else if (param.source === "json") {
      return JSON.parse(param.value);
    }

    return undefined;
  }
}
