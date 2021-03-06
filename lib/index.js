"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _http = _interopRequireDefault(require("./core/http"));

var _interfaces = _interopRequireDefault(require("./interfaces"));

var _helpers = require("./core/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client =
/*#__PURE__*/
function () {
  function Client(options) {
    _classCallCheck(this, Client);

    options = (0, _helpers.isDefined)(options) ? options : {};
    this.token = options.token || null; // Construct http client

    this.http = new _http.default(this); // Construct interfaces

    this._interfaces = this._constructInterfaces();
  }

  _createClass(Client, [{
    key: "submitListens",
    value: function submitListens(type, listens) {
      if (!(0, _helpers.isDefined)(type) || ['single', 'playing_now', 'import'].indexOf(type) < 0) {
        throw new Error('Invalid value provided for the "type" parameter');
      }

      if (!(0, _helpers.isDefined)(listens) || !Array.isArray(listens)) {
        throw new Error('Invalid value provided for the "listens" parameter');
      } // Send request


      return this.http.post('submit-listens', {
        authenticated: true,
        body: {
          'listen_type': type,
          'payload': listens
        }
      }).then(function (body) {
        if ((0, _helpers.isDefined)(body) && (0, _helpers.isDefined)(body.payload)) {
          return body.payload;
        }

        return null;
      });
    }
  }, {
    key: "_constructInterfaces",
    value: function _constructInterfaces() {
      var _this = this;

      var result = {};
      Object.keys(_interfaces.default).forEach(function (key) {
        result[key] = new _interfaces.default[key](_this);
      });
      return result;
    }
  }, {
    key: "user",
    get: function get() {
      return this._interfaces['user'];
    }
  }]);

  return Client;
}();

exports.Client = Client;
//# sourceMappingURL=index.js.map
