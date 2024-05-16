import { IsEmail, IsOptional, IsString } from "class-validator";



export class UpdateUserDTO{
    @IsString()
    @IsOptional()
    readonly FullName?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly cellphone?: string;

    @IsString()
    @IsOptional()
    readonly document?: string;

    @IsString()
    @IsOptional()
    readonly sex?: string;

    @IsString()
    @IsOptional()
    password?: string

}