import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GraphQLModule, GraphQLSchemaHost } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { useSofa } from 'sofa-api';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlResolvers } from './modules/graphql/resolvers';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
      },
    }),
    
    PrismaModule,
    GraphqlResolvers,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(GraphQLSchemaHost) private readonly schemaHost: GraphQLSchemaHost,
    @Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  onModuleInit(): void {
    if (!this.httpAdapterHost) {
      return;
    }

    // Get the HTTP adapter
    const { httpAdapter } = this.httpAdapterHost;
    const app = httpAdapter.getInstance();

    // Get the GraphQL schema
    const { schema } = this.schemaHost;

    // Provide the schema to SOFA
    app.use(
      "/api",
      useSofa({
        schema,
        basePath: '/api',
      }),
    );
  }
}