import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class GraphqlResolvers {
  constructor(
      private prisma: PrismaService,
  ) {}

  @Query('getUsers')
  async getUsers() {
    return this.prisma.user.findMany();
  }

  @Mutation('createUser')
  async createUser(
    @Args('name') name: string
  ) {
    return this.prisma.user.create({
      data: {
        name: name
      }
    });
  }
}
