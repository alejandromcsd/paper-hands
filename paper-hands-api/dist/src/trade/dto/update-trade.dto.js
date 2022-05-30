"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTradeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_trade_dto_1 = require("./create-trade.dto");
class UpdateTradeDto extends (0, swagger_1.PartialType)(create_trade_dto_1.CreateTradeDto) {
}
exports.UpdateTradeDto = UpdateTradeDto;
//# sourceMappingURL=update-trade.dto.js.map