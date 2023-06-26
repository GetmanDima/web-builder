import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

const envFileName = process.env.NODE_ENV === "production" ? "production" : "development";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${envFileName}.env`,
      isGlobal: true
    })
  ]
})

export class AppConfigModule {}
