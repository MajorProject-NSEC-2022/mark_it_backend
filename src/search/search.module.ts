import { SearchService } from './search.service';
import { SearchController } from './search.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [BlogModule, UserModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
