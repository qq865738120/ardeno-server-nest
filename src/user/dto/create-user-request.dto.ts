import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 创建用户请求
 *
 * @export
 * @class CreateUserRequestDto
 */
export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
