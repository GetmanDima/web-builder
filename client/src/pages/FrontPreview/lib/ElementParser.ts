import {
  BasicElement,
  ElParams,
  ElStyle,
} from "@shared/model/type/front.type";
import { ElEvents } from "@shared/model/type/event.type";
import { getComponentNameById } from "./lib";
import { BaseParser } from "./BaseParser";

export class ElementParser extends BaseParser {
  parse(element: BasicElement) {
    return this.parseTemplate(element);
  }

  private parseTemplate(element: BasicElement) {
    let template = element.template;
    template = template.replace(/bind-(\w*)="([^"]*)"/g, '$1={$2}')
    template = template.replace(
      /{{style}}/,
      this.getStyleObjectStr(element.style ?? {})
    );

    template = this.insertParams(template, element.params ?? {});

    const events = element.events;

    if (events) {
      template = this.insertEvents(template, events);
    }

    template = template.replace('{{children}}', this.getChildrenCode(element.children))

    return template;
  }

  private getChildrenCode(children: number[]) {
    return children.map((childId) => `<${getComponentNameById(childId.toString())} {...modifiedProps}/>`).join('\n');
  }

  private getStyleObjectStr(style: ElStyle) {
    return (
      "{" +
      Object.keys(style).map(
        (property) => `${property}: "${style[property].value}"`
      ) +
      "}"
    );
  }

  private insertParams(template: string, params: ElParams) {
    let resTemplate = template;
    const paramNames = this.getTemplateNames(template, 'params');

    paramNames.forEach((paramName) => {
      const param = params[paramName];
      const regexp = new RegExp(`{{params.${paramName}}}`, 'g');

      if (param) {
        resTemplate = resTemplate.replace(
          regexp,
          `params.${paramName}`
        );
      } else {
        resTemplate = resTemplate.replace(
          regexp,
          `vars.${paramName}`
        );
      }
    });

    return resTemplate;
  }

  private insertEvents(template: string, events: ElEvents) {
    let resTemplate = template;
    const eventNames = this.getTemplateNames(template, 'events');

    eventNames.forEach((eventName) => {
      const event = events[eventName];
      const regexp = new RegExp(`{{events.${eventName}}}`, 'g')

      if (event) {
        resTemplate = resTemplate.replace(
          regexp,
          `${eventName}`
        );
      } else {
        resTemplate = resTemplate.replace(
          regexp,
          'undefined'
        );
      }
    });

    return resTemplate;
  }

  private getTemplateNames(template: string, entity: string) {
    let paramRegex = new RegExp(`{{${entity}\.(.*?)}}`, 'g');
    let eventNames = [];
    let matches;

    while ((matches = paramRegex.exec(template))) {
      eventNames.push(matches[1]);
    }

    return eventNames;
  }
}
