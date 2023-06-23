import { PageElement } from "@shared/model/type/front.type"

export const defaultPageElement: PageElement = {
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
    title: "",
    path: ""
  },
}