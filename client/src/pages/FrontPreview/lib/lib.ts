import { FrontParser } from "./FrontParser";

export function getComponentNameById(componentId: string) {
  return `Component${componentId}`
}

export function addAppScripts(config: any, projectId: string) {
  const oldScript = document.querySelector('script[data-target="app"]');
  if (oldScript) {
    return;
  }

  const parser = new FrontParser(config, projectId);

  const appScript = document.createElement('script');
  console.debug(parser.parse());
  appScript.text = parser.parse();
  appScript.setAttribute('type', 'text/babel');
  appScript.setAttribute('data-type', 'module');
  appScript.setAttribute('data-target', 'app');
  appScript.setAttribute('async', '');

  const babelScript = document.createElement('script');
  babelScript.setAttribute('src', 'https://unpkg.com/@babel/standalone/babel.min.js');
  babelScript.setAttribute('async', '');

  document.body.appendChild(appScript);
  document.body.appendChild(babelScript);

  appScript.onload = () => {
    window.dispatchEvent(new Event('DOMContentLoaded'));
  }
  babelScript.onload = () => {
    window.dispatchEvent(new Event('DOMContentLoaded'));
  }
}
