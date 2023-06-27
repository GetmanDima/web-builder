import { LibElement } from "@shared/model/type/front.type";
import WidgetsIcon from "@mui/icons-material/Widgets";

const blockElement: LibElement = {
  id: 1,
  title: "Блок",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "empty",
      type: "element",
      allowedEvents: [],
      allowedParams: [],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [2],
      params: {},
      style: {
        width: {
          source: "string",
          value: "200px",
        },
        borderColor: {
          source: "string",
          value: "red",
        },
        borderWidth: {
          source: "string",
          value: "1px",
        },
      },
      events: {
    
      },
    },
    2: {
      id: 2,
      name: "block",
      type: "element",
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      allowedEvents: ["onClick"],
      allowedParams: ["text"],
      params: {},
      template: `<div>hello</div>`,
      withChildren: true,
      children: [],
      style: {},
      events: {},
    },
  },
  elementId: 1,
};

const textElement: LibElement = {
  id: 2,
  title: "Текст",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "block",
      type: "element",
      allowedEvents: [],
      allowedParams: ["text"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <div bind-style="{{style}}">
          {{{params.text}}}
        </div>`,
      withChildren: false,
      children: [],
      params: {
        text: {
          name: "text",
          source: "string",
          value: "текст",
        },
      },
      style: {},
      events: {},
    },
  },
  elementId: 1,
};

const buttonElement: LibElement = {
  id: 3,
  title: "Кнопка",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "button",
      type: "element",
      allowedEvents: ["onClick"],
      allowedParams: ["type", "text"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <antd.Button 
          bind-type="{{params.type}}" 
          bind-style="{{style}}" 
          bind-onClick="{{events.onClick}}"
        >
          {{{params.text}}}
        </antd.Button>`,
      withChildren: false,
      children: [],
      style: {},
      params: {
        text: {
          name: "text",
          source: "string",
          value: "Кнопка",
        },
        type: {
          name: "type",
          source: "string",
          value: "primary",
        },
      },
      events: {
        onClick: {
          name: "onClick",
          actions: [],
        },
      },
    },
  },
  elementId: 1,
};

const inputElement: LibElement = {
  id: 4,
  title: "Текстовое поле",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "input",
      type: "element",
      allowedEvents: ["onChange"],
      allowedParams: ["placeholder", "value"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <antd.Input 
          bind-placeholder="{{params.placeholder}}" 
          bind-value="{{params.value}}" 
          bind-style="{{style}}" 
          bind-onChange="(e) => {
            const eventValue = e.target.value;
            {{events.onChange}}(eventValue)
          }"
        />`,
      withChildren: false,
      children: [],
      style: {},
      params: {
        placeholder: {
          name: "placeholder",
          source: "string",
          value: "",
        },
        value: {
          name: "value",
          source: "string",
          value: "",
        },
      },
      events: {
        onChange: {
          name: "onChange",
          actions: [],
        },
      },
    },
  },
  elementId: 1,
};

const textareaElement: LibElement = {
  id: 5,
  title: "Расширенное текстовое поле",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "textarea",
      type: "element",
      allowedEvents: ["onChange"],
      allowedParams: ["placeholder", "value", "rows"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <antd.Input.TextArea 
          bind-placeholder="{{params.placeholder}}" 
          bind-value="{{params.value}}" 
          bind-rows="{{params.rows}}" 
          bind-style="{{style}}" 
          bind-onChange="(e) => {
            const eventValue = e.target.value;
            {{events.onChange}}(eventValue)
          }"
        />`,
      withChildren: false,
      children: [],
      style: {},
      params: {
        placeholder: {
          name: "placeholder",
          source: "string",
          value: "",
        },
        value: {
          name: "value",
          source: "string",
          value: "",
        },
        rows: {
          name: "rows",
          source: "json",
          value: "10",
        },
      },
      events: {
        onChange: {
          name: "onChange",
          actions: [],
        },
      },
    },
  },
  elementId: 1,
};

const tableElement: LibElement = {
  id: 6,
  title: "Таблица",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "input",
      type: "element",
      allowedParams: [],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {        
        return {{element}}
      }`,
      template: `
        <antd.Table 
          bind-columns="{{params.columns}}" 
          bind-dataSource="{{params.data}}" 
          bind-style="{{style}}" 
        />`,
      withChildren: false,
      children: [],
      style: {},
      params: {
        columns: {
          name: "columns",
          source: "json",
          value:
            '[{"title":"Name","dataIndex":"Name","key":"Name"},{"title":"Age","dataIndex":"Age","key":"Age"},{"title":"Address","dataIndex":"Address","key":"Address"}]',
        },
        data: {
          name: "data",
          source: "json",
          value: '[{"Name":"Иван","Age":"20","Address":"Москва","key":"1"}]',
        },
      },
      config: {
        params: {
          columns: {
            component: "TableColumnEditor",
          },
          data: {
            component: "TableDataEditor",
          },
        },
      },
    },
  },
  elementId: 1,
};

const menuElement: LibElement = {
  id: 7,
  title: "Меню",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "menu",
      type: "element",
      allowedParams: ["items", "theme", "mode"],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}}
      }`,
      template: `
        <antd.Menu 
          bind-items="{{params.items}}" 
          bind-mode="{{params.mode}}"
          bind-theme="{{params.theme}}"
          bind-style="{{style}}"
          onSelect="" 
        />`,
      withChildren: false,
      children: [],
      style: {},
      params: {
        items: {
          name: "items",
          source: "json",
          value:
            '[{"label": "Item1", "key": "Item1"}, {"label": "Item2", "key": "Item2"}]',
        },
        mode: {
          name: "mode",
          source: "string",
          value: "inline",
        },
        theme: {
          name: "theme",
          source: "string",
          value: "light",
        },
      },
      config: {
        params: {
          items: {
            component: "MenuEditor",
          },
        },
      },
    },
  },
  elementId: 1,
};

const rowLayoutElement: LibElement = {
  id: 8,
  title: "Строка (Разметка)",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "rowLayout",
      type: "element",
      allowedParams: [],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}}
      }`,
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [2],
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "20px",
        },
        display: {
          source: "string",
          value: "flex",
        },
        justifyContent: {
          source: "string",
          value: "space-between",
        },
        alignItems: {
          source: "string",
          value: "center",
        },
      },
      params: {},
      config: {},
    },
    2: {
      id: 2,
      name: "colLayout",
      type: "element",
      allowedParams: [],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}}
      }`,
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [3],
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "20px",
        },
        width: {
          source: "string",
          value: "40%",
        },
      },
      params: {},
      config: {},
    },
    3: {
      id: 3,
      name: "block",
      type: "element",
      allowedEvents: [],
      allowedParams: ["text"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <div bind-style="{{style}}">
          {{{params.text}}}
        </div>`,
      withChildren: false,
      children: [],
      params: {
        text: {
          name: "text",
          source: "string",
          value: "текст",
        },
      },
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "10px",
        },
      },
      events: {},
    },
  },
  elementId: 1,
};

const colLayoutElement: LibElement = {
  id: 9,
  title: "Столбец (Разметка)",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "colLayout",
      type: "element",
      allowedParams: [],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}}
      }`,
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [2],
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "20px",
        },
        width: {
          source: "string",
          value: "40%",
        },
      },
      params: {},
      config: {},
    },
    2: {
      id: 2,
      name: "block",
      type: "element",
      allowedEvents: [],
      allowedParams: ["text"],
      startCode: "",
      finishCode: "",
      wrapperCode: "() => {return {{element}}}",
      template: `
        <div bind-style="{{style}}">
          {{{params.text}}}
        </div>`,
      withChildren: false,
      children: [],
      params: {
        text: {
          name: "text",
          source: "string",
          value: "текст",
        },
      },
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "10px",
        },
      },
      events: {},
    },
  },
  elementId: 1,
};

const cycleElement: LibElement = {
  id: 10,
  title: "Цикл",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "colLayout",
      type: "element",
      allowedParams: ["arr"],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{params.arr}}.map((item) => {
          const modifiedProps = {...props, item};
          return ({{element}})
        });
      }`,
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [],
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "20px",
        },
        minHeight: {
          source: "string",
          value: "50px",
        },
      },
      params: {
        arr: {
          name: "arr",
          source: "json",
          value: "[]",
        },
      },
      config: {},
    },
  },
  elementId: 1,
};

const conditionElement: LibElement = {
  id: 11,
  title: "Условие",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "colLayout",
      type: "element",
      allowedParams: ["data"],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{params.data}} ? {{element}} : null;
      }`,
      template: `
        <div bind-style="{{style}}">{{children}}</div>
      `,
      withChildren: true,
      children: [],
      style: {
        border: {
          source: "string",
          value: "1px solid black",
        },
        padding: {
          source: "string",
          value: "20px",
        },
        minHeight: {
          source: "string",
          value: "50px",
        },
      },
      params: {
        data: {
          name: "data",
          source: "json",
          value: "true",
        },
      },
      config: {},
    },
  },
  elementId: 1,
};

const imgElement: LibElement = {
  id: 12,
  title: "Изображение",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "image",
      type: "element",
      allowedParams: ["src"],
      allowedEvents: [],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}};
      }`,
      template: `
        <img bind-style="{{style}}" bind-src="{{src}}" />
      `,
      withChildren: false,
      children: [],
      style: {
        width: {
          source: "string",
          value: "50px",
        },
        height: {
          source: "string",
          value: "50px",
        }
      },
      params: {
        arr: {
          name: "data",
          source: "json",
          value: "true",
        },
      },
      config: {},
    },
  },
  elementId: 1,
};

const selectElement: LibElement = {
  id: 13,
  title: "Выбор",
  img: <WidgetsIcon />,
  elements: {
    1: {
      id: 1,
      name: "select",
      type: "element",
      allowedParams: ["defaultValue", "options"],
      allowedEvents: ["onChange"],
      startCode: "",
      finishCode: "",
      wrapperCode: `() => {       
        return {{element}};
      }`,
      template: `
        <antd.Select 
          bind-defaultValue="{{params.defaultValue}}" 
          bind-options="{{params.options}}"
          bind-style="{{style}}"
          bind-onChange="{{events.onChange}}"
        />
      `,
      withChildren: false,
      children: [],
      style: {

      },
      params: {
        defaultValue: {
          name: "defaultValue",
          source: "string",
          value: "",
        },
        options: {
          name: "options",
          source: "json",
          value: "[]",
        },
      },
      config: {},
    },
  },
  elementId: 1,
};

export const frontLibElements: LibElement[] = [
  blockElement,
  textElement,
  buttonElement,
  inputElement,
  textareaElement,
  tableElement,
  menuElement,
  rowLayoutElement,
  colLayoutElement,
  cycleElement,
  conditionElement,
  imgElement,
  selectElement
];
