/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/user/authentication.middleware';
import { UserModule } from 'src/user/user.module';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './blog.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    UserModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'blog/', method: RequestMethod.POST },
        { path: 'blog/:id', method: RequestMethod.PATCH },
        { path: 'blog/:id', method: RequestMethod.DELETE },
      );
  }
}
