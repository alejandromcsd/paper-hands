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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const create_portfolio_dto_1 = require("./dto/create-portfolio.dto");
const swagger_1 = require("@nestjs/swagger");
const portfolio_entity_1 = require("./entities/portfolio.entity");
let PortfolioController = class PortfolioController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    create(createPortfolioDto) {
        return this.portfolioService.create(createPortfolioDto);
    }
    findOne(id) {
        return this.portfolioService.findOne(+id);
    }
    findAll() {
        return this.portfolioService.findAll();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create portfolio' }),
    (0, swagger_1.ApiCreatedResponse)({ type: portfolio_entity_1.Portfolio }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.CreatePortfolioDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find portfolio by id' }),
    (0, swagger_1.ApiOkResponse)({ type: portfolio_entity_1.Portfolio }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all portfolios' }),
    (0, swagger_1.ApiOkResponse)({ type: portfolio_entity_1.Portfolio }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "findAll", null);
PortfolioController = __decorate([
    (0, swagger_1.ApiTags)('Portfolio'),
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
exports.PortfolioController = PortfolioController;
//# sourceMappingURL=portfolio.controller.js.map