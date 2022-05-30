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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const coin_service_1 = require("./coin/coin.service");
const portfolio_entity_1 = require("./portfolio/entities/portfolio.entity");
let AppController = class AppController {
    constructor(appService, coinService) {
        this.appService = appService;
        this.coinService = coinService;
    }
    async seed() {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const portfolio = await this.appService.seed();
        console.log(portfolio);
        portfolio.holdings.forEach(async (holding) => {
            let cumulativePctSold = 0;
            let cumulativeRevenue = 0;
            const coins = await this.coinService.findPricesByIds(holding.ticket);
            console.log(`${holding.ticket} - Current value: ${formatter.format(holding.amount * coins[holding.ticket].usd)}`);
            holding.trades.forEach((trade, i) => {
                const price = trade.profitTarget * holding.avgBuy;
                const amountSold = trade.pctSold * holding.amount;
                const revenue = Math.round(price * amountSold);
                const pctSold = Math.round(trade.pctSold * 100);
                cumulativePctSold += pctSold;
                cumulativeRevenue += revenue;
                console.log(`${holding.ticket} ${i + 1} -` +
                    ` (${trade.profitTarget}X) \t ${formatter.format(price)} \t| \t` +
                    `AMOUNT: ${amountSold.toFixed(2)} \t | \t` +
                    `REVENUE: ${formatter.format(revenue)} | ` +
                    `% SOLD: ${pctSold}% | ` +
                    `CUMULATIVE SOLD: ${cumulativePctSold}%`);
            });
            console.log(`TOTAL REVENUE: ${formatter.format(cumulativeRevenue)}`);
            console.log('---');
        });
        return portfolio;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Seed a demo portfolio' }),
    (0, swagger_1.ApiCreatedResponse)({ type: portfolio_entity_1.Portfolio }),
    (0, common_1.Post)('seed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "seed", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        coin_service_1.CoinService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map