"use strict";
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
exports.signMetaTxRequest = void 0;
var contracts_1 = require("@ethersproject/contracts");
var eth_sig_util_1 = require("@metamask/eth-sig-util");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var EssentialForwarder_json_1 = require("../abi/EssentialForwarder.json");
var EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'verifyingContract', type: 'address' },
    { name: 'salt', type: 'bytes32' },
];
var ForwardRequest = [
    { name: 'to', type: 'address' },
    { name: 'from', type: 'address' },
    { name: 'authorizer', type: 'address' },
    { name: 'nftContract', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'nftChainId', type: 'uint256' },
    { name: 'nftTokenId', type: 'uint256' },
    { name: 'targetChainId', type: 'uint256' },
    { name: 'data', type: 'bytes' },
];
function getMetaTxTypeData(verifyingContract, _chainId, message, name) {
    return {
        types: {
            EIP712Domain: EIP712Domain,
            ForwardRequest: ForwardRequest
        },
        domain: {
            name: name,
            version: '0.0.1',
            verifyingContract: verifyingContract,
            salt: (0, utils_1.hexZeroPad)(ethers_1.BigNumber.from(_chainId).toHexString(), 32)
        },
        primaryType: 'ForwardRequest',
        message: message
    };
}
function signTypedData(signer, from, data) {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If signer is a private key, use it to sign
                    if (typeof signer === 'string') {
                        privateKey = Buffer.from(signer.replace(/^0x/, ''), 'hex');
                        return [2 /*return*/, (0, eth_sig_util_1.signTypedData)({
                                privateKey: privateKey,
                                data: data,
                                version: eth_sig_util_1.SignTypedDataVersion.V3
                            })];
                    }
                    return [4 /*yield*/, signer.send('eth_signTypedData_v4', [
                            from,
                            JSON.stringify(data),
                        ])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function attachNonce(forwarder, input) {
    return __awaiter(this, void 0, void 0, function () {
        var nonce;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, forwarder
                        .getNonce(input.from)
                        .then(function (nonce) { return nonce.toString(); })];
                case 1:
                    nonce = _a.sent();
                    return [2 /*return*/, {
                            to: input.to,
                            from: input.from,
                            authorizer: input.authorizer,
                            nftContract: input.nftContract,
                            nonce: nonce,
                            nftChainId: input.nftChainId,
                            nftTokenId: input.nftTokenId,
                            targetChainId: input.targetChainId,
                            data: input.data
                        }];
            }
        });
    });
}
function signMetaTxRequest(signer, chainId, input) {
    return __awaiter(this, void 0, void 0, function () {
        var forwarder, request, toSign, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    forwarder = new contracts_1.Contract(EssentialForwarder_json_1.address, EssentialForwarder_json_1.abi);
                    return [4 /*yield*/, attachNonce(forwarder, input)];
                case 1:
                    request = _a.sent();
                    toSign = getMetaTxTypeData(forwarder.address, chainId, request, '0xEssential PlaySession');
                    return [4 /*yield*/, signTypedData(signer, input.from, toSign)];
                case 2:
                    signature = _a.sent();
                    return [2 /*return*/, {
                            signature: signature,
                            request: __assign({ value: ethers_1.BigNumber.from(0), gas: 1e6 }, request)
                        }];
            }
        });
    });
}
exports.signMetaTxRequest = signMetaTxRequest;
