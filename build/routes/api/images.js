"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var appConfigs = __importStar(require("../../utilities/appConfigs"));
var _a = require('../../utilities/processImage'), resizeImage = _a.resizeImage, fileExists = _a.fileExists;
var path = require('path');
var images = express_1.default.Router();
var fileExt = '.jpg';
images.get('/', function (req, res) {
    res.send('Images route');
});
images.get('/view', function (req, res) {
    var queryData = req.query;
    var fileName = queryData.filename;
    var html = '';
    // Input validation
    if (fileName === undefined) {
        res.status(400).send('Missing Filename');
        return;
    }
    if (fileExists(fileName, false)) {
        console.log('Found Image');
        var imagePath = appConfigs.STATIC_URL_PART +
            appConfigs.IMAGES_URL_PART +
            fileName +
            fileExt;
        html = "<center><img src='".concat(imagePath, "' alt='image'></img></center>");
    }
    else if (fileExists(fileName, true)) {
        console.log('Found Thumb');
        var imagePath = appConfigs.STATIC_URL_PART +
            appConfigs.THUMBS_URL_PART +
            fileName +
            fileExt;
        html = "<center><img src='".concat(imagePath, "' alt='image'></img></center>");
    }
    else {
        res.status(400).send('File not found');
        return;
    }
    res.send(html);
    return;
});
images.get('/resize', function (req, res) {
    var queryData = req.query;
    console.log(queryData);
    var fileName = queryData.filename;
    var height = parseInt(queryData.height);
    var width = parseInt(queryData.width);
    // Input validation
    console.log('Checking Params...');
    console.log(typeof height);
    console.log(width);
    if (fileName === undefined) {
        res.status(400).send('Missing Filename');
        return;
    }
    else if (height === undefined) {
        res.status(400).send('Missing height');
        return;
    }
    else if (width === undefined) {
        res.status(400).send('Missing width');
        return;
    }
    else if (isNaN(height)) {
        res.status(400).send('Invalid height');
        return;
    }
    else if (isNaN(width)) {
        res.status(400).send('Invalid width');
        return;
    }
    console.log('Looking for file...');
    if (!fileExists(fileName)) {
        res.status(400).send('File not found');
        return;
    }
    console.log('Input validation passed');
    function resize(fileName, height, width) {
        return __awaiter(this, void 0, void 0, function () {
            var outputImage, imageDisplayPath, html, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Params = ".concat(fileName, ", ").concat(height, ", ").concat(width));
                        return [4 /*yield*/, resizeImage(fileName, height, width)];
                    case 1:
                        outputImage = _a.sent();
                        imageDisplayPath = outputImage.split(process.cwd())[1];
                        console.log("outputImage ".concat(outputImage));
                        html = "<center><img src='".concat(imageDisplayPath, "' alt='image'></img></center>");
                        res.status(200).send(html);
                        return [2 /*return*/];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        res.status(400).send('Image processing failed');
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    resize(fileName, height, width);
});
exports.default = images;
