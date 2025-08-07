import { ConfigServer } from "./config";
import { DataSource } from "typeorm";

const config = new (class extends ConfigServer {})();

export const AppDataSource = new DataSource(config.typeORMConfig);
export default AppDataSource;