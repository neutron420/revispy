"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categoryNames, categories, createdCategories, testUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Seeding database...');
                    // Clear existing data
                    return [4 /*yield*/, prisma.userCategory.deleteMany()];
                case 1:
                    // Clear existing data
                    _a.sent();
                    return [4 /*yield*/, prisma.category.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 3:
                    _a.sent();
                    categoryNames = new Set();
                    while (categoryNames.size < 100) {
                        categoryNames.add(faker_1.faker.commerce.department());
                    }
                    categories = Array.from(categoryNames).map(function (name) { return ({
                        name: name,
                        description: faker_1.faker.commerce.productDescription(),
                        imageUrl: "https://placehold.co/300x200?text=".concat(encodeURIComponent(name)), // ✅ Optimized image URL
                    }); });
                    return [4 /*yield*/, prisma.category.createMany({ data: categories })];
                case 4:
                    createdCategories = _a.sent();
                    console.log("\u2705 Created ".concat(createdCategories.count, " categories"));
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'test@example.com',
                                firstName: 'Test',
                                lastName: 'User',
                                password: '$2a$10$roNeWgMsKrnMQzFBdnQYtOHj4CDF3JfgdvFxAXJ0XS2H8FQ0QJZK', // hashed "password123"
                            },
                        })];
                case 5:
                    testUser = _a.sent();
                    console.log("\uD83D\uDC64 Created user: ".concat(testUser.email));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () {
    console.log('🌟 Seeding completed!');
})
    .catch(function (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
