"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.EssentialSigner = void 0;
var properties_1 = require("@ethersproject/properties");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var EssentialForwarder_json_1 = require("../abi/EssentialForwarder.json");
var messageSigner_1 = require("./messageSigner");
var EssentialSigner = /** @class */ (function (_super) {
    __extends(EssentialSigner, _super);
    function EssentialSigner(address, provider, wallet, 
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    relayerUri) {
        if (relayerUri === void 0) { relayerUri = process.env.RELAYER_URI; }
        var _this = this;
        ethers_1.logger.checkNew(_newTarget, EssentialSigner);
        _this = _super.call(this) || this;
        (0, properties_1.defineReadOnly)(_this, 'address', address);
        provider && (0, properties_1.defineReadOnly)(_this, 'provider', provider);
        wallet && (0, properties_1.defineReadOnly)(_this, 'privateKey', wallet.privateKey);
        (0, properties_1.defineReadOnly)(_this, 'relayerUri', relayerUri);
        return _this;
    }
    EssentialSigner.prototype.getAddress = function () {
        return Promise.resolve(this.address);
    };
    EssentialSigner.prototype._fail = function (message, operation) {
        return Promise.resolve().then(function () {
            ethers_1.logger.throwError(message, utils_1.Logger.errors.UNSUPPORTED_OPERATION, {
                operation: operation
            });
        });
    };
    // Populates all fields in a transaction, signs it and sends it to the network
    EssentialSigner.prototype.sendTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var result, txResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, messageSigner_1.signMetaTxRequest)(this.provider || this.privateKey, 
                        // for us, this chain ID is the chain where our Forwarding and implementation contract live.
                        // our payload is network-agnostic, so it won't necessarily be the same chain as the provider.
                        parseInt(process.env.CHAIN_ID, 10), __assign(__assign({ to: transaction.to, from: transaction.from }, transaction.customData), { targetChainId: process.env.CHAIN_ID, data: transaction.data }))];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, fetch(this.relayerUri, {
                                method: 'POST',
                                body: JSON.stringify(__assign(__assign({}, result), { forwarder: EssentialForwarder_json_1["default"] })),
                                headers: { 'Content-Type': 'application/json' }
                            })
                                .then(function (resp) { return resp.json(); })
                                .then(function (_a) {
                                var result = _a.result, status = _a.status;
                                if (status === 'success') {
                                    return JSON.parse(result);
                                }
                            })];
                    case 2:
                        txResult = _a.sent();
                        return [2 /*return*/, {
                                hash: txResult.txHash,
                                confirmations: 0,
                                from: transaction.from,
                                wait: function (_confirmations) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, Promise.reject('EssentialSigner does not support wait()')];
                                }); }); }
                            }];
                }
            });
        });
    };
    // I think we want to throw for these because we want all signing to go
    // through our whole solution.
    EssentialSigner.prototype.signMessage = function (_message) {
        return this._fail('EssentialSigner cannot sign messages', 'signMessage');
    };
    EssentialSigner.prototype.signTransaction = function (_transaction) {
        return this._fail('EssentialSigner cannot sign transactions', 'signTransaction');
    };
    EssentialSigner.prototype._signTypedData = function (_domain, _types, _value) {
        return this._fail('EssentialSigner cannot sign typed data', 'signTypedData');
    };
    EssentialSigner.prototype.connect = function (provider) {
        return new EssentialSigner(this.address, provider);
    };
    return EssentialSigner;
}(ethers_1.Signer));
exports.EssentialSigner = EssentialSigner;
