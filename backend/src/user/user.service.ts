import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users_entity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { isEmail } from 'validator';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users_entity)
        private readonly userRepository: Repository<Users_entity>,
        private readonly jwtService: JwtService,
      ) {}

      
    async findAll(page: number = 1, limit: number = 10): Promise<{data: Users_entity[], total: number, pages: number}>{
        const [result, total] = await this.userRepository.findAndCount({
            skip: (page - 1)*limit,
            take: limit,
        });
        return {
            data: result,
            total,
            pages: Math.ceil(total/limit)
        };
    }


    async findOne(id: string){
        const user = await this.userRepository.findOneBy({id})

        if (!user){
            throw new NotFoundException(`User ID ${id} not found`)
        }
        return user
    }

    async create(createUserDto: CreateUserDTO){
        const { password, ...userData } = createUserDto;


        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            ...userData,
            password: hashedpassword,
        })

        return this.userRepository.save(newUser);
    }

    async update(id: string, updateUserDto: UpdateUserDTO): Promise<Users_entity> {
        const alterUser = await this.userRepository.findOneBy({id});
        if (!alterUser){
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        if (updateUserDto.password){
            const hashedpassword = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashedpassword;
        }
        
        Object.assign(alterUser, updateUserDto);

        await this.userRepository.save(alterUser);
        return alterUser;
    }

    async remove(id: string){
        const user = await this.userRepository.findOneBy({id})

        if (!user){
            throw new NotFoundException(`User ID ${id} not found`)
        }
        return this.userRepository.remove(user)
        
    }

    async findUserByEmail(email: string): Promise<Users_entity>{
        if (!email){
            throw new BadRequestException('Email is required');
        }
        if (!this.isValidEmail(email)){
            throw new BadRequestException('Invalid email format');
        }
        const query = `SELECT * FROM usersapp WHERE email = $1`;
        const result = await this.userRepository.query(query, [email]);
        if(!result.length){
            throw new NotFoundException(`User with email ${email} not found`)
        }
        return result[0];
    }

    private isValidEmail(email: string): boolean {
        return isEmail(email)
    }

    async loginUser(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.findUserForEmail(email)
        if(!user){
            throw new NotFoundException(`User with email ${email} not found`)
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
          }
      
          const payload = { username: user.email, sub: user.id };
          return {
            access_token: this.jwtService.sign(payload),
          };
    }

    private async findUserForEmail(email: string): Promise<Users_entity> {
        return this.userRepository.findOneBy({ email });
    }


    
}
