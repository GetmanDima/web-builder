export const defaultFrontConfig = {
  globalState: {},
  elements: {
    '1': {
      id: 1,
      type: 'element',
      name: '',
      template: '<div>{{children}}</div>',
      style: {},
      events: {},
      params: {},
      allowedEvents: [],
      allowedParams: [],
      startCode: '',
      finishCode: '',
      wrapperCode: '() => {return {{element}}}',
      withChildren: true,
      children: [],
      config: { title: 'index', path: '/' },
    },
  },
  pages: [1],
};

export const defaultDbConfig = {
  tables: []
};

export const defaultApiConfig = {
  requests: []
};

