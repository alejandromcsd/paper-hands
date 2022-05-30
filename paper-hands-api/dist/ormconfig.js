"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'sqlite',
    database: 'paperhands.db',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/src/db/migrations/*.js'],
    cli: {
        migrationsDir: 'src/db/migrations',
    },
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map