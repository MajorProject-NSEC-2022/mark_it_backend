import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteResponseDto {
  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  msg: string;

  constructor(partial: Partial<DeleteResponseDto>) {
    Object.assign(this, partial);
  }
}
