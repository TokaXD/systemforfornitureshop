import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { UsersMigrate1714587279805 } from "src/migrations/1714587279805-UsersMigrate";
import { Backendsrcmigrationsaddcolumnpassword1715512114945 } from "src/migrations/1715512114945-backendsrcmigrationsaddcolumnpassword";


export const datasource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [UsersMigrate1714587279805, Backendsrcmigrationsaddcolumnpassword1715512114945]
})