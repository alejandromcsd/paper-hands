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
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const holding_entity_1 = require("../holding/entities/holding.entity");
const trade_entity_1 = require("./entities/trade.entity");
let TradeService = class TradeService {
    constructor(holdingRepository, tradeRepository) {
        this.holdingRepository = holdingRepository;
        this.tradeRepository = tradeRepository;
    }
    async create(holdingId, createTradeDto) {
        const trade = this.tradeRepository.create(createTradeDto);
        const newTrade = await this.tradeRepository.save(trade);
        const holding = await this.holdingRepository.findOne(holdingId, {
            relations: ['trades'],
        });
        holding.trades.push(trade);
        await this.holdingRepository.save(holding);
        return newTrade;
    }
    findAll() {
        return this.tradeRepository.find();
    }
    findOne(id) {
        return this.tradeRepository.findOne(id);
    }
    async update(id, updateTradeDto) {
        const toUpdate = await this.findOne(id);
        let updated = Object.assign(toUpdate, updateTradeDto);
        return this.tradeRepository.save(updated);
    }
    async toggleStatus(id) {
        const trade = await this.findOne(id);
        trade.isSold = !trade.isSold;
        return this.tradeRepository.save(trade);
    }
    async remove(id) {
        const trade = await this.findOne(id);
        return this.tradeRepository.remove(trade);
    }
};
TradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(holding_entity_1.Holding)),
    __param(1, (0, typeorm_1.InjectRepository)(trade_entity_1.Trade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TradeService);
exports.TradeService = TradeService;
//# sourceMappingURL=trade.service.js.map