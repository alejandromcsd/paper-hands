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
exports.Holding = void 0;
const swagger_1 = require("@nestjs/swagger");
const portfolio_entity_1 = require("../../portfolio/entities/portfolio.entity");
const typeorm_1 = require("typeorm");
const trade_entity_1 = require("../../trade/entities/trade.entity");
let Holding = class Holding {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Holding.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Holding.prototype, "ticket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Holding.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 12 }),
    __metadata("design:type", Number)
], Holding.prototype, "avgBuy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Holding.prototype, "maxMultipleExpected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 12 }),
    __metadata("design:type", Number)
], Holding.prototype, "maxHodlPctExpected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'numeric', precision: 3, scale: 2 }),
    __metadata("design:type", Number)
], Holding.prototype, "initialMultipler", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'numeric', precision: 3, scale: 2 }),
    __metadata("design:type", Number)
], Holding.prototype, "subsequentMultipler", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Holding.prototype, "minTransaction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => portfolio_entity_1.Portfolio }),
    (0, typeorm_1.ManyToOne)((type) => portfolio_entity_1.Portfolio, (portfolio) => portfolio.holdings),
    __metadata("design:type", portfolio_entity_1.Portfolio)
], Holding.prototype, "portfolio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => trade_entity_1.Trade, (trade) => trade.holding),
    __metadata("design:type", Array)
], Holding.prototype, "trades", void 0);
Holding = __decorate([
    (0, typeorm_1.Entity)()
], Holding);
exports.Holding = Holding;
//# sourceMappingURL=holding.entity.js.map