import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Backendsrcmigrationsaddcolumnpassword1715512114945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("usersapp", new TableColumn({
            name: "password",
            type: "varchar",
            length: "255",
            default: "''"
        }))}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("usersapp", "password");
    }

}
