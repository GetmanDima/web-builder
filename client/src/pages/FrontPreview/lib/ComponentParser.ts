import { ElAction, RequestAction } from "@shared/model/type/event.type";
import { BasicElement, FrontConfig } from "@shared/model/type/front.type";
import { BaseParser } from "./BaseParser";
import { ElementParser } from "./ElementParser";
import { getComponentNameById } from "./lib";

export class ComponentParser extends BaseParser {
  private elementParser: ElementParser;
  private projectId: string;

  constructor(config: FrontConfig, projectId: string) {
    super(config);
    this.projectId = projectId;
    this.elementParser = new ElementParser(config);
  }

  parse() {
    const elements = this.config.elements;
    const componentsCode = Object.keys(elements ?? {})
      .map((id) => this.parseComponent(elements[+id], id))
      .join("\n");

    return componentsCode;
  }

  private parseComponent(element: BasicElement, componentId: string) {
    const componentName = getComponentNameById(componentId);
    const elementCode = this.elementParser.parse(element);
    let resCode =
      "{(" +
      element.wrapperCode.replace(/{{element}}/g, `(${elementCode})`) +
      ")()}";
    resCode = resCode.replace(/{{params\.(.*?)}}/, "params['$1']");

    return `const ${componentName} = (props) => {
      const [state, setState] = React.useState(store.getState());
      const globalState = state.default;
      const item = props?.item;

      React.useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          setState(store.getState());
        });
    
        return () => unsubscribe();
      }, [setState]);

      React.useEffect(() => {
        ${element.startCode}

        return () => {
          ${element.finishCode}
        }
      }, [])

      const params = {};
      const vars = {};
      const modifiedProps = props;

      ${this.getParamsCode(element)}
      ${this.getEventsCode(element)}

      return (
        <>
          ${resCode}
        </>
      );
    }`;
  }

  private getParamsCode(element: BasicElement) {
    return Object.values(element.params ?? {})
      .map((param) => {
        let paramValue = this.parseSourceValue({
          source: param.source,
          value: param.value,
        });

        return `params["${param.name}"] = ${paramValue};`;
      })
      .join("\n");
  }

  private getEventsCode(element: BasicElement) {
    const eventsCode = Object.values(element.events ?? {})
      .map((event) => {
        return `\nfunction ${event.name}(eventValue) { 
          ${this.getActionsCode(event.actions)}
        }`;
      })
      .join("\n");

    return eventsCode;
  }

  private getActionsCode(actions: ElAction[]) {
    return actions
      .map((action) => {
        if (action.type === "setState") {
          return `store.dispatch({type: "SET_${
            action.value.name
          }", data: ${this.parseSourceValue({
            source: action.value.source,
            value: action.value.newValue,
          })}})`;
        }

        if (action.type === "serverRequest") {
          return this.getRequestActionCode(action);
        }

        return "";
      })
      .join("\n");
  }

  private getRequestActionCode(action: RequestAction) {
    const value = action.value;

    const dataObj = Object.keys(value.paramMatches ?? {}).reduce(
      (res, paramName) => {
        return {
          ...res,
          [paramName]: this.parseSourceValue(value.paramMatches[paramName]),
        };
      },
      {}
    ) as { [key: string]: string };

    const dataStr = Object.keys(dataObj).reduce((res, paramName) => {
      return (
        res +
        `
        ${paramName}: ${dataObj[paramName]},
      `
      );
    }, "");

    const body = `
      {
        "requestName": "${value.requestName}",
        "data": {
          ${dataStr}
        }
      }
    `;

    const responseCode = Object.keys(value.responseMatches ?? {})
      .map((responseVar) => {
        return `store.dispatch({type: "SET_${value.responseMatches[responseVar]}", data: data['${responseVar}']});
      `;
      })
      .join("\n");

    const successCode = value.successStates
      .map((state) => {
        const data = this.parseSourceValue({
          source: state.source,
          value: state.value,
        });

        return `store.dispatch({type: "SET_${state.stateVar}", data: ${
          data ? data : "undefined"
        }});
      `;
      })
      .join("\n");

    console.debug("rm", body);
    return `
      fetch("http://localhost:5000/projects/${this.projectId}/api", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(${body})
      }).then((res) => res.json()).then((data) => {
        console.debug(data);
        ${responseCode}
        ${successCode}
      })
    `;
  }

  private parseSourceValue(sourceValue: { source: string; value: string }) {
    if (sourceValue.source === "string") {
      return `"${sourceValue.value}"`;
    }

    return sourceValue.value;
  }
}
