"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const coin_service_1 = require("./coin.service");
const coin_entity_1 = require("./entities/coin.entity");
let CoinController = class CoinController {
    constructor(coinService) {
        this.coinService = coinService;
    }
    findPricesByIds(tickets) {
        return this.coinService.findPricesByIds(tickets);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get coin prices via coingecko' }),
    (0, swagger_1.ApiOkResponse)({ type: coin_entity_1.CoinPrices }),
    (0, common_1.Get)('prices'),
    __param(0, (0, common_1.Query)('tickets')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoinController.prototype, "findPricesByIds", null);
CoinController = __decorate([
    (0, swagger_1.ApiTags)('Coins'),
    (0, common_1.Controller)('coin'),
    __metadata("design:paramtypes", [coin_service_1.CoinService])
], CoinController);
exports.CoinController = CoinController;
//# sourceMappingURL=coin.controller.js.map