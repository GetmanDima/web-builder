export function getWrapperEventCb(action: () => void, excludedElements: HTMLElement[]) {
  return (e: MouseEvent | React.MouseEvent) => {
    let el: ParentNode | null = e.target as ParentNode;
    const nodes = [];
    nodes.push(el);
  
    while(el) {
        nodes.unshift(el.parentNode);
        el = el.parentNode;
    }
  
    const hasContent = nodes.reduce((res, element) => {
        return res || (element ? excludedElements.includes(element as HTMLElement) : false);
    }, false);
  
    if (!hasContent) {
      action();
    }
  };
};

export function hasErrors(errors: {[key: string]: boolean}) {
  return Object.values(errors).reduce((res, val) => {
    return res || val;
  }, false)
}

// Пример формата: YYYY-MM-DD hh:mm
export function dateToString(date: Date, format: string): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  let dateStr = format;
  dateStr = dateStr.replace('YYYY', date.getFullYear().toString());
  dateStr = dateStr.replace('MM', month);
  dateStr = dateStr.replace('DD', day);
  dateStr = dateStr.replace('hh', hours);
  dateStr = dateStr.replace('mm', minutes);

  return dateStr;
}

export function getCountLabel(count: number, labels: string[]) {
  const strCount = count.toString();
  const lastChar = strCount[strCount.length - 1];

  if (count > 10 && count < 20) {
      return labels[2];
  }

  if (['2', '3', '4'].includes(lastChar)) {
      return labels[1];
  }

  if (lastChar === '1') {
      return labels[0];
  }

  if (['5', '6', '7', '8', '9', '0'].includes(lastChar)) {
      return labels[2];
  }

  return '';
}
