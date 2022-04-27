import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteResponseDto {
  @Expose()
  status: string;

  @Expose()
  msg: string;

  constructor(partial: Partial<DeleteResponseDto>) {
    Object.assign(this, partial);
  }
}
