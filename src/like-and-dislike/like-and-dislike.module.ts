/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BlogModule } from 'src/blog/blog.module';
import { AuthenticationMiddleware } from 'src/user/authentication.middleware';
import { UserModule } from 'src/user/user.module';
import { LikeAndDislikeController } from './like-and-dislike.controller';
import { LikeAndDislikeService } from './like-and-dislike.service';

// TODO: Doesnt work with simple numbers. Use a set to store the list of users.
@Module({
  imports: [BlogModule, UserModule],
  controllers: [LikeAndDislikeController],
  providers: [LikeAndDislikeService],
})
export class LikeAndDislikeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
      // .forRoutes(LikeAndDislikeController);
  }
}
