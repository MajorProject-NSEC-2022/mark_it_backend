import { SearchModule } from './search/search.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikeAndDislikeModule } from './like-and-dislike/like-and-dislike.module';

require('dotenv').config();

@Module({
  imports: [
    SearchModule,
    MongooseModule.forRoot(process.env.MONGO_URI! + process.env.MONGO_DB_NAME!),
    UserModule,
    BlogModule,
    LikeAndDislikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
