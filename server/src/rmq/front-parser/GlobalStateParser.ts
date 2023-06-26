import { BaseParser } from "./BaseParser";

export class GlobalStateParser extends BaseParser {
  parse() {
    return `
      const defaultGlobalState = ${this.getStateObjectStr()};

      const store = Redux.createStore(
        Redux.combineReducers({
          default: (state = defaultGlobalState, action) => {
            switch(action.type) {
              ${this.getActions()}
              default:
                return state;
            }
          }
        })
      );

      window.store = store;

      const globalState = store.getState().default;
    `;
  }

  private getStateObjectStr() {
    return '{' + Object.values(this.config.globalState ?? {}).map(
      (stateVar: any) => `${stateVar.name}: ${stateVar.value ? stateVar.value : 'undefined'}`
    ).join(',') + '}';
  }

  private getActions() {
    return Object.values(this.config.globalState ?? {}).map(
      (stateVar: any) =>
        `case "SET_globalState['${stateVar.name}']": return {...state, ${
          stateVar.name
        }: action.data};`
    ).join('\n');
  }
}
