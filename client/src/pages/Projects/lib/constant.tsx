import { FrontConfig } from "@shared/model/type/front.type";
import { Project } from "@shared/model/type/project.type";

const testFrontConfig: FrontConfig = {
  globalState: {
    test: {
      name: "test",
      value: "hello",
    },
  },
  elements: {
    1: {
      id: 1,
      type: "element",
      name: "",
      template: '<div>"{{children}}"</div>',
      style: {},
      events: {},
      params: {},
      allowedEvents: [],
      allowedParams: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {return "{{element}}"}`,
      withChildren: true,
      children: [],
      config: {
        title: "Страница тест",
        path: "/"
      },
    },
  },
  pages: [1],
}