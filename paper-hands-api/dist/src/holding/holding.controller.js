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
exports.HoldingController = void 0;
const common_1 = require("@nestjs/common");
const holding_service_1 = require("./holding.service");
const create_holding_dto_1 = require("./dto/create-holding.dto");
const update_holding_dto_1 = require("./dto/update-holding.dto");
const swagger_1 = require("@nestjs/swagger");
const holding_entity_1 = require("./entities/holding.entity");
let HoldingController = class HoldingController {
    constructor(holdingService) {
        this.holdingService = holdingService;
    }
    create(portfolioId, createHoldingDto) {
        return this.holdingService.create(+portfolioId, createHoldingDto);
    }
    findAll() {
        return this.holdingService.findAll();
    }
    findOne(id) {
        return this.holdingService.findOne(+id);
    }
    update(id, updateHoldingDto) {
        return this.holdingService.update(+id, updateHoldingDto);
    }
    remove(id) {
        return this.holdingService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create holding' }),
    (0, swagger_1.ApiCreatedResponse)({ type: holding_entity_1.Holding }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)('portfolioId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_holding_dto_1.CreateHoldingDto]),
    __metadata("design:returntype", void 0)
], HoldingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all holdings' }),
    (0, swagger_1.ApiOkResponse)({ type: holding_entity_1.Holding, isArray: true }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HoldingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get holding by id' }),
    (0, swagger_1.ApiOkResponse)({ type: holding_entity_1.Holding }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoldingController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update holding' }),
    (0, swagger_1.ApiCreatedResponse)({ type: holding_entity_1.Holding }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_holding_dto_1.UpdateHoldingDto]),
    __metadata("design:returntype", void 0)
], HoldingController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove holding' }),
    (0, swagger_1.ApiOkResponse)({ type: holding_entity_1.Holding }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoldingController.prototype, "remove", null);
HoldingController = __decorate([
    (0, swagger_1.ApiTags)('Holdings'),
    (0, common_1.Controller)('holding'),
    __metadata("design:paramtypes", [holding_service_1.HoldingService])
], HoldingController);
exports.HoldingController = HoldingController;
//# sourceMappingURL=holding.controller.js.map