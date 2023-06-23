export interface ElEvents {
  [eventName: string]: ElEvent
}

export interface ElEvent {
  name: string,
  params?: ElEventParams,
  actions: ElAction[]
}

export interface ElEventParams {
  [name: string]: any
}

export interface TargetEventParams extends ElEventParams {
  target: {
    type: string,
    id: string
  }
}

export interface ElAction {
  id: number,
  type: string,
  order: number,
  value: any
}

export interface RequestAction extends ElAction {
  value: {
    requestName: string;
    paramMatches: {
      [param: string]: {
        source: string;
        value: string;
      };
    };
    responseMatches: {
      [responseVar: string]: string;
    };
    successStates: { stateVar: string; source: string; value: string }[];
    errorStates: { stateVar: string; source: string; value: string }[];
  }
}

export interface StateAction extends ElAction {
  value: {
    state: {
      stateId: string,
      value: any
    }
  }
}