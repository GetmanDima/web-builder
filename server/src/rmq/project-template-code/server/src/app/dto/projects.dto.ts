export class CreateProjectDto {
  readonly name: string
  readonly settings?: any
}

export class UpdateProjectDto {
  readonly name?: string
  readonly settings?: any
}

export class UpdateFrontendConfigDto {
  readonly frontendConfig?: any
}

export class UpdateDbConfigDto {
  readonly dbConfig?: any
}

export class UpdateApiConfigDto {
  readonly apiConfig?: any
}

export class PreviewApiDto {
  readonly requestName: string
  readonly data: any
}