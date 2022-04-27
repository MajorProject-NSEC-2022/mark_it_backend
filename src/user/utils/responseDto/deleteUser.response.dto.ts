import { Expose } from "class-transformer";

export class DeleteUserResponseDto {
  @Expose()
  status: string;

  @Expose()
  msg: string;

  constructor(partial: Partial<DeleteUserResponseDto>) {
    Object.assign(this, partial);
  }
}
