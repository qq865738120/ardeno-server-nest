import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 用户登录请求
 *
 * @export
 * @class UserLoginRequestDto
 */
export class UserLoginRequestDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
