import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users_entity } from 'src/user/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'fornitureshop-database',
    entities: [Users_entity],
    synchronize: false,
}

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: () => {
            return {
                ...dataSourceOptions,
            }
        }
    })]
})


export class DatabaseModule { }
