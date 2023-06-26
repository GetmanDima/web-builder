import { FrontConfig } from "src/shared/type/front.type";

export abstract class BaseParser {
  protected config: FrontConfig;

  constructor(config: FrontConfig) {
    this.config = config;
  }
}