/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_data_fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/data_fetcher */ \"./src/scripts/data_fetcher.js\");\n/* harmony import */ var _scripts_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/view */ \"./src/scripts/view.js\");\n/* harmony import */ var _scripts_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/player */ \"./src/scripts/player.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  let view = new _scripts_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](); // debugger;\n\n  view.searchPlayer(\"Morant\");\n  view.searchPlayer(\"lebron\");\n  view.searchPlayer(\"carmelo\");\n  view.searchPlayer(\"garnett\");\n  view.searchPlayer(\"westbrook\");\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUdBRyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxNQUFNO0FBQ2hELE1BQUlDLElBQUksR0FBRyxJQUFJSixxREFBSixFQUFYLENBRGdELENBRWhEOztBQUNBSSxFQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0IsUUFBbEI7QUFDQUQsRUFBQUEsSUFBSSxDQUFDQyxZQUFMLENBQWtCLFFBQWxCO0FBQ0FELEVBQUFBLElBQUksQ0FBQ0MsWUFBTCxDQUFrQixTQUFsQjtBQUNBRCxFQUFBQSxJQUFJLENBQUNDLFlBQUwsQ0FBa0IsU0FBbEI7QUFDQUQsRUFBQUEsSUFBSSxDQUFDQyxZQUFMLENBQWtCLFdBQWxCO0FBQ0gsQ0FSRCIsInNvdXJjZXMiOlsid2VicGFjazovL05CQS1TdGF0LURhc2hib2FyZC8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhRmV0Y2hlciBmcm9tIFwiLi9zY3JpcHRzL2RhdGFfZmV0Y2hlclwiO1xuaW1wb3J0IFZpZXcgZnJvbSBcIi4vc2NyaXB0cy92aWV3XCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3NjcmlwdHMvcGxheWVyXCJcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldygpO1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgIHZpZXcuc2VhcmNoUGxheWVyKFwiTW9yYW50XCIpO1xuICAgIHZpZXcuc2VhcmNoUGxheWVyKFwibGVicm9uXCIpO1xuICAgIHZpZXcuc2VhcmNoUGxheWVyKFwiY2FybWVsb1wiKTtcbiAgICB2aWV3LnNlYXJjaFBsYXllcihcImdhcm5ldHRcIik7XG4gICAgdmlldy5zZWFyY2hQbGF5ZXIoXCJ3ZXN0YnJvb2tcIik7XG59KTsiXSwibmFtZXMiOlsiRGF0YUZldGNoZXIiLCJWaWV3IiwiUGxheWVyIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwidmlldyIsInNlYXJjaFBsYXllciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/data_fetcher.js":
/*!*************************************!*\
  !*** ./src/scripts/data_fetcher.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/scripts/view.js\");\n\n\nconst DataFetcher = {\n  getPlayer: async function (query) {\n    const response = await fetch(`/api?searchTerm=${encodeURIComponent(query)}`);\n\n    if (!response.ok) {\n      throw new Error('Network response was not ok');\n    }\n\n    const playerData = await response.json();\n    return playerData;\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataFetcher);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9kYXRhX2ZldGNoZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUVBLE1BQU1FLFdBQVcsR0FBRztBQUNoQkMsRUFBQUEsU0FBUyxFQUFFLGdCQUFlQyxLQUFmLEVBQXNCO0FBQzdCLFVBQU1DLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUUsbUJBQWtCQyxrQkFBa0IsQ0FBQ0gsS0FBRCxDQUFRLEVBQTlDLENBQTVCOztBQUNBLFFBQUksQ0FBQ0MsUUFBUSxDQUFDRyxFQUFkLEVBQWtCO0FBQ2QsWUFBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNIOztBQUNELFVBQU1DLFVBQVUsR0FBRyxNQUFNTCxRQUFRLENBQUNNLElBQVQsRUFBekI7QUFDQSxXQUFPRCxVQUFQO0FBQ0g7QUFSZSxDQUFwQjtBQVdBLCtEQUFlUixXQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTkJBLVN0YXQtRGFzaGJvYXJkLy4vc3JjL3NjcmlwdHMvZGF0YV9mZXRjaGVyLmpzPzc5NzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcidcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldydcblxuY29uc3QgRGF0YUZldGNoZXIgPSB7XG4gICAgZ2V0UGxheWVyOiBhc3luYyBmdW5jdGlvbihxdWVyeSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpP3NlYXJjaFRlcm09JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWApO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvaycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsYXllckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCkgXG4gICAgICAgIHJldHVybiBwbGF5ZXJEYXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUZldGNoZXI7Il0sIm5hbWVzIjpbIlBsYXllciIsIlZpZXciLCJEYXRhRmV0Y2hlciIsImdldFBsYXllciIsInF1ZXJ5IiwicmVzcG9uc2UiLCJmZXRjaCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm9rIiwiRXJyb3IiLCJwbGF5ZXJEYXRhIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/data_fetcher.js\n");

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Player; }\n/* harmony export */ });\nclass Player {\n  constructor(options) {\n    this.fname = options.first_name;\n    this.lname = options.last_name;\n    this.id = options.id;\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLE1BQU1BLE1BQU4sQ0FBYTtBQUN4QkMsRUFBQUEsV0FBVyxDQUFDQyxPQUFELEVBQVU7QUFDakIsU0FBS0MsS0FBTCxHQUFhRCxPQUFPLENBQUNFLFVBQXJCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhSCxPQUFPLENBQUNJLFNBQXJCO0FBQ0EsU0FBS0MsRUFBTCxHQUFVTCxPQUFPLENBQUNLLEVBQWxCO0FBQ0g7O0FBTHVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTkJBLVN0YXQtRGFzaGJvYXJkLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzPzY0NzEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZm5hbWUgPSBvcHRpb25zLmZpcnN0X25hbWU7XG4gICAgICAgIHRoaXMubG5hbWUgPSBvcHRpb25zLmxhc3RfbmFtZTtcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7IFxuICAgIH1cbn0iXSwibmFtZXMiOlsiUGxheWVyIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiZm5hbWUiLCJmaXJzdF9uYW1lIiwibG5hbWUiLCJsYXN0X25hbWUiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/scripts/player.js\n");

/***/ }),

/***/ "./src/scripts/view.js":
/*!*****************************!*\
  !*** ./src/scripts/view.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ View; }\n/* harmony export */ });\n/* harmony import */ var _data_fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data_fetcher */ \"./src/scripts/data_fetcher.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n\n\nclass View {\n  constructor() {\n    this.players = [];\n  }\n\n  addPlayer(player) {\n    this.players.push(player);\n  }\n\n  searchPlayer(query) {\n    _data_fetcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getPlayer(query).then(result => {\n      let playerData = result.data[0];\n      this.addPlayer(new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](playerData)); //Do whatever you need to do in here after player is saved\n\n      this.printPlayers();\n    });\n  }\n\n  printPlayers() {\n    console.log(this.players);\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy92aWV3LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFFZSxNQUFNRSxJQUFOLENBQVc7QUFDdEJDLEVBQUFBLFdBQVcsR0FBRztBQUNWLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0g7O0FBRURDLEVBQUFBLFNBQVMsQ0FBQ0MsTUFBRCxFQUFTO0FBQ2QsU0FBS0YsT0FBTCxDQUFhRyxJQUFiLENBQWtCRCxNQUFsQjtBQUNIOztBQUVERSxFQUFBQSxZQUFZLENBQUNDLEtBQUQsRUFBUTtBQUNoQlQsSUFBQUEsK0RBQUEsQ0FBc0JTLEtBQXRCLEVBQ0NFLElBREQsQ0FDTUMsTUFBTSxJQUFJO0FBQ1osVUFBSUMsVUFBVSxHQUFHRCxNQUFNLENBQUNFLElBQVAsQ0FBWSxDQUFaLENBQWpCO0FBQ0EsV0FBS1QsU0FBTCxDQUFlLElBQUlKLCtDQUFKLENBQVdZLFVBQVgsQ0FBZixFQUZZLENBSVo7O0FBQ0EsV0FBS0UsWUFBTDtBQUNILEtBUEQ7QUFRSDs7QUFFREEsRUFBQUEsWUFBWSxHQUFHO0FBQ1hDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtiLE9BQWpCO0FBQ0g7O0FBdEJxQiIsInNvdXJjZXMiOlsid2VicGFjazovL05CQS1TdGF0LURhc2hib2FyZC8uL3NyYy9zY3JpcHRzL3ZpZXcuanM/ODBjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YUZldGNoZXIgZnJvbSBcIi4vZGF0YV9mZXRjaGVyXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgfVxuXG4gICAgYWRkUGxheWVyKHBsYXllcikge1xuICAgICAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICAgIH1cblxuICAgIHNlYXJjaFBsYXllcihxdWVyeSkge1xuICAgICAgICBEYXRhRmV0Y2hlci5nZXRQbGF5ZXIocXVlcnkpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBsZXQgcGxheWVyRGF0YSA9IHJlc3VsdC5kYXRhWzBdO1xuICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXIobmV3IFBsYXllcihwbGF5ZXJEYXRhKSk7XG5cbiAgICAgICAgICAgIC8vRG8gd2hhdGV2ZXIgeW91IG5lZWQgdG8gZG8gaW4gaGVyZSBhZnRlciBwbGF5ZXIgaXMgc2F2ZWRcbiAgICAgICAgICAgIHRoaXMucHJpbnRQbGF5ZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaW50UGxheWVycygpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wbGF5ZXJzKTtcbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJEYXRhRmV0Y2hlciIsIlBsYXllciIsIlZpZXciLCJjb25zdHJ1Y3RvciIsInBsYXllcnMiLCJhZGRQbGF5ZXIiLCJwbGF5ZXIiLCJwdXNoIiwic2VhcmNoUGxheWVyIiwicXVlcnkiLCJnZXRQbGF5ZXIiLCJ0aGVuIiwicmVzdWx0IiwicGxheWVyRGF0YSIsImRhdGEiLCJwcmludFBsYXllcnMiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/view.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9OQkEtU3RhdC1EYXNoYm9hcmQvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;