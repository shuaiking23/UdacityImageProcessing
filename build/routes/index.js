"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    var html = "<pre>Image Processing API\n  View Image: /images/view?filename={}\n  Resize Image: /images/resize?filename={}&height={}&width={}\n  Remove Thumb /images/removethumb?filename={}</pre><br>\n  <pre>Filenames:\n  encenadaport\n  fjord\n  icelandwaterfall\n  palmtunnel\n  santamonica</pre>";
    res.status(200).send(html);
});
routes.use('/images', images_1.default);
exports.default = routes;
