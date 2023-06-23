import { ElStyle, BasicElement } from '@shared/model/type/front.type';

export function parseStyle(style: ElStyle) {
  return Object.keys(style).reduce((res: any, property: string) => {
    res[property] = style[property].value;
    return res;
  }, {})
}

export function getElementsIdMatch(elements: {[elementId: number]: BasicElement}, startId: number): {[key: number]: number} {
  let currentId = startId;

  return Object.values(elements).reduce((res: any, element: BasicElement) => {
    res[element.id] = currentId; 
    currentId++;

    return res;
  }, {});
} 

export function updateElementsIds(elements: {[elementId: number]: BasicElement}, idMatch: {[key: number]: number}): {[elementId: number]: BasicElement} {
  return Object.values(elements).reduce((res: any, element: BasicElement) => {
    const newId = idMatch[element.id];

    res[newId] = {
      ...element,
      id: newId
    }

    res[newId].children = element.children.map((childId) => {
      return idMatch[childId]
    })

    return res;
  }, {});
}