import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Get('email/:email')
    findEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDTO) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
        return this.userService.update(id, updateUserDto)
    }

    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }


    @Post('login')
    async login(@Body() loginDto: { email: string, password: string }) {
        const { email, password } = loginDto;
        return this.userService.loginUser(email, password);
    }
}   
