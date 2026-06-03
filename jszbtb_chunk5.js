webpackJsonp([5],{

/***/ "//Fk":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("U5ju"), __esModule: true };

/***/ }),

/***/ "/R87":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GET_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POST_METHOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return POST_METHOD_1; });
/* unused harmony export PUT_METHOD */
/* unused harmony export DELETE_METHOD */
/* unused harmony export POST_FORM_METHOD */
/* unused harmony export PUT_FORM_METHOD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return POST_MULTIPART_FORM_METHOD; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_js_config__ = __webpack_require__("W/7t");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_querystring__ = __webpack_require__("1nuA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_querystring__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_common__ = __webpack_require__("XIuu");




var _get = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(url) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/json');

            _context.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.get(requesturl);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function _get(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _post = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(url, param) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/json');

            _context2.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(requesturl, param);

          case 5:
            return _context2.abrupt('return', _context2.sent);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function _post(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _put = function () {
  var _ref3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(url, param) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/json');

            _context3.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.put(requesturl, param);

          case 5:
            return _context3.abrupt('return', _context3.sent);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function _put(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _delete = function () {
  var _ref4 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee4(url) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/json');

            _context4.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.delete(requesturl);

          case 5:
            return _context4.abrupt('return', _context4.sent);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function _delete(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

var postForm = function () {
  var _ref5 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee5(url, param) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/x-www-form-urlencoded');

            _context5.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(requesturl, param);

          case 5:
            return _context5.abrupt('return', _context5.sent);

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function postForm(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var postFormData = function () {
  var _ref6 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee6(url, formData) {
    var requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            requesturl = url;

            setAxios('multipart/form-data');

            _context6.next = 4;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(requesturl, formData);

          case 4:
            return _context6.abrupt('return', _context6.sent);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function postFormData(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var putForm = function () {
  var _ref7 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee7(url, param) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('application/x-www-form-urlencoded');

            _context7.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.put(requesturl, param);

          case 5:
            return _context7.abrupt('return', _context7.sent);

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function putForm(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

var postMultiPartForm = function () {
  var _ref8 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee8(url, formData) {
    var hostname, requesturl;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            hostname = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName(url);
            requesturl = hostname + '/' + url;


            setAxios('multipart/form-data');

            _context8.next = 5;
            return __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(requesturl, formData);

          case 5:
            return _context8.abrupt('return', _context8.sent);

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function postMultiPartForm(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var callAPI = function () {
  var _ref9 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee9(url) {
    var methodName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GET_METHOD;
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var method, result, errorMessage, _errorMessage;

    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            method = void 0;
            result = void 0;
            _context9.t0 = methodName;
            _context9.next = _context9.t0 === GET_METHOD ? 5 : _context9.t0 === POST_METHOD ? 7 : _context9.t0 === PUT_METHOD ? 9 : _context9.t0 === DELETE_METHOD ? 11 : _context9.t0 === POST_FORM_METHOD ? 13 : _context9.t0 === POST_METHOD_1 ? 15 : _context9.t0 === PUT_FORM_METHOD ? 17 : _context9.t0 === POST_MULTIPART_FORM_METHOD ? 19 : 21;
            break;

          case 5:
            method = _get;
            return _context9.abrupt('break', 22);

          case 7:
            method = _post;
            return _context9.abrupt('break', 22);

          case 9:
            method = _put;
            return _context9.abrupt('break', 22);

          case 11:
            method = _delete;
            return _context9.abrupt('break', 22);

          case 13:
            method = postForm;
            return _context9.abrupt('break', 22);

          case 15:
            method = postFormData;
            return _context9.abrupt('break', 22);

          case 17:
            method = putForm;
            return _context9.abrupt('break', 22);

          case 19:
            method = postMultiPartForm;
            return _context9.abrupt('break', 22);

          case 21:
            return _context9.abrupt('break', 22);

          case 22:
            _context9.prev = 22;
            _context9.next = 25;
            return method(url, param);

          case 25:
            result = _context9.sent;

            if (!(url === 'ContentAPI/verificationSmsCode' || url === 'ContentAPI/addSpecialSolicitation' || url === 'ContentAPI/sendSmsCode' || url.includes('upload/saveFile') == true)) {
              _context9.next = 28;
              break;
            }

            return _context9.abrupt('return', result.data);

          case 28:
            if (!(result && result.data && result.data.success)) {
              _context9.next = 32;
              break;
            }

            return _context9.abrupt('return', result.data.datalist || result.data.data);

          case 32:
            errorMessage = '' + __WEBPACK_IMPORTED_MODULE_6__constants_common__["a" /* ERROR_MESSAGE_PREFIX */] + result.data.errorMessage;


            console.error(errorMessage);

            return _context9.abrupt('return', errorMessage);

          case 35:
            _context9.next = 42;
            break;

          case 37:
            _context9.prev = 37;
            _context9.t1 = _context9['catch'](22);
            _errorMessage = '' + __WEBPACK_IMPORTED_MODULE_6__constants_common__["a" /* ERROR_MESSAGE_PREFIX */] + _context9.t1;


            console.error(_errorMessage);

            return _context9.abrupt('return', _errorMessage);

          case 42:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this, [[22, 37]]);
  }));

  return function callAPI(_x15) {
    return _ref9.apply(this, arguments);
  };
}();







var GET_METHOD = 'GET_METHOD';
var POST_METHOD = 'POST_METHOD';
var POST_METHOD_1 = 'POST_METHOD_1';
var PUT_METHOD = 'PUT_METHOD';
var DELETE_METHOD = 'DELETE_METHOD';
var POST_FORM_METHOD = 'POST_FORM_METHOD';
var PUT_FORM_METHOD = 'PUT_FORM_METHOD';
var POST_MULTIPART_FORM_METHOD = 'POST_MULTIPART_FORM_METHOD';

var timeout = 60 * 1000;

function setAxios(contentType) {
  var transformRequest = void 0;

  __WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers['Content-Type'] = contentType;
  __WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.timeout = timeout;

  switch (contentType) {
    case 'application/json':
      transformRequest = [function (data) {
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(data);
      }];
      break;
    case 'application/x-www-form-urlencoded':
      transformRequest = [function (data) {
        var queryStr = '';

        if (data) {
          if (data instanceof Object && data.toString() === "[object Object]") {
            if (data.params) {
              queryStr = __WEBPACK_IMPORTED_MODULE_5_querystring___default.a.stringify(data.params);
            } else {
              queryStr = __WEBPACK_IMPORTED_MODULE_5_querystring___default.a.stringify(data);
            }
          } else {
            console.error("接口传参为JSON,当前格式不符合！", data);
            throw data;
          }
        }

        return queryStr;
      }];
      break;
    case 'multipart/form-data':
      transformRequest = [function (data) {
        return data;
      }];
      break;
    default:
      transformRequest = [function (data) {
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(data);
      }];
      break;
  }

  __WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.transformRequest = transformRequest;
}

/* harmony default export */ __webpack_exports__["e"] = ({
  callAPI: callAPI
});

/***/ }),

/***/ "1H6C":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__("HhN8");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "1nuA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__("kMPS");
exports.encode = exports.stringify = __webpack_require__("xaZU");


/***/ }),

/***/ "21It":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("FtD3");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "2KxR":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "2gux":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_index_js__ = __webpack_require__("pX7J");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b95ae78_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("cFc+");
function injectStyle (ssrContext) {
  __webpack_require__("aBzX")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1b95ae78"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_index_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b95ae78_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "5PlU":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "5VQ+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "66mf":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("yFQF");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("7f69cf1a", content, true, {});

/***/ }),

/***/ "7GwW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");
var settle = __webpack_require__("21It");
var buildURL = __webpack_require__("DQCr");
var parseHeaders = __webpack_require__("oJlt");
var isURLSameOrigin = __webpack_require__("GHBc");
var createError = __webpack_require__("FtD3");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__("thJu");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__("p1b6");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "82Mu":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var macrotask = __webpack_require__("L42u").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("R9M2")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "86Fy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__("d7EF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_js_config__ = __webpack_require__("W/7t");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_js_util__ = __webpack_require__("hhm8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_noticeLinkNav_index_vue__ = __webpack_require__("Xdzb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apis_weChat__ = __webpack_require__("J9QI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__apis_bulletin__ = __webpack_require__("D7YY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_common__ = __webpack_require__("XIuu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_weChatOfficialAccountQrCode_index_vue__ = __webpack_require__("2gux");















var axios = __WEBPACK_IMPORTED_MODULE_3__common_js_config__["a" /* default */].axios;
var apiHostName = __WEBPACK_IMPORTED_MODULE_3__common_js_config__["a" /* default */].GetApiHostName();

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    WeChatOfficialAccountQrCode: __WEBPACK_IMPORTED_MODULE_9__components_weChatOfficialAccountQrCode_index_vue__["a" /* default */],
    noticeLinkNav: __WEBPACK_IMPORTED_MODULE_5__components_noticeLinkNav_index_vue__["a" /* default */]
  },

  data: function data() {
    return {
      tenderprojectcode: "",
      navDataList: [],
      releaseInfo: {
        updateTime: '', // 发布日期
        media: '江苏省招标投标公共服务平台', // 发布媒介
        channel: '' // 渠道
      },
      PlatformList: [], // 来源渠道
      // 公告类型名称
      categoryName: '',
      // 公告 ID
      bulletinID: '',
      InfoData: [],
      Title: '',
      ProjectName: '',
      ShowDownloadUrl: false,
      DownloadUrl: '',
      // 微信公众号引导二维码是否显示
      isWeChatOfficialAccountQrcShow: false,
      weChatOffcialAccountQrcUrl: ''
    };
  },


  methods: {
    /************************************* Created & Mounted *************************************/
    fetchData: function fetchData() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var vm, type, _vm$getRouteParams, _vm$getRouteParams2;

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this;
                type = void 0;
                _vm$getRouteParams = vm.getRouteParams();
                _vm$getRouteParams2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_vm$getRouteParams, 2);
                type = _vm$getRouteParams2[0];
                vm.bulletinID = _vm$getRouteParams2[1];


                type = decodeURIComponent(type);

                // 如果路由没有传入 categoryName 或 bulletinID，则返回列表页

                if (!(!type || !vm.bulletinID)) {
                  _context.next = 10;
                  break;
                }

                vm.handleNavigateToListPage();

                return _context.abrupt('return', void 0);

              case 10:

                // 统计访问次数
                Object(__WEBPACK_IMPORTED_MODULE_7__apis_bulletin__["b" /* getBulletinSearchAPIVisitByPC */])(vm.bulletinID);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },


    /**
     * 从路由中获取 type、bulleinID
     *
     * @returns
     */
    getRouteParams: function getRouteParams() {
      var vm = this;
      var params = vm.$route.params;
      var type = params && params.type || '';
      var bulletinID = params && params.bulletinID || '';

      return [type, bulletinID];
    },


    /**
     * 跳转到列表页
     *
     * @event
     */
    handleNavigateToListPage: function handleNavigateToListPage() {
      Object(__WEBPACK_IMPORTED_MODULE_4__common_js_util__["c" /* pushRouterByRouteNameAndParams */])(this, 'announcedetail', {
        type: 0
      });
    },

    // 获取所属平台
    fetchConnectedPlatform: function fetchConnectedPlatform(data) {
      var vm = this;
      var url = apiHostName + '/PlatformApi/ConnectedPlatform';
      axios.get(url).then(function (result) {
        if (result.data.success) {
          vm.PlatformList = result.data.datalist;
          vm.PlatformList.forEach(function (item) {
            if (item.platformCode === data.platformcode) {
              vm.releaseInfo.channel = item.platformName;
            }
          });
        }
      });
    },

    // 发布时间处理, 判断使用
    getUpdateTime: function getUpdateTime(data) {
      if (data.update_time) {
        return data.update_time;
      } else if (data.updateTime) {
        return data.updateTime;
      } else if (data.bulletinssuetime || data.bulletinissuetime) {
        var buildTime = data.bulletinssuetime || data.bulletinissuetime;
        return buildTime.slice(0, 4) + "-" + buildTime.slice(4, 6) + "-" + buildTime.slice(6, 8);
      } else if (data.createdTime) {
        return data.createdTime;
      } else {
        return '';
      }
    },

    /**
     * 获取文章内容
     */
    fetchHTMLContent: function fetchHTMLContent() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var vm, searchType, bulletinID, releaseDeCode, releaseDate, url;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                vm = _this2;
                searchType = vm.$route.params.type;
                bulletinID = vm.$route.params.bulletinID;
                releaseDeCode = decodeURI(vm.$route.query.release);
                releaseDate = JSON.parse(releaseDeCode).release;
                url = '';
                _context3.t0 = searchType;
                _context3.next = _context3.t0 === 'TenderBulletin' ? 9 : _context3.t0 === 'QulifyBulletin' ? 12 : _context3.t0 === 'QualifyBulletin' ? 12 : _context3.t0 === 'WinCandidateBulletin' ? 15 : _context3.t0 === 'WinBidBulletin' ? 18 : _context3.t0 === 'AmendBulletin' ? 21 : _context3.t0 === 'PlanBulletin' ? 24 : _context3.t0 === 'PrivateBulletinDetail' ? 27 : _context3.t0 === 'ContractBulletin' ? 30 : 33;
                break;

              case 9:
                vm.Title = '招标公告';
                url = apiHostName + '/DataSyncApi/TenderBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 12:
                vm.Title = '资格预审公告';
                url = apiHostName + '/DataSyncApi/QulifyBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 15:
                vm.Title = '中标候选人公告';
                url = apiHostName + '/DataSyncApi/WinCandidateBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 18:
                vm.Title = '结果公示';
                url = apiHostName + '/DataSyncApi/WinBidBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 21:
                vm.Title = '更正公告公示';
                url = apiHostName + '/DataSyncApi/AmendBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 24:
                vm.Title = '招标计划公告';
                url = apiHostName + '/DataSyncApi/PlanBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 27:
                vm.Title = '非公开招标理由公示';
                url = apiHostName + '/DataSyncApi/PrivateBulletinDetail/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 30:
                vm.Title = '合同履约公示';
                url = apiHostName + '/DataSyncApi/ContractBulletin/id/' + bulletinID;
                return _context3.abrupt('break', 34);

              case 33:
                return _context3.abrupt('break', 34);

              case 34:
                _context3.next = 36;
                return axios.get(url).then(function () {
                  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(result) {
                    var oDom, data, data_updateTime, updatetime, changetime, contRes, list, key;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!result.data.success) {
                              _context2.next = 43;
                              break;
                            }

                            oDom = document.getElementById('content');
                            // 非公开招标理由公示 单独处理

                            data = searchType === 'PrivateBulletinDetail' ? result.data.data : result.data.data.data[0];

                            if (!data) {
                              _context2.next = 43;
                              break;
                            }

                            data_updateTime = _this2.getUpdateTime(data);
                            updatetime = Date.parse(new Date(data_updateTime));
                            changetime = new Date("2022-10-22 00:00:00").getTime();


                            if (!data.attachement) {
                              vm.ShowDownloadUrl = false;
                            } else {
                              vm.ShowDownloadUrl = true;
                              vm.DownloadUrl = data.attachement.downloadUrl;
                            }

                            vm.releaseInfo.updateTime = releaseDate;
                            vm.fetchConnectedPlatform(data);
                            vm.tenderprojectcode = data.tenderprojectcode;

                            _context2.t0 = searchType;
                            _context2.next = _context2.t0 === 'TenderBulletin' ? 14 : _context2.t0 === 'QulifyBulletin' ? 17 : _context2.t0 === 'QualifyBulletin' ? 17 : _context2.t0 === 'WinCandidateBulletin' ? 20 : _context2.t0 === 'WinBidBulletin' ? 23 : _context2.t0 === 'AmendBulletin' ? 26 : _context2.t0 === 'PlanBulletin' ? 29 : _context2.t0 === 'PrivateBulletinDetail' ? 32 : _context2.t0 === 'ContractBulletin' ? 35 : 38;
                            break;

                          case 14:
                            oDom.innerHTML = data.bulletincontent;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinname || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 17:
                            oDom.innerHTML = data.bulletincontent;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinname || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 20:
                            oDom.innerHTML = data.publicitycontent;
                            updatetime >= changetime ? vm.ProjectName = data.publicityname || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 23:
                            oDom.innerHTML = data.bulletincontent;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinname || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 26:
                            oDom.innerHTML = data.amendcontent;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinName || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 29:
                            oDom.innerHTML = data.htmlInnerText;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinName || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 32:
                            oDom.innerHTML = data.bidReason;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinName || data.projectName : vm.ProjectName = data.projectName || data.bulletinName;
                            return _context2.abrupt('break', 39);

                          case 35:
                            oDom.innerHTML = data.bulletincontent;
                            updatetime >= changetime ? vm.ProjectName = data.bulletinname || data.projectName : vm.ProjectName = data.projectName || data.bulletinname;
                            return _context2.abrupt('break', 39);

                          case 38:
                            return _context2.abrupt('break', 39);

                          case 39:
                            _context2.next = 41;
                            return Object(__WEBPACK_IMPORTED_MODULE_7__apis_bulletin__["d" /* getNoticeLinkCountJH */])(vm.tenderprojectcode);

                          case 41:
                            contRes = _context2.sent;

                            if (contRes) {
                              list = [];

                              for (key in contRes) {
                                if (Object.prototype.hasOwnProperty.call(contRes, key)) {
                                  list.push({
                                    key: key,
                                    count: contRes[key]
                                  });
                                }
                              }
                              vm.navDataList = list;
                            }

                          case 43:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 36:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    },


    /**
     * 获取微信公众号关注引导二维码
     */
    fetchWeChatOfficialAccountQrc: function fetchWeChatOfficialAccountQrc() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee4() {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Object(__WEBPACK_IMPORTED_MODULE_6__apis_weChat__["a" /* getQrcodeInWeChatGatewayAPI */])();

              case 2:
                _this3.weChatOffcialAccountQrcUrl = _context4.sent;

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this3);
      }))();
    }
  },

  /************************************* Life Cycles *************************************/
  created: function created() {
    var _this4 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee5() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this4.fetchData();

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this4);
    }))();
  },
  mounted: function mounted() {
    var _this5 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee6() {
      var vm;
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              vm = _this5;

              vm.fetchHTMLContent();
              // const fetchHTMLContent = vm.fetchHTMLContent();
              // const fetchWeChatOfficialAccountQrc = vm.fetchWeChatOfficialAccountQrc();

              // await Promise.all([fetchHTMLContent, fetchWeChatOfficialAccountQrc]);

              // // 当文章内容和微信公众号二维码都获取到以后，再显示二维码
              // // 检查二维码路径是否合法
              // if (
              //   typeof vm.weChatOffcialAccountQrcUrl === 'string' &&
              //   !vm.weChatOffcialAccountQrcUrl.startsWith(ERROR_MESSAGE_PREFIX)
              // ) {
              //   vm.isWeChatOfficialAccountQrcShow = true;
              // }

            case 2:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this5);
    }))();
  }
});

/***/ }),

/***/ "BO1k":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("fxRn"), __esModule: true };

/***/ }),

/***/ "CXw9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("O4g8");
var global = __webpack_require__("7KvD");
var ctx = __webpack_require__("+ZMJ");
var classof = __webpack_require__("RY/4");
var $export = __webpack_require__("kM2E");
var isObject = __webpack_require__("EqjI");
var aFunction = __webpack_require__("lOnJ");
var anInstance = __webpack_require__("2KxR");
var forOf = __webpack_require__("NWt+");
var speciesConstructor = __webpack_require__("t8x9");
var task = __webpack_require__("L42u").set;
var microtask = __webpack_require__("82Mu")();
var newPromiseCapabilityModule = __webpack_require__("qARP");
var perform = __webpack_require__("dNDb");
var userAgent = __webpack_require__("iUbK");
var promiseResolve = __webpack_require__("fJUb");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("dSzd")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("xH/j")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("e6n0")($Promise, PROMISE);
__webpack_require__("bRrM")(PROMISE);
Wrapper = __webpack_require__("FeBl")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("dY0y")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "D/3v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content-container"},[_c('div',{staticClass:"section width1000"},[_c('div',{staticClass:"registerTitle"},[_c('span',{staticClass:"registerTitleSpan lt"},[_vm._v("当前位置：")]),_vm._v(" "),_c('span',{staticClass:"registerTitleSpan lt"},[_vm._v("首页")]),_vm._v(" "),_c('span',{staticClass:"registerTitleSpan lt"},[_vm._v("> ")]),_vm._v(" "),_c('span',{staticClass:"registerTitleSpan lt",domProps:{"textContent":_vm._s(_vm.Title)}})]),_vm._v(" "),_c('div',[_c('noticeLinkNav',{attrs:{"dataList":_vm.navDataList,"linkType":'jh',"tenderprojectcode":_vm.tenderprojectcode}})],1),_vm._v(" "),_c('h1',{domProps:{"textContent":_vm._s(_vm.ProjectName)}}),_vm._v(" "),_c('div',{staticClass:"content-header"},[_c('div',{staticClass:"bulletin-info"},[(_vm.releaseInfo.updateTime)?_c('div',{staticClass:"info-item"},[_c('span',{staticClass:"item-label"},[_vm._v("发布日期：")]),_vm._v(" "),_c('span',{staticClass:"item-value"},[_vm._v(_vm._s(_vm.releaseInfo.updateTime))])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"info-item"},[_c('span',{staticClass:"item-label"},[_vm._v("发布媒介：")]),_vm._v(" "),_c('span',{staticClass:"item-value"},[_vm._v(_vm._s(_vm.releaseInfo.media))])]),_vm._v(" "),_c('div',{staticClass:"info-item"},[_c('span',{staticClass:"item-label"},[_vm._v("来源渠道：")]),_vm._v(" "),_c('span',{staticClass:"item-value"},[_vm._v(_vm._s(_vm.releaseInfo.channel))])])])]),_vm._v(" "),_c('div',{attrs:{"id":"content"}})]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.ShowDownloadUrl),expression:"ShowDownloadUrl"}],staticClass:"attachement"},[_c('a',{attrs:{"href":_vm.DownloadUrl}},[_vm._v("相关附件下载")])]),_vm._v(" "),_c('we-chat-official-account-qr-code',{attrs:{"qrcUrl":"/static/img/wechat_official_accounts_qrc.jpg"}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "D7YY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCMSContentListInSyncDataV10 */
/* unused harmony export getCMSContentInSyncDataV10 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAttachmentInSyncDataV10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getDownloadPDFInSyncDataV10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getSyncDataV10BulletinCountStatistic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getBulletinSearchAPIVisitByPC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getNoticeLinkCountJH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getNoticeLinkCountPT; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("PJh5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_common__ = __webpack_require__("XIuu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_js_http__ = __webpack_require__("/R87");


/**
 * 公告公示 - 工具发布 相关 API
 *
 * @author sun
 * @date 2019-09-04
 */






/**
 * 获取公告公示列表
 *
 * @export
 * @param {*} params
 * @returns
 */
var getCMSContentListInSyncDataV10 = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(params) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'SyncDataV10/cmsContent/query' + ('?pageSize=' + (params.pageSize || 20)) + ('&pageIndex=' + (params.pageIndex || 1)) + ('&categoryId=' + (params.categoryId || 88));


            if (params.industryName) {
              url += '&industryName=' + encodeURIComponent(params.industryName);
            }
            if (params.areaCode) {
              url += '&areaCode=' + params.areaCode;
            }
            if (params.keyWord) {
              url += '&keyWord=' + encodeURIComponent(params.keyWord);
            }
            if (params.dates >= 0) {
              url += '&dates=' + params.dates;
            } else if (params.startDate && params.endDate) {
              url += '&startDate=' + __WEBPACK_IMPORTED_MODULE_2_moment___default()(params.startDate).format(__WEBPACK_IMPORTED_MODULE_3__constants_common__["b" /* MOMENT_PARTIAL_FORMAT */]) + ('&endDate=' + __WEBPACK_IMPORTED_MODULE_2_moment___default()(params.endDate).format(__WEBPACK_IMPORTED_MODULE_3__constants_common__["b" /* MOMENT_PARTIAL_FORMAT */]));
            }
            _context.next = 7;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 7:
            return _context.abrupt('return', _context.sent);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCMSContentListInSyncDataV10(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 根据 bulletinID 获取公告数据
 *
 * @export
 * @param {string} bulletinID
 * @returns {bulletin} bulletin
 */
var getCMSContentInSyncDataV10 = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(bulletinID) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'SyncDataV10/cmsContent/BulletinId/' + bulletinID;
            _context2.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCMSContentInSyncDataV10(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 根据 bulletinID 获取公告的 application/x-shockwave-flash 格式文件路径
 *
 * @export
 * @param {string} bulletinID
 * @returns
 */
var getAttachmentInSyncDataV10 = function () {
  var _ref3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(bulletinID) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = 'SyncDataV10/attachment/bulletinId/' + bulletinID;
            _context3.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getAttachmentInSyncDataV10(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 根据 bulletinID 获取公告的 application/pdf 格式文件路径
 *
 * @export
 * @param {*} bulletinID
 * @returns
 */
var getDownloadPDFInSyncDataV10 = function () {
  var _ref4 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee4(bulletinID) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = 'SyncDataV10/DownloadPDF/BulletinId/' + bulletinID;
            _context4.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context4.abrupt('return', _context4.sent);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getDownloadPDFInSyncDataV10(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 获取公告统计数据
 * 
 * @export
 * @return {}
 */
var getSyncDataV10BulletinCountStatistic = function () {
  var _ref5 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee5() {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // const url = `SyncDataV10/BulletinCountStatistic`;
            url = "DataGatewayApi/BulletinCountStatistic";
            _context5.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getSyncDataV10BulletinCountStatistic() {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 统计公告访问次数
 * 工具发布
 * 
 * @param {string} bulletinID 公告ID
 */
var getBulletinSearchAPIVisitByPC = function () {
  var _ref6 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee6(bulletinID) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = 'BulletinSearchApi/visitByPc/UID/' + bulletinID;
            _context6.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context6.abrupt('return', _context6.sent);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getBulletinSearchAPIVisitByPC(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

// 获取当前项目的公告数量
// 交互发布使用
var getNoticeLinkCountJH = function () {
  var _ref7 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee7(tenderprojectcode) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = 'DataSyncApi/BulletinDetail/' + tenderprojectcode;
            _context7.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context7.abrupt('return', _context7.sent);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getNoticeLinkCountJH(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

// 获取当前项目的公告数量
// 平台发布使用
var getNoticeLinkCountPT = function () {
  var _ref8 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee8(data) {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = 'DataGatewayApi/getPublishedTenderBulletinCount?tenderProjectCode=' + data.tenderProjectCode;
            _context8.next = 3;
            return __WEBPACK_IMPORTED_MODULE_4__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_4__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context8.abrupt('return', _context8.sent);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getNoticeLinkCountPT(_x7) {
    return _ref8.apply(this, arguments);
  };
}();

/***/ }),

/***/ "DQCr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "EqBC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var global = __webpack_require__("7KvD");
var speciesConstructor = __webpack_require__("t8x9");
var promiseResolve = __webpack_require__("fJUb");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "FtD3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("t8qj");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "GHBc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "Gb6R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_index_js__ = __webpack_require__("86Fy");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b47cae5a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("D/3v");
function injectStyle (ssrContext) {
  __webpack_require__("cjCr")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b47cae5a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_index_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b47cae5a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "HhN8":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "J9QI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getQrcodeInWeChatGatewayAPI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_js_http__ = __webpack_require__("/R87");


/**
 * 微信相关 API
 *
 * @author sun
 * @date 2019-09-17
 */



/**
 * 获取微信公众号关注引导二维码
 *
 * @export
 * @returns
 */
var getQrcodeInWeChatGatewayAPI = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    var url;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'WechatGatewayApi/qrcode';
            _context.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__common_js_http__["e" /* default */].callAPI(url, __WEBPACK_IMPORTED_MODULE_2__common_js_http__["a" /* GET_METHOD */]);

          case 3:
            return _context.abrupt('return', _context.sent);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getQrcodeInWeChatGatewayAPI() {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "JP+z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "K6Zq":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("v70h");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("e3dc4c2a", content, true, {});

/***/ }),

/***/ "KCLY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("cGG2");
var normalizeHeaderName = __webpack_require__("5VQ+");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("7GwW");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__("7GwW");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("W2nU")))

/***/ }),

/***/ "L42u":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("+ZMJ");
var invoke = __webpack_require__("knuC");
var html = __webpack_require__("RPLV");
var cel = __webpack_require__("ON07");
var global = __webpack_require__("7KvD");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("R9M2")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "NWt+":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("+ZMJ");
var call = __webpack_require__("msXi");
var isArrayIter = __webpack_require__("Mhyx");
var anObject = __webpack_require__("77Pl");
var toLength = __webpack_require__("QRG4");
var getIterFn = __webpack_require__("3fs2");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "Re3r":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "TNV1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "TmV0":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fZOM");
module.exports = __webpack_require__("FeBl").Object.values;


/***/ }),

/***/ "U5ju":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("M6a0");
__webpack_require__("zQR9");
__webpack_require__("+tPU");
__webpack_require__("CXw9");
__webpack_require__("EqBC");
__webpack_require__("jKW+");
module.exports = __webpack_require__("FeBl").Promise;


/***/ }),

/***/ "VwqX":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".we-chat-official-account-qr-code-container[data-v-1b95ae78]{position:fixed;top:0;right:0;z-index:101;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:-200px;margin-right:-200px;padding:30px 40px;width:412px;font-family:simsun;text-align:center;background-color:rgba(0,0,0,.7)}.we-chat-official-account-qr-code-container .title[data-v-1b95ae78]{height:28px;overflow:hidden;font-size:24px;color:#fff;line-height:28px}.we-chat-official-account-qr-code-container .qr-code-image[data-v-1b95ae78]{-ms-flex-negative:0;flex-shrink:0;margin-top:24px;width:58%;height:auto}.we-chat-official-account-qr-code-container .logo-image-wrapper[data-v-1b95ae78]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:24px;width:100%;height:44px}.we-chat-official-account-qr-code-container .logo-image-wrapper .logo-image[data-v-1b95ae78]{-ms-flex-negative:0;flex-shrink:0;width:40px;height:auto}.we-chat-official-account-qr-code-container .logo-image-wrapper .site-name[data-v-1b95ae78]{font-size:20px;color:#fff;line-height:24px}.we-chat-official-account-qr-code-container .count-down[data-v-1b95ae78]{position:absolute;top:7px;right:41px;font-size:12px;color:#fff;line-height:16px}.we-chat-official-account-qr-code-container .close-panel[data-v-1b95ae78]{position:absolute;top:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:28px;height:28px;overflow:hidden;cursor:pointer}.we-chat-official-account-qr-code-container .close-panel .close-button[data-v-1b95ae78]{font-size:24px;color:#fff}.we-chat-official-account-qr-code-container.container-at-cornor[data-v-1b95ae78]{top:5px;right:5px;margin:0;padding:15px 16px;width:222px}.we-chat-official-account-qr-code-container.container-at-cornor .title[data-v-1b95ae78]{height:18px;font-size:14px;line-height:22px}.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper[data-v-1b95ae78]{height:24px}.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper .logo-image[data-v-1b95ae78]{width:24px}.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper .site-name[data-v-1b95ae78]{font-size:12px;line-height:16px}.we-chat-official-account-qr-code-container.container-hide[data-v-1b95ae78]{display:none}.we-chat-official-account-qr-code-enter[data-v-1b95ae78],.we-chat-official-account-qr-code-leave-to[data-v-1b95ae78]{opacity:0}", "", {"version":3,"sources":["/Users/qzw/Documents/project/PublicServiceWebSite/src/components/weChatOfficialAccountQrCode/index.scss"],"names":[],"mappings":"AACA,6DACE,eAAgB,AAChB,MAAO,AACP,QAAS,AACT,YAAa,AACb,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC1B,0BAA2B,AACvB,sBAAuB,AAC/B,uBAAwB,AACpB,oBAAqB,AACjB,2BAA4B,AACpC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,kBAAmB,AACnB,oBAAqB,AACrB,kBAAmB,AACnB,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,+BAAqC,CACtC,AACD,oEACI,YAAa,AACb,gBAAiB,AACjB,eAAgB,AAChB,WAAY,AACZ,gBAAkB,CACrB,AACD,4EACI,oBAAqB,AACjB,cAAe,AACnB,gBAAiB,AACjB,UAAW,AACX,WAAa,CAChB,AACD,iFACI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC3B,2BAA4B,AACxB,6BAA8B,AACtC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,gBAAiB,AACjB,WAAY,AACZ,WAAa,CAChB,AACD,6FACM,oBAAqB,AACjB,cAAe,AACnB,WAAY,AACZ,WAAa,CAClB,AACD,4FACM,eAAgB,AAChB,WAAY,AACZ,gBAAkB,CACvB,AACD,yEACI,kBAAmB,AACnB,QAAS,AACT,WAAY,AACZ,eAAgB,AAChB,WAAY,AACZ,gBAAkB,CACrB,AACD,0EACI,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,cAAgB,CACnB,AACD,wFACM,eAAgB,AAChB,UAAY,CACjB,AACD,iFACI,QAAS,AACT,UAAW,AACX,SAAU,AACV,kBAAmB,AACnB,WAAa,CAChB,AACD,wFACM,YAAa,AACb,eAAgB,AAChB,gBAAkB,CACvB,AACD,qGACM,WAAa,CAClB,AACD,iHACQ,UAAY,CACnB,AACD,gHACQ,eAAgB,AAChB,gBAAkB,CACzB,AACD,4EACI,YAAc,CACjB,AACD,qHAEE,SAAW,CACZ","file":"index.scss","sourcesContent":["\n.we-chat-official-account-qr-code-container[data-v-1b95ae78] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 101;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: -200px;\n  margin-right: -200px;\n  padding: 30px 40px;\n  width: 412px;\n  font-family: simsun;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n.we-chat-official-account-qr-code-container .title[data-v-1b95ae78] {\n    height: 28px;\n    overflow: hidden;\n    font-size: 24px;\n    color: #fff;\n    line-height: 28px;\n}\n.we-chat-official-account-qr-code-container .qr-code-image[data-v-1b95ae78] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    margin-top: 24px;\n    width: 58%;\n    height: auto;\n}\n.we-chat-official-account-qr-code-container .logo-image-wrapper[data-v-1b95ae78] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: space-evenly;\n        -ms-flex-pack: space-evenly;\n            justify-content: space-evenly;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-top: 24px;\n    width: 100%;\n    height: 44px;\n}\n.we-chat-official-account-qr-code-container .logo-image-wrapper .logo-image[data-v-1b95ae78] {\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n      width: 40px;\n      height: auto;\n}\n.we-chat-official-account-qr-code-container .logo-image-wrapper .site-name[data-v-1b95ae78] {\n      font-size: 20px;\n      color: #fff;\n      line-height: 24px;\n}\n.we-chat-official-account-qr-code-container .count-down[data-v-1b95ae78] {\n    position: absolute;\n    top: 7px;\n    right: 41px;\n    font-size: 12px;\n    color: #fff;\n    line-height: 16px;\n}\n.we-chat-official-account-qr-code-container .close-panel[data-v-1b95ae78] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 28px;\n    height: 28px;\n    overflow: hidden;\n    cursor: pointer;\n}\n.we-chat-official-account-qr-code-container .close-panel .close-button[data-v-1b95ae78] {\n      font-size: 24px;\n      color: #fff;\n}\n.we-chat-official-account-qr-code-container.container-at-cornor[data-v-1b95ae78] {\n    top: 5px;\n    right: 5px;\n    margin: 0;\n    padding: 15px 16px;\n    width: 222px;\n}\n.we-chat-official-account-qr-code-container.container-at-cornor .title[data-v-1b95ae78] {\n      height: 18px;\n      font-size: 14px;\n      line-height: 22px;\n}\n.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper[data-v-1b95ae78] {\n      height: 24px;\n}\n.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper .logo-image[data-v-1b95ae78] {\n        width: 24px;\n}\n.we-chat-official-account-qr-code-container.container-at-cornor .logo-image-wrapper .site-name[data-v-1b95ae78] {\n        font-size: 12px;\n        line-height: 16px;\n}\n.we-chat-official-account-qr-code-container.container-hide[data-v-1b95ae78] {\n    display: none;\n}\n.we-chat-official-account-qr-code-enter[data-v-1b95ae78],\n.we-chat-official-account-qr-code-leave-to[data-v-1b95ae78] {\n  opacity: 0;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "W/7t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_querystring__ = __webpack_require__("1nuA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_querystring__);



var currentEnv = window.location.hostname;
var protocol = window.location.protocol;
var origin = window.location.origin;
var devReg = /(localhost)|(192.168.[1]{1}.\d{1,3}$)/;
var testReg = /test.jszbtb.com/;

var IP_WR = '192.168.1.78'; // 王茹
var IP_WYL = '192.168.1.71'; // 王英良var
var IP_XZY = '192.168.1.84'; // 谢正宇
var IP = IP_XZY;

var TEST_API_HOST_NAME = 'https://testapi.jszbtb.com';
var PRODUCTION_API_HOST_NAME = 'https://api.jszbtb.com';

// var TEST_API_HOST_NAME = 'https://api.jszbtb.com';

__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.transformRequest = [function (data) {
	var queryStr = '';

	if (data) {
		if (data instanceof Object && data.toString() === '[object Object]') {
			if (data.params) {
				queryStr = __WEBPACK_IMPORTED_MODULE_1_querystring___default.a.stringify(data.params);
			} else {
				queryStr = __WEBPACK_IMPORTED_MODULE_1_querystring___default.a.stringify(data);
			}
		} else {
			console.error('接口传参为JSON,当前格式不符合！', data);
			throw data;
		}
	}

	return queryStr;
}];

/**
 * 获取当前环境下的 API hostname
 *
 * @returns {string} hostname of api
 */
function getApiHostName(url) {
	var hostname = '';
	if (devReg.test(currentEnv)) {
		// 开发环境
		if (url) {
			if (url.startsWith('PlatformApi')) {
				hostname = PRODUCTION_API_HOST_NAME;
			} else if (url.startsWith('SyncDataV10')) {
				hostname = 'http://' + IP + ':8089';
			} else if (url.startsWith('UserApi/')) {
				hostname = 'http://' + IP + ':9082';
			} else if (url.startsWith('ContentAPI/')) {
				hostname = 'http://' + IP + ':8084';
			} else {
				// hostname = `http://${IP}:8080`;
				hostname = TEST_API_HOST_NAME;
			}
		} else {
			hostname = TEST_API_HOST_NAME;
		}

		hostname = TEST_API_HOST_NAME;
		// hostname = PRODUCTION_API_HOST_NAME;
	} else if (testReg.test(currentEnv)) {

		// 测试环境
		hostname = TEST_API_HOST_NAME;
		// hostname = PRODUCTION_API_HOST_NAME;
	} else {
		// 正式环境
		hostname = PRODUCTION_API_HOST_NAME;
	}

	return hostname;
}

/* harmony default export */ __webpack_exports__["a"] = ({
	GetApiHostName: getApiHostName,
	axios: __WEBPACK_IMPORTED_MODULE_0_axios___default.a
});

/***/ }),

/***/ "XIuu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ERROR_MESSAGE_PREFIX; });
/* unused harmony export MOMENT_FULL_FORMAT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MOMENT_PARTIAL_FORMAT; });
/**
 * 通用常量
 *
 * @author sun
 * @date 2019-09-04
 */

// 错误信息统一前缀
var ERROR_MESSAGE_PREFIX = 'errorMessage: ';

// moment 时间格式 ———— 'YYYY-MM-DD HH:mm:ss'
var MOMENT_FULL_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// moment 时间格式 ———— 'YYYY-MM-DD'
var MOMENT_PARTIAL_FORMAT = 'YYYY-MM-DD';

/***/ }),

/***/ "Xd32":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("5PlU");


/***/ }),

/***/ "Xdzb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("l7Kp");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_25adb4ed_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("s8OP");
function injectStyle (ssrContext) {
  __webpack_require__("K6Zq")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_25adb4ed_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "XmWM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__("KCLY");
var utils = __webpack_require__("cGG2");
var InterceptorManager = __webpack_require__("fuGk");
var dispatchRequest = __webpack_require__("xLtR");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "Xxa5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1H6C");


/***/ }),

/***/ "ZBV/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: ''
    },
    changePage: {
      type: Function,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      currentIndex: 1,
      btnList: [],
      isCenter: false,
      lastActiveIndex: 0
    };
  },

  watch: {
    // 分页器初始化
    totalPage: {
      handler: function handler(totalPage) {
        var vm = this,
            k = 0,
            value = 1;
        if (vm.btnList.length > 0 && vm.btnList[vm.btnList.length - 1].value !== totalPage) {
          vm.btnList = [];
          vm.DrawPaginationInitStatus();
        }
        vm.btnList = [];
        // if(vm.btnList.length > 0) return
        vm.DrawPaginationInitStatus();
        if (totalPage > 0) vm.btnList[0].className = 'active';
      },
      immediate: true
    }
  },
  computed: {
    disabledPre: function disabledPre() {
      return this.currentIndex <= 1 ? true : false;
    },
    disabledNext: function disabledNext() {
      return this.currentIndex >= this.totalPage ? true : false;
    },
    paginationSize: function paginationSize() {
      return 'pagination-' + this.size;
    }
  },
  methods: {
    /**
     * @argument { status, index }
     * @param { status } 当前按钮的值
     * @param { index } 当前按钮的物理地址
     * @param { vm.currentIndex } 记录当前页号
     * @desc 修改页数的方式有三种，前一页、后一页、随意跳转
     * ***** 每一次切换页面都需要获得当前的页号以及当前按钮的物理地址，之后要做一次分页器的重绘
     */
    ChangePages: function ChangePages(status, index) {
      var vm = this;
      //  处理 '...'、'pre'、'next'
      if (typeof status === 'string') {
        if (status === '...') return;
        if (status === 'pre' && vm.currentIndex <= 1) return;else if (status === 'next' && vm.currentIndex >= vm.totalPage) return;
      }
      vm.ModifyStatus(status, index);
    },
    ModifyStatus: function ModifyStatus(status, index) {
      var vm = this;
      if (vm.btnList.length >= vm.lastActiveIndex) {
        vm.btnList[vm.lastActiveIndex].className = '';
      } else if (vm.btnList && vm.btnList.length > 0) {
        vm.btnList[index].className = '';
      }
      // vm.btnList[vm.lastActiveIndex].className = ''
      if (typeof status === 'string') {
        if (status === 'pre') {
          --vm.currentIndex;
          if (vm.currentIndex < 4 || vm.currentIndex > vm.totalPage - 5) --vm.lastActiveIndex;else vm.lastActiveIndex = 3;
        } else {
          ++vm.currentIndex;
          if (vm.currentIndex < 5 || vm.currentIndex > vm.totalPage - 3) ++vm.lastActiveIndex;else if (vm.currentIndex === vm.totalPage - 4) vm.lastActiveIndex = 2;else vm.lastActiveIndex = 3;
        }
      } else {
        vm.currentIndex = status;
        vm.lastActiveIndex = index;
      }
      vm.changePage(vm.currentIndex);
      vm.btnList = [];
      // 获得当前点击页,进行分页器重绘 vm.currentIndex >= 5 需要对分页器作出调整
      if (vm.currentIndex < 5) {
        vm.DrawPaginationInitStatus();
        // 状态重新定位
        vm.btnList[vm.lastActiveIndex].className = 'active';
      } else if (vm.currentIndex > vm.totalPage - 5) {
        vm.DrawPaginationEndStatus();
        // 状态重新定位
        vm.btnList[vm.lastActiveIndex].className = 'active';
      } else {
        vm.DrawPaginationCenterStatus();
        // 状态重新定位
        vm.btnList[3].className = 'active';
      }
    },
    DrawPaginationInitStatus: function DrawPaginationInitStatus() {
      var vm = this,
          k = 0,
          value = 1;
      while (k < vm.totalPage && k < 7) {
        if (k >= 5) value = k === 5 ? '...' : vm.totalPage;else value = k + 1;
        vm.btnList.push({
          index: k++,
          value: value,
          className: ''
        });
      }
    },
    DrawPaginationCenterStatus: function DrawPaginationCenterStatus(index) {
      var vm = this,
          k = 0,
          value = 1;
      while (k < 7) {
        if (k === 0) {
          value = 1;
        } else if (k === 1 || k === 5) {
          value = '...';
        } else if (k < 5 && k > 1) {
          value = vm.currentIndex + k - 3;
        } else {
          value = vm.totalPage;
        }
        vm.btnList.push({
          index: k++,
          value: value,
          className: ''
        });
      }
      vm.lastActiveIndex;
    },
    DrawPaginationEndStatus: function DrawPaginationEndStatus() {
      var vm = this,
          k = 0,
          value = 1;
      if (vm.totalPage > 5) {
        while (k < 7) {
          if (k === 0) value = 1;else if (k === 1) value = '...';else value = vm.totalPage + k - 6;
          vm.btnList.push({
            index: k++,
            value: value,
            className: ''
          });
        }
      } else {
        while (k < 5) {
          vm.btnList.push({
            index: k,
            value: k + 1,
            className: ''
          });
          k++;
        }
      }
    }
  },
  created: function created() {},
  mounted: function mounted() {}
});

/***/ }),

/***/ "aBzX":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("VwqX");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("28b67015", content, true, {});

/***/ }),

/***/ "bRrM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var dP = __webpack_require__("evD5");
var DESCRIPTORS = __webpack_require__("+E39");
var SPECIES = __webpack_require__("dSzd")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "cFc+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"we-chat-official-account-qr-code"}},[_c('div',{staticClass:"we-chat-official-account-qr-code-container container-at-cornor",class:{ "container-at-cornor": _vm.componentState === _vm.stateAtCornor, "container-hide": _vm.componentState === _vm.stateHide }},[_c('div',{staticClass:"title"},[_vm._v("\n            微信扫码，手机也能看公告\n        ")]),_vm._v(" "),_c('img',{staticClass:"qr-code-image",attrs:{"src":_vm.qrcUrl}}),_vm._v(" "),_c('div',{staticClass:"logo-image-wrapper"},[_c('img',{staticClass:"logo-image",attrs:{"src":"/static/img/logo.png"}}),_vm._v(" "),_c('span',{staticClass:"site-name"},[_vm._v("江苏省招标投标公共服务平台")])]),_vm._v(" "),(_vm.componentState === _vm.stateCentered)?_c('div',{staticClass:"count-down"},[_vm._v("\n            本广告将在（"+_vm._s(_vm.countDownSeconds)+"s）后关闭\n        ")]):_vm._e(),_vm._v(" "),(_vm.componentState === _vm.stateAtCornor)?_c('div',{staticClass:"close-panel",attrs:{"title":"关闭"},on:{"click":function($event){_vm.changeComponentState(_vm.stateHide)}}},[_c('Icon',{staticClass:"close-button",attrs:{"type":"ios-close"}})],1):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "cGG2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("JP+z");
var isBuffer = __webpack_require__("Re3r");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "cWxy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("dVOP");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "cjCr":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("yBRG");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("1be16c72", content, true, {});

/***/ }),

/***/ "d7EF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__("us/S");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__("BO1k");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),

/***/ "dIwP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "dNDb":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "dVOP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "exGp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),

/***/ "fJUb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var isObject = __webpack_require__("EqjI");
var newPromiseCapability = __webpack_require__("qARP");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "fZOM":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("kM2E");
var $values = __webpack_require__("mbce")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "fuGk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "fxRn":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("+tPU");
__webpack_require__("zQR9");
module.exports = __webpack_require__("g8Ux");


/***/ }),

/***/ "g8Ux":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var get = __webpack_require__("3fs2");
module.exports = __webpack_require__("FeBl").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "gRE1":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("TmV0"), __esModule: true };

/***/ }),

/***/ "hhm8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = pushRouterByRouteNameAndParams;
/* harmony export (immutable) */ __webpack_exports__["a"] = convertBase64ToBlob;
/* harmony export (immutable) */ __webpack_exports__["b"] = getAdvertisementPictureSource;
/**
 * Util Functions
 * 
 * @date 2019-07-25
 */

var currentEnv = window.location.hostname;
var devReg = /(localhost)|(192.168.[1]{1}.\d{1,3}$)/;
var testReg = /test.jszbtb.com/;

var IP_WR = '192.168.1.78'; // 王茹
var IP_WYL = '192.168.1.71'; // 王英良
var IP_XZY = '192.168.1.84'; // 谢正宇
var IP = IP_XZY;

var TEST_API_HOST_NAME = 'https://testapi.jszbtb.com';
var PRODUCTION_API_HOST_NAME = 'https://api.jszbtb.com';

var TEST_FILE_HOST_NAME = 'https://testfile.jszbtb.com';
var PRODUCTION_FILE_HOST_NAME = 'https://file.jszbtb.com';

/**
 * 路由跳转封装
 *
 * @export
 * @param {Vue} vm
 * @param {string} routeName
 * @param {Object} [routeParams={}]
 */
function pushRouterByRouteNameAndParams(vm, routeName) {
  var routeParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  vm.$router.push({
    name: routeName,
    params: routeParams,
    query: query
  });
};

/**
 * 将 base64 格式的数据转化为 blob 格式
 * @source https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 *
 * @export
 * @param {*} base64Data
 * @param {string} [contentType='']
 * @param {number} [sliceSize=512]
 * @returns
 */
function convertBase64ToBlob(base64Data) {
  var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sliceSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 512;

  var byteCharacters = atob(base64Data);
  var byteArrays = [];

  for (var offset = 0, len = byteCharacters.length; offset < len; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0, _len = slice.length; i < _len; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });

  return blob;
};

/**
 * 获取 广告图片 的地址
 * 主要为兼容 IE
 * 将带 query 的图片地址转换为静态地址
 *
 * @export
 * @param {string} imageUrl
 * @returns {string}
 */
function getAdvertisementPictureSource(imageUrl) {
  var url = '';

  if (devReg.test(currentEnv)) {
    // 开发环境
    url = imageUrl;
  } else if (testReg.test(currentEnv)) {
    // 测试环境
    var staticUrl = imageUrl.replace(TEST_API_HOST_NAME + '/ContentAPI/fileDown?filePath=', 'content');

    url = TEST_FILE_HOST_NAME + '/' + staticUrl;
  } else {
    // 正式环境
    var _staticUrl = imageUrl.replace(PRODUCTION_API_HOST_NAME + '/ContentAPI/fileDown?filePath=', 'content');

    url = PRODUCTION_FILE_HOST_NAME + '/' + _staticUrl;
  }

  return decodeURIComponent(url);
}

/***/ }),

/***/ "iUbK":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "jKW+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("kM2E");
var newPromiseCapability = __webpack_require__("qARP");
var perform = __webpack_require__("dNDb");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "kMPS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "knuC":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "l7Kp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values__ = __webpack_require__("gRE1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_js_config__ = __webpack_require__("W/7t");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_pagination_Pagination__ = __webpack_require__("xzFr");




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var axios = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].axios;
var apiHostName = __WEBPACK_IMPORTED_MODULE_4__common_js_config__["a" /* default */].GetApiHostName();
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    dataList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    linkType: {
      type: String,
      default: ""
    },
    tenderprojectcode: {
      type: [String, Number],
      default: ""
    }
  },
  components: {
    pagination: __WEBPACK_IMPORTED_MODULE_5__components_pagination_Pagination__["a" /* default */]
  },
  data: function data() {
    return {
      size: "",
      rowData: null,
      loading: false,
      page: 1,
      pageSize: 20,
      total: 0,
      totalPage: 0,
      bulletinList: [],
      noticeList: [],
      dialogShow: false,
      clickLabel: "",
      navList: [{
        label: "资格预审公告",
        key: "qualifyBulletinCount",
        count: 0,
        SearchType: 0,
        bulletinType: 0,
        categoryId: 92,
        disabled: false
      }, {
        label: "招标公告",
        key: "tenderBulletinCount",
        count: 0,
        SearchType: 1,
        bulletinType: 1,
        categoryId: 88,
        disabled: false
      }, {
        label: "中标候选人公示",
        key: "winCandidateBulletinCount",
        count: 0,
        SearchType: 2,
        bulletinType: 2,
        categoryId: 91,
        disabled: false
      }, {
        label: "结果公示",
        key: "winBidBulletinCount",
        SearchType: 3,
        bulletinType: 3,
        categoryId: 90,
        count: 0,
        disabled: false
      }, {
        label: "更正公告公示",
        key: "changeBulletinCount",
        count: 0,
        SearchType: 4,
        categoryId: 89,
        bulletinType: 4,
        disabled: false
      }],
      SearchTypeStr: ""
    };
  },

  watch: {
    dataList: {
      handler: function handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          this.updateNavList(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    updateNavList: function updateNavList(newList) {
      this.navList.forEach(function (item) {
        newList.forEach(function (nItem) {
          if (item.key === nItem.key) {
            item.count = nItem.count;
          }
        });
      });
    },

    // 点击数量按钮事件
    judgeAction: function judgeAction(rowData) {
      // 禁用，不执行
      if (rowData.disabled) {
        return;
      }
      // 没数量，不执行
      if (rowData.count === 0) {
        return;
      }
      // 初始化列表数据
      this.clickLabel = rowData.label;
      this.noticeList = [];
      this.bulletinList = [];
      this.page = 1;
      this.pageSize = 20;
      this.totalPage = 0;
      this.total = 0;
      this.rowData = rowData;
      // 查列表信息
      if (this.linkType === "pt") {
        // 平台发布列表
        this.fetchBulletinList(rowData.bulletinType, this.page);
      } else if (this.linkType === "jh") {
        // 交互发布列表
        this.GetTradingData(this.page, this.pageSize, rowData.SearchType);
      }
    },
    goDetail: function goDetail(item) {
      if (this.linkType === "pt") {
        var categoryName = "";
        var findRes = this.navList.find(function (fItem) {
          return fItem.bulletinType === item.bulletinType;
        });
        if (findRes) {
          categoryName = findRes.label;
        }
        this.handleBulletinTitleClick(categoryName, item.bulletinID || item.bulletinid, item.bulletinType,
        // item.projectNature,
        "", item.tenderProjectCode);
      } else if (this.linkType === "jh") {
        this.OpenDetail(item.id, item.SearchType, item.ReleaseDate, "");
      }
    },

    // 平台发布的详情
    handleBulletinTitleClick: function handleBulletinTitleClick(categoryName, bulletinID, bulletinType, projectNature, tenderProjectCode) {
      if (categoryName && bulletinID) {
        var url = "#/bulletinDetails/" + categoryName + "/" + bulletinID + "?bulletinType=" + bulletinType + "&tenderProjectCode=" + tenderProjectCode;
        window.open(url);
      }
    },

    // 平台发布获取列表
    fetchBulletinList: function fetchBulletinList(bulletinType, page) {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
        var query, res, result, bulletinList;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = {
                  bulletinType: bulletinType,
                  industryCode: "",
                  regionCode: "",
                  startTime: "",
                  endTime: "",
                  keyword: "",
                  currentPage: page,
                  pageSize: _this.pageSize,
                  // projectNature: this.$route.query.projectNature,
                  tenderProjectCode: _this.tenderprojectcode
                };

                _this.loading = true;
                _context.next = 4;
                return axios({
                  url: call.DataGatewayApi_PublishBulletins,
                  params: query
                });

              case 4:
                res = _context.sent;

                if (res.data.success) {
                  result = res.data.data || {};

                  _this.totalPage = result.totalPage || 0;
                  _this.total = result.totalCount || 0;
                  bulletinList = result.data || [];

                  _this.bulletinList = bulletinList.map(function (el) {
                    return {
                      title: el.bulletinName,
                      precise: el.industryName,
                      area: el.regionName,
                      sourceinfo: el.bulletinSourceName,
                      publishDate: el.noticeSendTime,
                      bidOpen: el.openBidTime,
                      bulletinid: el.bulletinID,
                      // categoryId: this.active_tab,
                      bulletinType: bulletinType,
                      oldBulletinName: el.oldBulletinName,
                      // projectNature: this.$route.query.projectNature,
                      tenderProjectCode: _this.tenderprojectcode
                    };
                  });
                  // 只有一条数据
                  if (_this.bulletinList && _this.bulletinList.length === 1) {
                    _this.goDetail(_this.bulletinList[0]);
                  } else if (_this.bulletinList && _this.bulletinList.length > 1) {
                    // 有多条数据
                    _this.dialogShow = true;
                  }
                  _this.loading = false;
                } else {
                  _this.bulletinList = [];
                  _this.totalPage = 0;
                  _this.total = 0;
                  _this.loading = false;
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    // 交互发布的详情
    OpenDetail: function OpenDetail(bulletinID, searchType, release, projectNature) {
      var parmes = {
        release: release
      };
      var releaseDateUrlCode = encodeURI(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(parmes));
      window.open(
      // `/#/bulletindetail/${searchType}/${bulletinID}?release=${releaseDateUrlCode}&projectNature=${projectNature}`
      "/#/bulletindetail/" + searchType + "/" + bulletinID + "?release=" + releaseDateUrlCode);
    },

    // 交互发布 获取列表
    GetTradingData: function GetTradingData(current, pagesize, SearchType) {
      var vm = this;
      var url = "";
      var queryString = {};
      queryString.PageSize = "PageSize=" + pagesize;
      queryString.CurrentPage = "CurrentPage=" + current;

      // 有些接口需要小写，兼容下
      queryString.pageSize = "pageSize=" + pagesize;
      queryString.currentPage = "currentPage=" + current;

      queryString.keyword = "Keyword=";
      // queryString.projectNature = `ProjectNature=`;
      // const id = this.$route.params.bulletinID;
      queryString.bulletinId = "tenderProjectCode=" + this.tenderprojectcode;
      var queryStringArr = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_values___default()(queryString);
      var param = queryStringArr.join("&");
      switch (SearchType) {
        case 0:
          // 资格预审公告
          vm.SearchTypeStr = "资格预审公告";
          url = apiHostName + "/DataSyncApi/HomeQulifyBulletin?" + param;
          vm.GetTradData(url, SearchType);
          break;
        case 1:
          // 招标公告
          vm.SearchTypeStr = "招标公告";
          url = apiHostName + "/DataSyncApi/HomeTenderBulletin?" + param;
          vm.GetTradData(url, SearchType);
          break;
        case 2:
          // 中标候选人公示
          vm.SearchTypeStr = "中标候选人公示";
          url = apiHostName + "/DataSyncApi/HomeWinCandidateBulletin?" + param;
          vm.GetTradData(url, SearchType);
          break;
        case 3:
          // 中标结果公示
          vm.SearchTypeStr = "结果公示";
          url = apiHostName + "/DataSyncApi/HomeWinBidBulletin?" + param;
          vm.GetTradData(url, SearchType);
          break;
        case 4:
          // 更正公告公示
          vm.SearchTypeStr = "更正公告公示";
          url = apiHostName + "/DataSyncApi/AmendBulletin?" + param;
          vm.GetTradData(url, SearchType);
          break;
        // case 5: // 招标计划公告
        //   vm.SearchTypeStr = "招标计划公告";
        //   url = `${apiHostName}/DataSyncApi/HomePlanBulletin?${param}`;
        //   vm.GetTradData(url,SearchType);
        //   break;
        // case 6: // 非公开招标理由公示
        //   vm.SearchTypeStr = "非公开招标理由公示";
        //   url = `${apiHostName}/DataSyncApi/HomePrivateBulletin?${param}`;
        //   vm.GetTradData(url,SearchType);
        //   break;
        default:
          break;
      }
    },

    // 交互发布 获取列表
    GetTradData: function GetTradData(url, SearchType) {
      var _this2 = this;

      var vm = this;
      this.loading = true;
      vm.noticeList = [];
      axios.get(url).then(function (result) {
        if (result.data.success) {
          for (var i = 0; i < result.data.data.data.length; i++) {
            var single = result.data.data.data[i];
            var trandData = null;
            var createdate = vm.getBuildTime(single);
            switch (SearchType) {
              case 0:
                trandData = {
                  name: single.bulletinName,
                  ReleaseDate: createdate,
                  id: single.id,
                  SearchType: "QulifyBulletin"
                };
                break;
              case 1:
                trandData = {
                  name: single.bulletinName,
                  ReleaseDate: createdate,
                  id: single.id,
                  SearchType: "TenderBulletin"
                };
                break;
              case 2:
                trandData = {
                  name: single.publicityName,
                  ReleaseDate: createdate,
                  id: single.id,
                  SearchType: "WinCandidateBulletin"
                };
                break;
              case 3:
                trandData = {
                  name: single.bulletinName,
                  ReleaseDate: createdate,
                  id: single.id,
                  SearchType: "WinBidBulletin"
                };
                break;
              case 4:
                trandData = {
                  name: single.bulletinName,
                  ReleaseDate: createdate,
                  id: single.id,
                  SearchType: "AmendBulletin"
                };
                break;
              // case 5:
              //   trandData = {
              //     name: single.bulletinName,
              //     ReleaseDate: createdate,
              //     id: single.id,
              //     SearchType: "PlanBulletin",
              //   };
              //   break;
              // case 6:
              //   trandData = {
              //     name: single.bulletinName,
              //     ReleaseDate: createdate,
              //     id: single.id,
              //     SearchType: "PrivateBulletinDetail",
              //   };
              //   break;
              default:
                break;
            }
            vm.noticeList.push(trandData);
          }
          vm.totalPage = result.data.data.totalPage;
          vm.total = result.data.data.totalNumber;
          if (vm.noticeList && vm.noticeList.length === 1) {
            // 判断数量，一条直接打开
            vm.goDetail(vm.noticeList[0]);
          } else if (vm.noticeList && vm.noticeList.length > 1) {
            // 多条展示弹框
            _this2.dialogShow = true;
          }
          _this2.loading = false;
        } else {
          _this2.loading = false;
        }
      });
    },

    // 交互发布
    // 获取发布日期
    getBuildTime: function getBuildTime(single) {
      // 获取发布时间数据
      var buildTime = single.amendbulletinissuetime;
      var createdate = ""; // 创建日期
      if (buildTime) {
        // 如果buildTime不为空，进行字符串拼接（发布日期）
        createdate = buildTime.slice(0, 4) + "-" + buildTime.slice(4, 6) + "-" + buildTime.slice(6, 8);
      } else {
        // 获取创建日期数据
        var createtime = single.create_time || "";
        createdate = createtime.split("T")[0];
        if (createtime.indexOf(" ") !== -1) {
          createdate = createtime.split(" ")[0];
        }
      }
      return createdate;
    },
    ChangePage: function ChangePage(pageNum) {
      if (this.linkType === "pt") {
        // 平台发布列表
        this.fetchBulletinList(this.rowData.bulletinType, pageNum);
      } else if (this.linkType === "jh") {
        // 交互发布列表
        this.GetTradingData(pageNum, this.pageSize, this.rowData.SearchType);
      }
    }
  }
});

/***/ }),

/***/ "mbce":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("+E39");
var getKeys = __webpack_require__("lktj");
var toIObject = __webpack_require__("TcQ7");
var isEnum = __webpack_require__("NpIQ").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "mtWM":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("tIFN");

/***/ }),

/***/ "mvHQ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("qkKv"), __esModule: true };

/***/ }),

/***/ "oJlt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "p1b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "pBtG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "pX7J":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("Xxa5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("exGp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


// 组件状态常量
var STATE_CENTERED = 'centered';
var STATE_AT_CORNOR = 'at-cornor';
var STATE_HIDE = 'hide';

// 倒计时间隔
var COUNT_DOWN_INTERVAL = 1000;
// 倒计时总时长
var COUNT_DOWN_DURATION = 5;

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    qrcUrl: {
      type: String,
      required: true,
      default: ''
    }
  },

  data: function data() {
    return {
      // 当前组件状态 'centered'|'at-corner'|'hide'
      componentState: '',
      stateCentered: STATE_CENTERED,
      stateAtCornor: STATE_AT_CORNOR,
      stateHide: STATE_HIDE,
      // 倒计时计数
      countDownSeconds: 0
    };
  },


  methods: {
    /************************************* Created & Mounted *************************************/
    /**
     * 初始化
     *
     * @init
     */
    fetchData: function fetchData() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var vm;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this;

                // vm.resetComponentState();

                vm.countDown();

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },


    /**
     * 初始化组件的状态变量
     *
     * @init
     */
    resetComponentState: function resetComponentState() {
      var vm = this;

      vm.componentState = STATE_CENTERED;
      vm.stateCentered = STATE_CENTERED;
      vm.stateAtCornor = STATE_AT_CORNOR;
      vm.stateHide = STATE_HIDE;
      vm.countDownSeconds = COUNT_DOWN_DURATION;
    },


    /**
     * 倒计时
     *
     * @init
     */
    countDown: function countDown() {
      var vm = this;

      setTimeout(function () {
        vm.countDownSeconds--;
        vm.checkCountDown();
      }, COUNT_DOWN_INTERVAL);
    },


    /**
     * 每倒计时一次，检查计时是否结束
     * 如果结束，改变组件状态为 STATE_AT_CORNOR
     * 如果不结束，继续倒计时
     *
     * @init
     */
    checkCountDown: function checkCountDown() {
      var vm = this;

      if (vm.countDownSeconds <= 0) {
        vm.changeComponentState(STATE_AT_CORNOR);
      } else {
        vm.countDown();
      }
    },


    /**
     * 改变组件状态
     * 根据不同的目标状态，决定不同的行为
     * 当前只根据状态不同，赋予最外层元素不同类名
     *
     * @init
     * @event
     * @param {STATE_CENTERED|STATE_AT_CORNOR|STATE_HIDE} state
     */
    changeComponentState: function changeComponentState(state) {
      var vm = this;

      vm.componentState = state;
    }
  },

  /************************************* Life Cycles *************************************/
  created: function created() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.fetchData();

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
});

/***/ }),

/***/ "pxG4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "qARP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("lOnJ");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "qRfI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "qkKv":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("FeBl");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "s8OP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"noticeLinkNavContainer"},[_c('div',{staticClass:"noticeLinkNavBox"},_vm._l((_vm.navList),function(item,index){return _c('div',{key:index,staticClass:"noticeLinkNavItem"},[_c('el-badge',{staticClass:"item-badge",attrs:{"hidden":item.count === 0,"value":item.count}},[_c('el-button',{class:{ btnDisabled: item.disabled },attrs:{"size":"small","disabled":item.disabled || _vm.loading},on:{"click":function($event){_vm.judgeAction(item)}}},[_vm._v("\n          "+_vm._s(item.label)+"\n        ")])],1)],1)})),_vm._v(" "),_c('el-dialog',{attrs:{"title":_vm.clickLabel,"visible":_vm.dialogShow,"width":"700px","destroy-on-close":true,"close-on-click-modal":false,"custom-class":"noticeLinkNavDialog"},on:{"update:visible":function($event){_vm.dialogShow=$event}}},[(_vm.loading)?_c('div',[_vm._v("加载中...")]):[(_vm.linkType === 'jh')?_c('div',{key:"jh",staticClass:"noticeContainer"},_vm._l((_vm.noticeList),function(item,index){return _c('div',{key:index,staticClass:"oneNoticeContainer"},[_c('span',{staticClass:"noticeName"},[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',{staticClass:"noticeDate"},[_vm._v(_vm._s(item.ReleaseDate))]),_vm._v(" "),_c('span',{staticClass:"noticeView",on:{"click":function($event){_vm.goDetail(item)}}},[_vm._v("查看")])])})):(_vm.linkType === 'pt')?_c('div',{key:"pt",staticClass:"noticeContainer"},_vm._l((_vm.bulletinList),function(item,index){return _c('div',{key:index,staticClass:"oneNoticeContainer"},[_c('span',{staticClass:"noticeName"},[_vm._v(_vm._s(item.title))]),_vm._v(" "),_c('span',{staticClass:"noticeDate"},[_vm._v(_vm._s(item.publishDate))]),_vm._v(" "),_c('span',{staticClass:"noticeView",on:{"click":function($event){_vm.goDetail(item)}}},[_vm._v("查看")])])})):_vm._e()],_vm._v(" "),_c('pagination',{attrs:{"size":_vm.size,"totalPage":_vm.totalPage,"changePage":_vm.ChangePage}})],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "t8qj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "t8x9":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("77Pl");
var aFunction = __webpack_require__("lOnJ");
var SPECIES = __webpack_require__("dSzd")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "tIFN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");
var bind = __webpack_require__("JP+z");
var Axios = __webpack_require__("XmWM");
var defaults = __webpack_require__("KCLY");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("dVOP");
axios.CancelToken = __webpack_require__("cWxy");
axios.isCancel = __webpack_require__("pBtG");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("pxG4");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "thJu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "us/S":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("Xd32"), __esModule: true };

/***/ }),

/***/ "v70h":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".noticeLinkNavContainer{margin-bottom:20px;text-align:center}.noticeLinkNavContainer .noticeLinkNavBox,.noticeLinkNavContainer .noticeLinkNavBox .noticeLinkNavItem{display:inline-block}.noticeLinkNavContainer .noticeLinkNavBox .noticeLinkNavItem:first-child .item-badge:before{content:\"\"}.noticeLinkNavContainer .noticeLinkNavBox .item-badge:before{content:\"\\B7\\B7\\B7\\B7\\B7\\B7\\B7\";color:#dbdbdb}.noticeLinkNavContainer .noticeLinkNavBox .item-badge .btnDisabled{background:#eee;color:#888}.noticeLinkNavDialog .noticeContainer{text-align:left;max-height:400px;overflow:auto}.noticeLinkNavDialog .noticeContainer .oneNoticeContainer{margin-bottom:20px;display:-webkit-box;display:-ms-flexbox;display:flex}.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeName{width:60%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:10px}.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeDate{width:30%;padding-right:10px}.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeView{width:10%;color:#409eff;cursor:pointer}", "", {"version":3,"sources":["/Users/qzw/Documents/project/PublicServiceWebSite/src/components/noticeLinkNav/index.vue"],"names":[],"mappings":"AAEA,wBACE,mBAAoB,AACpB,iBAAmB,CACpB,AAID,uGACM,oBAAsB,CAC3B,AACD,4FACM,UAAY,CACjB,AACD,6DACM,gCAAmB,AACnB,aAAe,CACpB,AACD,mEACM,gBAAoB,AACpB,UAAe,CACpB,AACD,sCACE,gBAAiB,AACjB,iBAAkB,AAClB,aAAe,CAChB,AACD,0DACI,mBAAoB,AACpB,oBAAqB,AACrB,oBAAqB,AACrB,YAAc,CACjB,AACD,sEACM,UAAW,AACX,gBAAiB,AACjB,uBAAwB,AACxB,mBAAoB,AACpB,kBAAoB,CACzB,AACD,sEACM,UAAW,AACX,kBAAoB,CACzB,AACD,sEACM,UAAW,AACX,cAAe,AACf,cAAgB,CACrB","file":"index.vue","sourcesContent":["\n@charset \"UTF-8\";\n.noticeLinkNavContainer {\n  margin-bottom: 20px;\n  text-align: center;\n}\n.noticeLinkNavContainer .noticeLinkNavBox {\n    display: inline-block;\n}\n.noticeLinkNavContainer .noticeLinkNavBox .noticeLinkNavItem {\n      display: inline-block;\n}\n.noticeLinkNavContainer .noticeLinkNavBox .noticeLinkNavItem:first-child .item-badge::before {\n      content: \"\";\n}\n.noticeLinkNavContainer .noticeLinkNavBox .item-badge::before {\n      content: \"·······\";\n      color: #dbdbdb;\n}\n.noticeLinkNavContainer .noticeLinkNavBox .item-badge .btnDisabled {\n      background: #eeeeee;\n      color: #888888;\n}\n.noticeLinkNavDialog .noticeContainer {\n  text-align: left;\n  max-height: 400px;\n  overflow: auto;\n}\n.noticeLinkNavDialog .noticeContainer .oneNoticeContainer {\n    margin-bottom: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeName {\n      width: 60%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding-right: 10px;\n}\n.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeDate {\n      width: 30%;\n      padding-right: 10px;\n}\n.noticeLinkNavDialog .noticeContainer .oneNoticeContainer .noticeView {\n      width: 10%;\n      color: #409eff;\n      cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "w3bJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.totalPage>0)?_c('nav',{staticClass:"navigation",attrs:{"aria-label":"Page navigation"}},[_c('ul',{staticClass:"pagination",class:_vm.paginationSize},[_c('li',{class:_vm.disabledPre ? 'disabled' : '',on:{"click":function($event){_vm.ChangePages('pre')}}},[_c('a',{attrs:{"aria-label":"Previous"}},[_c('span',{attrs:{"aria-hidden":false}},[_vm._v("«")])])]),_vm._v(" "),_vm._l((_vm.btnList),function(btn){return _c('li',{key:btn.index,class:btn.className,on:{"click":function($event){_vm.ChangePages(btn.value, btn.index)}}},[_c('span',{staticStyle:{"z-index":"0"},domProps:{"textContent":_vm._s(btn.value)}})])}),_vm._v(" "),_c('li',{class:_vm.disabledNext ? 'disabled' : '',on:{"click":function($event){_vm.ChangePages('next')}}},[_vm._m(0)])],2)]):_vm._e()}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{attrs:{"aria-label":"Next"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "xH/j":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("hJx8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "xLtR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("cGG2");
var transformData = __webpack_require__("TNV1");
var isCancel = __webpack_require__("pBtG");
var defaults = __webpack_require__("KCLY");
var isAbsoluteURL = __webpack_require__("dIwP");
var combineURLs = __webpack_require__("qRfI");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "xaZU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "xzFr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Pagination_vue__ = __webpack_require__("ZBV/");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4fab4370_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Pagination_vue__ = __webpack_require__("w3bJ");
function injectStyle (ssrContext) {
  __webpack_require__("66mf")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4fab4370"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Pagination_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4fab4370_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Pagination_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "yBRG":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".content-container .section[data-v-b47cae5a]{width:1002px;margin:0 auto 40px}.content-container .section .registerTitle[data-v-b47cae5a]{position:relative;height:30px;padding-left:10px;margin-bottom:20px;border:1px solid #d7d7d7;border-top:none;background:#eee}.content-container .section .registerTitleSpan[data-v-b47cae5a]{height:30px;line-height:30px;padding-right:5px;font-size:12px;font-family:Microsoft YaHei}.content-container .section .left[data-v-b47cae5a],.content-container .section .lt[data-v-b47cae5a]{float:left}.content-container .section h1[data-v-b47cae5a],.content-container .section h3[data-v-b47cae5a],.content-container .section h6[data-v-b47cae5a]{text-align:center}.content-container .section .aLink[data-v-b47cae5a]{margin-left:20px;cursor:pointer}.content-container .section .content-header[data-v-b47cae5a]{padding:18px 0 30px}.content-container .section .content-header .content-title[data-v-b47cae5a]{font-size:25px;font-weight:700;color:#333;text-align:center;line-height:42px}.content-container .section .content-header .bulletin-info[data-v-b47cae5a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-top:16px}.content-container .section .content-header .bulletin-info .info-item[data-v-b47cae5a]{padding:0 24px;color:#999}.content-container .attachement[data-v-b47cae5a]{margin:0 auto 40px;width:1020px;font-size:20px;color:#000}", "", {"version":3,"sources":["/Users/qzw/Documents/project/PublicServiceWebSite/src/pages/columns/bulletindetail/index.scss"],"names":[],"mappings":"AAcA,6CACE,aAAc,AACd,kBAAoB,CACrB,AACD,4DACI,kBAAmB,AACnB,YAAa,AACb,kBAAmB,AACnB,mBAAoB,AACpB,yBAA0B,AAC1B,gBAAiB,AACjB,eAAiB,CACpB,AACD,gEACI,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,2BAA+B,CAClC,AACD,oGAEI,UAAY,CACf,AACD,gJAEI,iBAAmB,CACtB,AACD,oDACI,iBAAkB,AAClB,cAAgB,CACnB,AACD,6DACI,mBAAqB,CACxB,AACD,4EACM,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,kBAAmB,AACnB,gBAAkB,CACvB,AACD,4EACM,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,gBAAkB,CACvB,AACD,uFACQ,eAAgB,AAChB,UAAY,CACnB,AACD,iDACE,mBAAoB,AACpB,aAAc,AACd,eAAgB,AAChB,UAAY,CACb","file":"index.scss","sourcesContent":["/**\n * scss variables\n *\n * @date 2019-09-04\n */\n/**\n * scss mixin\n */\n/**\n * flex center\n */\n/**\n * border-basic\n */\n.content-container .section[data-v-b47cae5a] {\n  width: 1002px;\n  margin: 0 auto 40px;\n}\n.content-container .section .registerTitle[data-v-b47cae5a] {\n    position: relative;\n    height: 30px;\n    padding-left: 10px;\n    margin-bottom: 20px;\n    border: 1px solid #d7d7d7;\n    border-top: none;\n    background: #eee;\n}\n.content-container .section .registerTitleSpan[data-v-b47cae5a] {\n    height: 30px;\n    line-height: 30px;\n    padding-right: 5px;\n    font-size: 12px;\n    font-family: 'Microsoft YaHei';\n}\n.content-container .section .lt[data-v-b47cae5a],\n  .content-container .section .left[data-v-b47cae5a] {\n    float: left;\n}\n.content-container .section h1[data-v-b47cae5a], .content-container .section h3[data-v-b47cae5a],\n  .content-container .section h6[data-v-b47cae5a] {\n    text-align: center;\n}\n.content-container .section .aLink[data-v-b47cae5a] {\n    margin-left: 20px;\n    cursor: pointer;\n}\n.content-container .section .content-header[data-v-b47cae5a] {\n    padding: 18px 0 30px;\n}\n.content-container .section .content-header .content-title[data-v-b47cae5a] {\n      font-size: 25px;\n      font-weight: 700;\n      color: #333;\n      text-align: center;\n      line-height: 42px;\n}\n.content-container .section .content-header .bulletin-info[data-v-b47cae5a] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      padding-top: 16px;\n}\n.content-container .section .content-header .bulletin-info .info-item[data-v-b47cae5a] {\n        padding: 0 24px;\n        color: #999;\n}\n.content-container .attachement[data-v-b47cae5a] {\n  margin: 0 auto 40px;\n  width: 1020px;\n  font-size: 20px;\n  color: #000;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "yFQF":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, ".navigation[data-v-4fab4370]{text-align:center}.navigation .pagination li[data-v-4fab4370]{cursor:pointer}", "", {"version":3,"sources":["/Users/qzw/Documents/project/PublicServiceWebSite/src/components/pagination/Pagination.vue"],"names":[],"mappings":"AACA,6BACE,iBAAmB,CACpB,AACD,4CACE,cAAgB,CACjB","file":"Pagination.vue","sourcesContent":["\n.navigation[data-v-4fab4370] {\n  text-align: center;\n}\n.navigation .pagination li[data-v-4fab4370] {\n  cursor: pointer;\n}"],"sourceRoot":""}]);

// exports


/***/ })

});