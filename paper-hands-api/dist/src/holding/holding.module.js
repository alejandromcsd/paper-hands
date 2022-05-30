"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoldingModule = void 0;
const common_1 = require("@nestjs/common");
const holding_service_1 = require("./holding.service");
const holding_controller_1 = require("./holding.controller");
const holding_entity_1 = require("./entities/holding.entity");
const typeorm_1 = require("@nestjs/typeorm");
const portfolio_entity_1 = require("../portfolio/entities/portfolio.entity");
const trade_entity_1 = require("../trade/entities/trade.entity");
const coin_module_1 = require("../coin/coin.module");
let HoldingModule = class HoldingModule {
};
HoldingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trade_entity_1.Trade, holding_entity_1.Holding, portfolio_entity_1.Portfolio]), coin_module_1.CoinModule],
        controllers: [holding_controller_1.HoldingController],
        providers: [holding_service_1.HoldingService],
        exports: [holding_service_1.HoldingService],
    })
], HoldingModule);
exports.HoldingModule = HoldingModule;
//# sourceMappingURL=holding.module.js.map