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
exports.HoldingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const portfolio_entity_1 = require("../portfolio/entities/portfolio.entity");
const typeorm_2 = require("typeorm");
const holding_entity_1 = require("./entities/holding.entity");
const trade_entity_1 = require("../trade/entities/trade.entity");
let HoldingService = class HoldingService {
    constructor(tradeRepository, holdingRepository, portfolioRepository) {
        this.tradeRepository = tradeRepository;
        this.holdingRepository = holdingRepository;
        this.portfolioRepository = portfolioRepository;
    }
    generateTrades(createHoldingDto) {
        const trades = [];
        let cumulativePctSold = 0.0;
        let multiplier = createHoldingDto.initialMultipler;
        let pctToSell = 0.01;
        let sellPrice = createHoldingDto.avgBuy * multiplier;
        let amountToSell = pctToSell * createHoldingDto.amount;
        let revenue = sellPrice * amountToSell;
        while (revenue < createHoldingDto.minTransaction) {
            pctToSell += 0.01;
            amountToSell = pctToSell * createHoldingDto.amount;
            revenue = sellPrice * amountToSell;
        }
        do {
            const trade = this.tradeRepository.create({
                profitTarget: multiplier,
                pctSold: pctToSell,
                isSold: false,
            });
            cumulativePctSold += pctToSell;
            pctToSell += 0.01;
            trades.push(trade);
            multiplier += createHoldingDto.subsequentMultipler;
        } while (cumulativePctSold + pctToSell <
            1 - createHoldingDto.maxHodlPctExpected);
        return trades;
    }
    async saveTrades(holding, trades) {
        const savedTrades = await Promise.all(trades.map(async (t) => {
            await this.tradeRepository.save(t);
            return t;
        }));
        holding.trades = savedTrades;
        await this.holdingRepository.save(holding);
    }
    async create(portfolioId, createHoldingDto) {
        const holding = this.holdingRepository.create(createHoldingDto);
        const trades = this.generateTrades(createHoldingDto);
        await this.saveTrades(holding, trades);
        const portfolio = await this.portfolioRepository.findOne(portfolioId, {
            relations: ['holdings'],
        });
        portfolio.holdings.push(holding);
        await this.portfolioRepository.save(portfolio);
        return holding;
    }
    findAll() {
        return this.holdingRepository.find({ relations: ['portfolio', 'trades'] });
    }
    findOne(id) {
        return this.holdingRepository.findOne(id, {
            relations: ['portfolio', 'trades'],
        });
    }
    async update(id, updateHoldingDto) {
        const toUpdate = await this.findOne(id);
        let updated = Object.assign(toUpdate, updateHoldingDto);
        return this.holdingRepository.save(updated);
    }
    async remove(id) {
        const holding = await this.findOne(id);
        return this.holdingRepository.remove(holding);
    }
};
HoldingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(trade_entity_1.Trade)),
    __param(1, (0, typeorm_1.InjectRepository)(holding_entity_1.Holding)),
    __param(2, (0, typeorm_1.InjectRepository)(portfolio_entity_1.Portfolio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HoldingService);
exports.HoldingService = HoldingService;
//# sourceMappingURL=holding.service.js.map