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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const constants_1 = require("../constants");
const rxjs_1 = require("rxjs");
const coin_entity_1 = require("./entities/coin.entity");
let CoinService = class CoinService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findPricesByIds(tickets) {
        const prices = await (0, rxjs_1.lastValueFrom)(this.httpService.get(`${constants_1.geckoPriceUrl}?ids=${tickets}&vs_currencies=usd`));
        const ticketsArray = tickets.split(',');
        const coins = new coin_entity_1.CoinPrices();
        ticketsArray.forEach((t) => {
            if (prices.data[t]) {
                coins[t] = {
                    usd: prices.data[t].usd,
                };
            }
        });
        return coins;
    }
};
CoinService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CoinService);
exports.CoinService = CoinService;
//# sourceMappingURL=coin.service.js.map