import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UsersMigrate1714587279805 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: 'usersapp',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'FullName',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'cellphone',
                    type: 'varchar', 
                },
                {
                    name: 'document',
                    type: 'varchar',
                },
                {
                    name: 'sex',
                    type: 'varchar',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('usersapp')
    }

}
