"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHoldingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_holding_dto_1 = require("./create-holding.dto");
class UpdateHoldingDto extends (0, swagger_1.PartialType)(create_holding_dto_1.CreateHoldingDto) {
}
exports.UpdateHoldingDto = UpdateHoldingDto;
//# sourceMappingURL=update-holding.dto.js.map