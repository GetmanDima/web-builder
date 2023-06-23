import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { PreviewApiDto } from './dto/projects.dto';

@Injectable()
@Dependencies([getModelToken(Project.name)])
export class PreviewApiService {
  constructor(private projectModel: Model<Project>) {}

  async previewApi(projectId: string, dto: PreviewApiDto) {
    const project = await this.projectModel.findById(projectId, {
      dbConfig: 1,
      apiConfig: 1,
    });
    const request = project.apiConfig.requests.find(
      (r) => r.name === dto.requestName,
    );

    if (!request) {
      throw new HttpException(
        `Request with name "${dto.requestName}" not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = {};

    const mConnection = await mongoose.connect(
      `mongodb://localhost:27017/project-${projectId}-db`,
    );

    for (let i = 0; i < request.actions.length; i++) {
      const action = request.actions[i];
      const res = await this.processAction(
        mConnection,
        projectId,
        action,
        dto.data,
      );
      response[action.var] = res;
    }

    return response;
  }

  private async processAction(
    mConnection: any,
    projectId: string,
    action: any,
    requestParams: any,
  ) {
    if (action.type === 'get') {
      return await this.processGetAction(
        mConnection,
        projectId,
        action,
        requestParams,
      );
    }

    if (action.type === 'create') {
      return await this.processCreateAction(
        mConnection,
        projectId,
        action,
        requestParams,
      );
    }

    if (action.type === 'edit') {
      return await this.processEditAction(
        mConnection,
        projectId,
        action,
        requestParams,
      );
    }

    if (action.type === 'remove') {
      return await this.processRemoveAction(
        mConnection,
        projectId,
        action,
        requestParams,
      );
    }
  }

  private async processGetAction(
    mConnection: any,
    projectId: string,
    action: any,
    requestParams: any,
  ) {
    const model = this.getModel(
      mConnection,
      `project-${projectId}-${action.table}`,
    );

    if (action.join) {
      this.getModel(
        mConnection,
        `project-${projectId}-${action.join.table}`,
      );

      return model
        .aggregate([
          { $match: this.parseConditions(action.conditions, requestParams) },
          { $addFields: { _id: { $toString: '$_id' } } },
          {
            $lookup: {
              from: `project-${projectId}-${action.join.table}`,
              localField: action.join.localField,
              foreignField: action.join.foreignField,
              as: action.join.table,
            },
          },
        ])
        .exec();
    }

    return model.find(this.parseConditions(action.conditions, requestParams));
  }

  private async processCreateAction(
    mConnection: any,
    projectId: string,
    action: any,
    requestParams: any,
  ) {
    const newFields = this.parseFieldsMap(action.fieldsMap, requestParams);

    const model = this.getModel(
      mConnection,
      `project-${projectId}-${action.table}`,
    );

    return model.create(newFields);
  }

  private async processEditAction(
    mConnection: any,
    projectId: string,
    action: any,
    requestParams: any,
  ) {
    const newFields = this.parseFieldsMap(action.fieldsMap, requestParams);

    const model = this.getModel(
      mConnection,
      `project-${projectId}-${action.table}`,
    );

    return model.updateMany(this.parseConditions(action.conditions, requestParams), newFields);
  }

  private async processRemoveAction(
    mConnection: any,
    projectId: string,
    action: any,
    requestParams: any,
  ) {
    const model = this.getModel(
      mConnection,
      `project-${projectId}-${action.table}`,
    );

    return model.deleteMany(this.parseConditions(action.conditions, requestParams));
  }

  private parseFieldsMap(fieldsMap: any, requestParams: any) {
    return Object.keys(fieldsMap).reduce((res, fieldName) => {
      return {
        ...res,
        [fieldName]: this.parseSource(
          fieldsMap[fieldName],
          requestParams,
        ),
      };
    }, {});
  }

  private parseConditions(conditions: any[], requestParams: any) {
    const signMap = {
      '=': '$eq',
      '>': '$gt',
      '<': '$lt',
    };

    return conditions.reduce((res, condition) => {
      const parsedSource = this.parseSource(
        {
          source: condition.source,
          value: condition.value,
        },
        requestParams,
      );

      return {
        ...res,
        [condition.field]: {
          [signMap[condition.sign]]:
            condition.field === '_id'
              ? new mongoose.mongo.ObjectId(parsedSource)
              : parsedSource,
        },
      };
    }, {});
  }

  private parseSource(
    sourceData: { source: string; value: string },
    requestParams: any,
  ) {
    if (sourceData.source === 'json') {
      return JSON.parse(sourceData.value);
    }

    if (sourceData.source === 'requestParam') {
      return requestParams[sourceData.value];
    }

    if (sourceData.source === 'tableField' && sourceData.value === '_id') {
      return new mongoose.mongo.ObjectId(sourceData.value);
    }

    return sourceData.value;
  }

  private getModel(mConnection: any, modelName: string) {
    const modelNames = mConnection.connection.modelNames();

    if (modelNames.includes(modelName)) {
      return mConnection.connection.models[modelName];
    }

    const schema = new mConnection.Schema({}, { strict: false });
    const model = mConnection.model(modelName, schema);

    return model;
  }
}
