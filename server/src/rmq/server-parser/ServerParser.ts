export class ServerParser {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  parse(): string {
    return `
      export const apiConfig: any = ${JSON.stringify(this.config)};
      
      export const dbUrl = 'mongodb://localhost:27017/project-db';
      
      export const port = 5000;
    `
  }
}