import { Resolver, Query, ResolveField, Parent, Args, Mutation, Context } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class GraphqlResolver {
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
      //@ts-ignore
      data: {
        name: name
      }
    });
  }
}
