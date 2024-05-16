import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    readonly FullName: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly cellphone: string;

    @IsString()
    @IsNotEmpty()
    readonly document: string;


    @IsString()
    @IsNotEmpty()
    readonly sex: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string
    
}