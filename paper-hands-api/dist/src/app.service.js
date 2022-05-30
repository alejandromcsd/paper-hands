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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const holding_service_1 = require("./holding/holding.service");
const portfolio_service_1 = require("./portfolio/portfolio.service");
let AppService = class AppService {
    constructor(portfolioService, holdingService) {
        this.portfolioService = portfolioService;
        this.holdingService = holdingService;
    }
    async seed() {
        const portfolio = await this.portfolioService.create({
            name: 'Wen moon',
        });
        const holding1 = await this.holdingService.create(portfolio.id, {
            ticket: 'ethereum',
            amount: 75.8,
            avgBuy: 2500,
            initialMultipler: 3,
            subsequentMultipler: 0.1,
            maxHodlPctExpected: 0.3,
            minTransaction: 1000,
            maxMultipleExpected: 3,
        });
        const holding2 = await this.holdingService.create(portfolio.id, {
            ticket: 'polkadex',
            amount: 105,
            avgBuy: 23,
            initialMultipler: 10,
            subsequentMultipler: 0.5,
            minTransaction: 500,
            maxHodlPctExpected: 0.5,
            maxMultipleExpected: 5,
        });
        const finalPortfolio = await this.portfolioService.findOne(portfolio.id);
        return finalPortfolio;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService,
        holding_service_1.HoldingService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map