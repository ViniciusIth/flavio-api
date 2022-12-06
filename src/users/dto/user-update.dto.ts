import { CreateUserDto } from './user-create.dto'

export class UpdateUserDto implements Partial<CreateUserDto> { }