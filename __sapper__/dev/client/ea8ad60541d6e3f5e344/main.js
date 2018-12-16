/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ea8ad60541d6e3f5e344";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + hotCurrentHash + "/" + ({"index":"index"}[chunkId]||chunkId) + "." + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "client/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/client.js")(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./__sapper__/client.js":
/*!******************************!*\
  !*** ./__sapper__/client.js ***!
  \******************************/
/*! exports provided: start, goto, prefetch, prefetchRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goto", function() { return goto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetch", function() { return prefetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetchRoutes", function() { return prefetchRoutes; });
/* harmony import */ var _src_routes_layout_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/routes/_layout.html */ "./src/routes/_layout.html");
/* harmony import */ var _src_routes_error_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/routes/_error.html */ "./src/routes/_error.html");
// This file is generated by Sapper — do not edit it!



function goto(href, opts = { replaceState: false }) {
    const target$$1 = select_route(new URL(href, document.baseURI));
    if (target$$1) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target$$1, null).then(() => { });
    }
    location.href = href;
    return new Promise(f => { }); // never resolves
}

const ignore = [];
const components = [
	{
		js: () => __webpack_require__.e(/*! import() | index */ "index").then(__webpack_require__.bind(null, /*! ../src/routes/index.html */ "./src/routes/index.html")),
		css: "__SAPPER_CSS_PLACEHOLDER:index.html__"
	}
];
const pages = [
	{
		// index.html
		pattern: /^\/?$/,
		parts: [
			{ i: 0 }
		]
	}
];
let ready = false;
let root_component;
let segments = [];
let current_token;
let root_preload;
let root_data;
const root_props = {
    path: null,
    params: null,
    query: null,
    child: {
        segment: null,
        component: null,
        props: {}
    }
};
let prefetching = null;
function set_prefetching(href, promise) {
    prefetching = { href, promise };
}
let store;
function set_store(fn) {
    store = fn(initial_data.store);
}
let target;
function set_target(element) {
    target = element;
}
let uid = 1;
function set_uid(n) {
    uid = n;
}
let cid;
function set_cid(n) {
    cid = n;
}
const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
const _history = typeof history !== 'undefined' ? history : {
    pushState: (state, title, href) => { },
    replaceState: (state, title, href) => { },
    scrollRestoration: ''
};
const scroll_history = {};
function select_route(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(initial_data.baseUrl))
        return null;
    const path = url.pathname.slice(initial_data.baseUrl.length);
    // avoid accidental clashes between server routes and pages
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < pages.length; i += 1) {
        const page = pages[i];
        const match = page.pattern.exec(path);
        if (match) {
            const query = Object.create(null);
            if (url.search.length > 0) {
                url.search.slice(1).split('&').forEach(searchParam => {
                    let [, key, value] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam));
                    value = (value || '').replace(/\+/g, ' ');
                    if (typeof query[key] === 'string')
                        query[key] = [query[key]];
                    if (typeof query[key] === 'object')
                        query[key].push(value);
                    else
                        query[key] = value;
                });
            }
            return { url, path, page, match, query };
        }
    }
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function navigate(target, id, noscroll, hash) {
    if (id) {
        // popstate or initial navigation
        cid = id;
    }
    else {
        const current_scroll = scroll_state();
        // clicked on a link. preserve scroll state
        scroll_history[cid] = current_scroll;
        id = cid = ++uid;
        scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
    }
    cid = id;
    if (root_component) {
        root_component.set({ preloading: true });
    }
    const loaded = prefetching && prefetching.href === target.url.href ?
        prefetching.promise :
        prepare_page(target);
    prefetching = null;
    const token = current_token = {};
    return loaded.then(({ redirect, data, nullable_depth }) => {
        if (redirect) {
            return goto(redirect.location, { replaceState: true });
        }
        render(data, nullable_depth, scroll_history[id], noscroll, hash, token);
        if (document.activeElement)
            document.activeElement.blur();
    });
}
function render(data, nullable_depth, scroll, noscroll, hash, token) {
    if (current_token !== token)
        return;
    if (root_component) {
        // first, clear out highest-level root component
        let level = data.child;
        for (let i = 0; i < nullable_depth; i += 1) {
            if (i === nullable_depth)
                break;
            level = level.props.child;
        }
        const { component } = level;
        level.component = null;
        root_component.set({ child: data.child });
        // then render new stuff
        level.component = component;
        root_component.set(data);
    }
    else {
        // first load — remove SSR'd <head> contents
        const start = document.querySelector('#sapper-head-start');
        const end = document.querySelector('#sapper-head-end');
        if (start && end) {
            while (start.nextSibling !== end)
                detach(start.nextSibling);
            detach(start);
            detach(end);
        }
        Object.assign(data, root_data);
        root_component = new _src_routes_layout_html__WEBPACK_IMPORTED_MODULE_0__["default"]({
            target,
            data,
            store,
            hydrate: true
        });
    }
    if (!noscroll) {
        if (hash) {
            // scroll is an element id (from a hash), we need to compute y.
            const deep_linked = document.querySelector(hash);
            if (deep_linked) {
                scroll = {
                    x: 0,
                    y: deep_linked.getBoundingClientRect().top
                };
            }
        }
        scroll_history[cid] = scroll;
        if (scroll)
            scrollTo(scroll.x, scroll.y);
    }
    Object.assign(root_props, data);
    ready = true;
}
function prepare_page(target) {
    const { page, path, query } = target;
    const new_segments = path.split('/').filter(Boolean);
    let changed_from = 0;
    while (segments[changed_from] &&
        new_segments[changed_from] &&
        segments[changed_from] === new_segments[changed_from])
        changed_from += 1;
    let redirect = null;
    let error = null;
    const preload_context = {
        store,
        fetch: (url, opts) => fetch(url, opts),
        redirect: (statusCode, location) => {
            if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                throw new Error(`Conflicting redirects`);
            }
            redirect = { statusCode, location };
        },
        error: (statusCode, message) => {
            error = { statusCode, message };
        }
    };
    if (!root_preload) {
        root_preload = _src_routes_layout_html__WEBPACK_IMPORTED_MODULE_0__["default"].preload
            ? initial_data.preloaded[0] || _src_routes_layout_html__WEBPACK_IMPORTED_MODULE_0__["default"].preload.call(preload_context, {
                path,
                query,
                params: {}
            })
            : {};
    }
    return Promise.all(page.parts.map((part, i) => {
        if (i < changed_from)
            return null;
        if (!part)
            return null;
        return load_component(components[part.i]).then(Component => {
            const req = {
                path,
                query,
                params: part.params ? part.params(target.match) : {}
            };
            let preloaded;
            if (ready || !initial_data.preloaded[i + 1]) {
                preloaded = Component.preload
                    ? Component.preload.call(preload_context, req)
                    : {};
            }
            else {
                preloaded = initial_data.preloaded[i + 1];
            }
            return Promise.resolve(preloaded).then(preloaded => {
                return { Component, preloaded };
            });
        });
    })).catch(err => {
        error = { statusCode: 500, message: err };
        return [];
    }).then(results => {
        if (root_data) {
            return results;
        }
        else {
            return Promise.resolve(root_preload).then(value => {
                root_data = value;
                return results;
            });
        }
    }).then(results => {
        if (redirect) {
            return { redirect };
        }
        segments = new_segments;
        const get_params = page.parts[page.parts.length - 1].params || (() => ({}));
        const params = get_params(target.match);
        if (error) {
            const props = {
                path,
                query,
                params,
                error: typeof error.message === 'string' ? new Error(error.message) : error.message,
                status: error.statusCode
            };
            return {
                data: Object.assign({}, props, {
                    preloading: false,
                    child: {
                        component: _src_routes_error_html__WEBPACK_IMPORTED_MODULE_1__["default"],
                        props
                    }
                })
            };
        }
        const props = { path, query, error: null, status: null };
        const data = {
            path,
            preloading: false,
            child: Object.assign({}, root_props.child, {
                segment: segments[0]
            })
        };
        if (changed(query, root_props.query))
            data.query = query;
        if (changed(params, root_props.params))
            data.params = params;
        let level = data.child;
        let nullable_depth = 0;
        for (let i = 0; i < page.parts.length; i += 1) {
            const part = page.parts[i];
            if (!part)
                continue;
            const get_params = part.params || (() => ({}));
            if (i < changed_from) {
                level.props.path = path;
                level.props.query = query;
                level.props.child = Object.assign({}, level.props.child);
                nullable_depth += 1;
            }
            else {
                level.component = results[i].Component;
                level.props = Object.assign({}, level.props, props, {
                    params: get_params(target.match),
                }, results[i].preloaded);
                level.props.child = {};
            }
            level = level.props.child;
            level.segment = segments[i + 1];
        }
        return { data, nullable_depth };
    });
}
function load_css(chunk) {
    const href = `client/${chunk}`;
    if (document.querySelector(`link[href="${href}"]`))
        return;
    return new Promise((fulfil, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => fulfil();
        link.onerror = reject;
        document.head.appendChild(link);
    });
}
function load_component(component) {
    // TODO this is temporary — once placeholders are
    // always rewritten, scratch the ternary
    const promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
    promises.unshift(component.js());
    return Promise.all(promises).then(values => values[0].default);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function changed(a, b) {
    return JSON.stringify(a) !== JSON.stringify(b);
}

function prefetch(href) {
    const target$$1 = select_route(new URL(href, document.baseURI));
    if (target$$1) {
        if (!prefetching || href !== prefetching.href) {
            set_prefetching(href, prepare_page(target$$1));
        }
        return prefetching.promise;
    }
}

function start(opts) {
    if ('scrollRestoration' in _history) {
        _history.scrollRestoration = 'manual';
    }
    set_target(opts.target);
    if (opts.store)
        set_store(opts.store);
    addEventListener('click', handle_click);
    addEventListener('popstate', handle_popstate);
    // prefetch
    addEventListener('touchstart', trigger_prefetch);
    addEventListener('mousemove', handle_mousemove);
    return Promise.resolve().then(() => {
        const { hash, href } = location;
        _history.replaceState({ id: uid }, '', href);
        if (!initial_data.error) {
            const target$$1 = select_route(new URL(location.href));
            if (target$$1)
                return navigate(target$$1, uid, false, hash);
        }
    });
}
let mousemove_timeout;
function handle_mousemove(event) {
    clearTimeout(mousemove_timeout);
    mousemove_timeout = setTimeout(() => {
        trigger_prefetch(event);
    }, 20);
}
function trigger_prefetch(event) {
    const a = find_anchor(event.target);
    if (!a || a.rel !== 'prefetch')
        return;
    prefetch(a.href);
}
function handle_click(event) {
    // Adapted from https://github.com/visionmedia/page.js
    // MIT license https://github.com/visionmedia/page.js#license
    if (which(event) !== 1)
        return;
    if (event.metaKey || event.ctrlKey || event.shiftKey)
        return;
    if (event.defaultPrevented)
        return;
    const a = find_anchor(event.target);
    if (!a)
        return;
    if (!a.href)
        return;
    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
    const href = String(svg ? a.href.baseVal : a.href);
    if (href === location.href) {
        if (!location.hash)
            event.preventDefault();
        return;
    }
    // Ignore if tag has
    // 1. 'download' attribute
    // 2. rel='external' attribute
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external')
        return;
    // Ignore if <a> has a target
    if (svg ? a.target.baseVal : a.target)
        return;
    const url = new URL(href);
    // Don't handle hash changes
    if (url.pathname === location.pathname && url.search === location.search)
        return;
    const target$$1 = select_route(url);
    if (target$$1) {
        const noscroll = a.hasAttribute('sapper-noscroll');
        navigate(target$$1, null, noscroll, url.hash);
        event.preventDefault();
        _history.pushState({ id: cid }, '', url.href);
    }
}
function which(event) {
    return event.which === null ? event.button : event.which;
}
function find_anchor(node) {
    while (node && node.nodeName.toUpperCase() !== 'A')
        node = node.parentNode; // SVG <a> elements have a lowercase name
    return node;
}
function handle_popstate(event) {
    scroll_history[cid] = scroll_state();
    if (event.state) {
        const url = new URL(location.href);
        const target$$1 = select_route(url);
        if (target$$1) {
            navigate(target$$1, event.state.id);
        }
        else {
            location.href = location.href;
        }
    }
    else {
        // hashchange
        set_uid(uid + 1);
        set_cid(uid);
        _history.replaceState({ id: cid }, '', location.href);
    }
}

function prefetchRoutes(pathnames) {
    return pages
        .filter(route => {
        if (!pathnames)
            return true;
        return pathnames.some(pathname => route.pattern.test(pathname));
    })
        .reduce((promise, route) => promise.then(() => {
        return Promise.all(route.parts.map(part => part && load_component(components[part.i])));
    }), Promise.resolve());
}




if (typeof window !== 'undefined') {
	__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./node_modules/sapper/sapper-dev-client.js */ "./node_modules/sapper/sapper-dev-client.js")).then(client => {
		client.connect(10000);
	});
}

/***/ }),

/***/ "./node_modules/svelte-dev-helper/index.js":
/*!*************************************************!*\
  !*** ./node_modules/svelte-dev-helper/index.js ***!
  \*************************************************/
/*! exports provided: Registry, configure, getConfig, createProxy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/proxy */ "./node_modules/svelte-dev-helper/lib/proxy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Registry", function() { return _lib_proxy__WEBPACK_IMPORTED_MODULE_0__["Registry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return _lib_proxy__WEBPACK_IMPORTED_MODULE_0__["configure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return _lib_proxy__WEBPACK_IMPORTED_MODULE_0__["getConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createProxy", function() { return _lib_proxy__WEBPACK_IMPORTED_MODULE_0__["createProxy"]; });



/***/ }),

/***/ "./node_modules/svelte-dev-helper/lib/proxy.js":
/*!*****************************************************!*\
  !*** ./node_modules/svelte-dev-helper/lib/proxy.js ***!
  \*****************************************************/
/*! exports provided: Registry, configure, getConfig, createProxy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProxy", function() { return createProxy; });
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registry */ "./node_modules/svelte-dev-helper/lib/registry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Registry", function() { return _registry__WEBPACK_IMPORTED_MODULE_0__["default"]; });



let proxyOptions = {
  noPreserveState: false
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getDebugName(id) {
  const posixID = id.replace(/[/\\]/g, '/');
  const name = posixID.split('/').pop().split('.').shift();
  return `<${capitalize(name)}>`;
}

function groupStart(msg) {
  console.group && console.group(msg);
}

function groupEnd() {
  console.groupEnd && console.groupEnd();
}




function configure(_options) {
  proxyOptions = Object.assign(proxyOptions, _options);
}

function getConfig() {
  return proxyOptions;
}

/*
creates a proxy object that
decorates the original component with trackers
and ensures resolution to the
latest version of the component
*/
function createProxy(id) {
  const handledMethods = '_mount,_unmount,destroy'.split(',');
  const forwardedMethods = 'get,fire,observe,on,set,teardown,_recompute,_set,_bind'.split(',');
  class proxyComponent {

    constructor(options) {
      this.id = id;
      this.__mountpoint = null;
      this.__anchor = null;
      this.__insertionPoint = null;
      this.__mounted = false;

      this._register(options);

      this._debugName = this.proxyTarget._debugName || getDebugName(this.id);

      // ---- forwarded methods ----
      const self = this;
      forwardedMethods.forEach(function(method) {
        self[method] = function() {
          return self.proxyTarget[method].apply(self.proxyTarget, arguments);
        };
      });
      // ---- END forwarded methods ----
    }

    // ---- augmented methods ----

    _mount(target, anchor, insertionPoint) {

      this.__mountpoint = target;
      this.__anchor = anchor;

      if (insertionPoint) {
        this.__insertionPoint = insertionPoint;
      } else {
        // eslint-disable-next-line no-undef
        this.__insertionPoint = document.createComment(this._debugName);
        target.insertBefore(this.__insertionPoint, anchor);
      }

      this.__insertionPoint.__component__ = this;

      anchor = this.__insertionPoint.nextSibling;

      if (target.nodeName == '#document-fragment' && insertionPoint) {
        //handles #4 by forcing a target
        //if original target was a document fragment
        target = this.__insertionPoint.parentNode;
      }

      this.__mounted = true;

      return this.proxyTarget._mount(target, anchor);
    }

    destroy(detach, keepInsertionPoint) {

      _registry__WEBPACK_IMPORTED_MODULE_0__["default"].deRegisterInstance(this);

      if (!keepInsertionPoint && this.__insertionPoint) {
        //deref for GC before removal of node
        this.__insertionPoint.__component__ = null;
        const ip = this.__insertionPoint;
        ip && ip.parentNode && ip.parentNode.removeChild(ip);
      }
      return this.proxyTarget.destroy(detach);
    }

    _unmount() {
      this.__mounted = false;
      return this.proxyTarget._unmount.apply(this.proxyTarget, arguments);
    }

    // ---- END augmented methods ----


    // ---- extra methods ----

    _register(options) {

      const record = _registry__WEBPACK_IMPORTED_MODULE_0__["default"].get(this.id);

      try {

        //resolve to latest version of component
        this.proxyTarget = new record.component(options);

      } catch (e) {

        const rb = record.rollback;

        if (!rb) {
          console.error(e);
          console.warn('Full reload required. Please fix component errors and reload the whole page');
          return;
        }

        groupStart(this._debugName + ' Errors');

        console.warn(e);
        console.warn(this._debugName + ' could not be hot-loaded because it has an error');

        //resolve to previous working version of component
        this.proxyTarget = new rb(options);
        console.info('%c' + this._debugName + ' rolled back to previous working version', 'color:green');

        //set latest version as the rolled-back version
        record.component = rb;

        groupEnd();

      }

      _registry__WEBPACK_IMPORTED_MODULE_0__["default"].set(this.id, record);

      //register current instance, so that
      //we can re-render it when required
      _registry__WEBPACK_IMPORTED_MODULE_0__["default"].registerInstance(this);

      //proxy custom methods
      const self = this;
      let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(self.proxyTarget));
      methods.forEach(function(method) {
        if (!handledMethods.includes(method) && !forwardedMethods.includes(method)) {
          self[method] = function() {
            return self.proxyTarget[method].apply(self.proxyTarget, arguments);
          };
        }
      });

      //(re)expose properties that might be used from outside
      this.refs = this.proxyTarget.refs || {};
      this._fragment = this.proxyTarget._fragment;
      this._slotted = this.proxyTarget._slotted;
      this.root = this.proxyTarget.root;
      this.store = this.proxyTarget.store || null;
    }

    _rerender() {
      const mountpoint = this.__mountpoint || null,
        anchor = this.__anchor || null,
        options = this.proxyTarget.options,
        oldstate = this.get(),
        isMounted = this.__mounted,
        insertionPoint = this.__insertionPoint,
        handlers = this.proxyTarget._handlers;

      this.destroy(true, true);

      this._register(options);

      //re-attach event handlers
      const self = this;
      for (const ev in handlers) {
        const _handlers = handlers[ev];
        _handlers.forEach (function(item) {
          if (item.toString().includes('component.fire(')) {
            self.proxyTarget.on(ev, item);
          }
        });
      }

      if (mountpoint && isMounted) {
        this.proxyTarget._fragment.c();
        this._mount(mountpoint, anchor, insertionPoint);

        //work around _checkReadOnly in svelte (for computed properties)
        this.proxyTarget._updatingReadonlyProperty = true;

        //preserve local state (unless noPreserveState is true)
        if (
          !this.proxyTarget.constructor.noPreserveState
          && !proxyOptions.noPreserveState) {

          //manually flush computations and re-render changes
          let changed = {};
          for (let k in oldstate) {
            changed[k] = true;
          }
          this.proxyTarget._recompute(changed, oldstate);
          this.proxyTarget._fragment && this.proxyTarget._fragment.p(changed, oldstate);

          //set old state back
          this.set(oldstate);

        } else {

          //we have to call .set() here
          //otherwise oncreate is not fired
          this.set(this.get());

        }

        this.proxyTarget._updatingReadonlyProperty = false;

      }
    }

    // ---- END extra methods ----
  }

  //forward static properties and methods
  const originalComponent = _registry__WEBPACK_IMPORTED_MODULE_0__["default"].get(id).component;
  for (let key in originalComponent) {
    proxyComponent[key] = originalComponent[key];
  }

  return proxyComponent;
}


/***/ }),

/***/ "./node_modules/svelte-dev-helper/lib/registry.js":
/*!********************************************************!*\
  !*** ./node_modules/svelte-dev-helper/lib/registry.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

class registry {
  constructor() {
    this._items = {};
  }

  set(k, v) {
    this._items[k] = Object.assign({
      rollback: null,
      component: null,
      instances: []
    }, v);
  }

  get(k) {
    return k ? this._items[k] || undefined : this._items;
  }

  registerInstance(instance) {
    const id = instance.id;
    this._items[id] && this._items[id].instances.push(instance);
  }

  deRegisterInstance(instance) {
    const id = instance.id;
    this._items[id] && this._items[id].instances.forEach(function(comp, idx, instances) {
      if (comp == instance) {
        instances.splice(idx, 1);
      }
    });
  }

}


// eslint-disable-next-line no-undef
const componentRegistry = (window.__SVELTE_REGISTRY__ = new registry);

/* harmony default export */ __webpack_exports__["default"] = (componentRegistry);

/***/ }),

/***/ "./node_modules/svelte-loader/lib/hot-api.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte-loader/lib/hot-api.js ***!
  \***************************************************/
/*! exports provided: configure, register, reload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reload", function() { return reload; });
/* harmony import */ var svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte-dev-helper */ "./node_modules/svelte-dev-helper/index.js");


let hotOptions = {
	noPreserveState: false
};

function configure(options) {
	hotOptions = Object.assign(hotOptions, options);
	Object(svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["configure"])(hotOptions);
}

function register(id, component) {

	//store original component in registry
	svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["Registry"].set(id, {
		rollback: null,
		component,
		instances: []
	});

	//create the proxy itself
	const proxy = Object(svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["createProxy"])(id);

	//patch the registry record with proxy constructor
	const record = svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["Registry"].get(id);
	record.proxy = proxy;
	svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["Registry"].set(id, record);

	return proxy;
}

function reload(id, component) {

	const record = svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["Registry"].get(id);

	//keep reference to previous version to enable rollback
	record.rollback = record.component;

	//replace component in registry with newly loaded component
	record.component = component;

	svelte_dev_helper__WEBPACK_IMPORTED_MODULE_0__["Registry"].set(id, record);

	//re-render the proxy instances
	record.instances.slice().forEach(function(instance) {
		instance && instance._rerender();
	});

	//return the original proxy constructor that was `register()`-ed
	return record.proxy;
}

/***/ }),

/***/ "./node_modules/svelte/shared.js":
/*!***************************************!*\
  !*** ./node_modules/svelte/shared.js ***!
  \***************************************/
/*! exports provided: blankObject, destroy, destroyDev, _differs, _differsImmutable, fire, flush, get, init, on, set, _set, _stage, setDev, callAll, _mount, PENDING, SUCCESS, FAILURE, removeFromStore, proto, protoDev, wrapAnimation, fixPosition, handlePromise, append, insert, detachNode, detachBetween, detachBefore, detachAfter, reinsertBetween, reinsertChildren, reinsertAfter, reinsertBefore, destroyEach, createFragment, createElement, createSvgElement, createText, createComment, addListener, removeListener, setAttribute, setAttributes, setCustomElementData, setXlinkAttribute, getBindingGroupValue, toNumber, timeRangesToArray, children, claimElement, claimText, setData, setInputType, setStyle, selectOption, selectOptions, selectValue, selectMultipleValue, addResizeListener, toggleClass, destroyBlock, outroAndDestroyBlock, fixAndOutroAndDestroyBlock, updateKeyedEach, measure, animate, getSpreadUpdate, invalidAttributeNameCharacter, spread, escaped, escape, each, missingComponent, validateSsrComponent, debug, linear, generateRule, hash, wrapTransition, outros, groupOutros, transitionManager, noop, assign, assignTrue, isPromise, callAfter, addLoc, exclude, run */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blankObject", function() { return blankObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy", function() { return destroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyDev", function() { return destroyDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_differs", function() { return _differs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_differsImmutable", function() { return _differsImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fire", function() { return fire; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_set", function() { return _set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_stage", function() { return _stage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDev", function() { return setDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callAll", function() { return callAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_mount", function() { return _mount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PENDING", function() { return PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCESS", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAILURE", function() { return FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFromStore", function() { return removeFromStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proto", function() { return proto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "protoDev", function() { return protoDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAnimation", function() { return wrapAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixPosition", function() { return fixPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePromise", function() { return handlePromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachNode", function() { return detachNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachBetween", function() { return detachBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachBefore", function() { return detachBefore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachAfter", function() { return detachAfter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reinsertBetween", function() { return reinsertBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reinsertChildren", function() { return reinsertChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reinsertAfter", function() { return reinsertAfter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reinsertBefore", function() { return reinsertBefore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyEach", function() { return destroyEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFragment", function() { return createFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSvgElement", function() { return createSvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createText", function() { return createText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComment", function() { return createComment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListener", function() { return addListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeListener", function() { return removeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttribute", function() { return setAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttributes", function() { return setAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomElementData", function() { return setCustomElementData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setXlinkAttribute", function() { return setXlinkAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBindingGroupValue", function() { return getBindingGroupValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNumber", function() { return toNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeRangesToArray", function() { return timeRangesToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "children", function() { return children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claimElement", function() { return claimElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claimText", function() { return claimText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInputType", function() { return setInputType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyle", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOption", function() { return selectOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectOptions", function() { return selectOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectValue", function() { return selectValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectMultipleValue", function() { return selectMultipleValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addResizeListener", function() { return addResizeListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyBlock", function() { return destroyBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outroAndDestroyBlock", function() { return outroAndDestroyBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixAndOutroAndDestroyBlock", function() { return fixAndOutroAndDestroyBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateKeyedEach", function() { return updateKeyedEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure", function() { return measure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpreadUpdate", function() { return getSpreadUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidAttributeNameCharacter", function() { return invalidAttributeNameCharacter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spread", function() { return spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escaped", function() { return escaped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "each", function() { return each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "missingComponent", function() { return missingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateSsrComponent", function() { return validateSsrComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRule", function() { return generateRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTransition", function() { return wrapTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outros", function() { return outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupOutros", function() { return groupOutros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitionManager", function() { return transitionManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignTrue", function() { return assignTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callAfter", function() { return callAfter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoc", function() { return addLoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exclude", function() { return exclude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function assignTrue(tar, src) {
	for (var k in src) tar[k] = 1;
	return tar;
}

function isPromise(value) {
	return value && typeof value.then === 'function';
}

function callAfter(fn, i) {
	if (i === 0) fn();
	return () => {
		if (!--i) fn();
	};
}

function addLoc(element, file, line, column, char) {
	element.__svelte_meta = {
		loc: { file, line, column, char }
	};
}

function exclude(src, prop) {
	const tar = {};
	for (const k in src) k === prop || (tar[k] = src[k]);
	return tar;
}

function run(fn) {
	fn();
}

function append(target, node) {
	target.appendChild(node);
}

function insert(target, node, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function detachBefore(after) {
	while (after.previousSibling) {
		after.parentNode.removeChild(after.previousSibling);
	}
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertBetween(before, after, target) {
	while (before.nextSibling && before.nextSibling !== after) {
		target.appendChild(before.parentNode.removeChild(before.nextSibling));
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function reinsertAfter(before, target) {
	while (before.nextSibling) target.appendChild(before.nextSibling);
}

function reinsertBefore(after, target) {
	var parent = after.parentNode;
	while (parent.firstChild !== after) target.appendChild(parent.firstChild);
}

function destroyEach(iterations, detach) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detach);
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler, options) {
	node.addEventListener(event, handler, options);
}

function removeListener(node, event, handler, options) {
	node.removeEventListener(event, handler, options);
}

function setAttribute(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else node.setAttribute(attribute, value);
}

function setAttributes(node, attributes) {
	for (var key in attributes) {
		if (key === 'style') {
			node.style.cssText = attributes[key];
		} else if (key in node) {
			node[key] = attributes[key];
		} else {
			setAttribute(node, key, attributes[key]);
		}
	}
}

function setCustomElementData(node, prop, value) {
	if (prop in node) {
		node[prop] = value;
	} else {
		setAttribute(node, prop, value);
	}
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function getBindingGroupValue(group) {
	var value = [];
	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.push(group[i].__value);
	}
	return value;
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function timeRangesToArray(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

function children (element) {
	return Array.from(element.childNodes);
}

function claimElement (nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText (nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function setData(text, data) {
	text.data = '' + data;
}

function setInputType(input, type) {
	try {
		input.type = type;
	} catch (e) {}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function selectOption(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];

		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
}

function selectOptions(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

function selectValue(select) {
	var selectedOption = select.querySelector(':checked') || select.options[0];
	return selectedOption && selectedOption.__value;
}

function selectMultipleValue(select) {
	return [].map.call(select.querySelectorAll(':checked'), function(option) {
		return option.__value;
	});
}

function addResizeListener(element, fn) {
	if (getComputedStyle(element).position === 'static') {
		element.style.position = 'relative';
	}

	const object = document.createElement('object');
	object.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
	object.type = 'text/html';

	let win;

	object.onload = () => {
		win = object.contentDocument.defaultView;
		win.addEventListener('resize', fn);
	};

	if (/Trident/.test(navigator.userAgent)) {
		element.appendChild(object);
		object.data = 'about:blank';
	} else {
		object.data = 'about:blank';
		element.appendChild(object);
	}

	return {
		cancel: () => {
			win && win.removeEventListener && win.removeEventListener('resize', fn);
			element.removeChild(object);
		}
	};
}

function toggleClass(element, name, toggle) {
	element.classList[toggle ? 'add' : 'remove'](name);
}

function linear(t) {
	return t;
}

function generateRule({ a, b, delta, duration }, ease, fn) {
	const step = 16.666 / duration;
	let keyframes = '{\n';

	for (let p = 0; p <= 1; p += step) {
		const t = a + delta * ease(p);
		keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	}

	return keyframes + `100% {${fn(b, 1 - b)}}\n}`;
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}

function wrapTransition(component, node, fn, params, intro) {
	let obj = fn.call(component, node, params);
	let duration;
	let ease;
	let cssText;

	let initialised = false;

	return {
		t: intro ? 0 : 1,
		running: false,
		program: null,
		pending: null,

		run(b, callback) {
			if (typeof obj === 'function') {
				transitionManager.wait().then(() => {
					obj = obj();
					this._run(b, callback);
				});
			} else {
				this._run(b, callback);
			}
		},

		_run(b, callback) {
			duration = obj.duration || 300;
			ease = obj.easing || linear;

			const program = {
				start: window.performance.now() + (obj.delay || 0),
				b,
				callback: callback || noop
			};

			if (intro && !initialised) {
				if (obj.css && obj.delay) {
					cssText = node.style.cssText;
					node.style.cssText += obj.css(0, 1);
				}

				if (obj.tick) obj.tick(0, 1);
				initialised = true;
			}

			if (!b) {
				program.group = outros.current;
				outros.current.remaining += 1;
			}

			if (obj.delay) {
				this.pending = program;
			} else {
				this.start(program);
			}

			if (!this.running) {
				this.running = true;
				transitionManager.add(this);
			}
		},

		start(program) {
			component.fire(`${program.b ? 'intro' : 'outro'}.start`, { node });

			program.a = this.t;
			program.delta = program.b - program.a;
			program.duration = duration * Math.abs(program.b - program.a);
			program.end = program.start + program.duration;

			if (obj.css) {
				if (obj.delay) node.style.cssText = cssText;

				const rule = generateRule(program, ease, obj.css);
				transitionManager.addRule(rule, program.name = '__svelte_' + hash(rule));

				node.style.animation = (node.style.animation || '')
					.split(', ')
					.filter(anim => anim && (program.delta < 0 || !/__svelte/.test(anim)))
					.concat(`${program.name} ${program.duration}ms linear 1 forwards`)
					.join(', ');
			}

			this.program = program;
			this.pending = null;
		},

		update(now) {
			const program = this.program;
			if (!program) return;

			const p = now - program.start;
			this.t = program.a + program.delta * ease(p / program.duration);
			if (obj.tick) obj.tick(this.t, 1 - this.t);
		},

		done() {
			const program = this.program;
			this.t = program.b;

			if (obj.tick) obj.tick(this.t, 1 - this.t);

			component.fire(`${program.b ? 'intro' : 'outro'}.end`, { node });

			if (!program.b && !program.invalidated) {
				program.group.callbacks.push(() => {
					program.callback();
					if (obj.css) transitionManager.deleteRule(node, program.name);
				});

				if (--program.group.remaining === 0) {
					program.group.callbacks.forEach(run);
				}
			} else {
				if (obj.css) transitionManager.deleteRule(node, program.name);
			}

			this.running = !!this.pending;
		},

		abort(reset) {
			if (this.program) {
				if (reset && obj.tick) obj.tick(1, 0);
				if (obj.css) transitionManager.deleteRule(node, this.program.name);
				this.program = this.pending = null;
				this.running = false;
			}
		},

		invalidate() {
			if (this.program) {
				this.program.invalidated = true;
			}
		}
	};
}

let outros = {};

function groupOutros() {
	outros.current = {
		remaining: 0,
		callbacks: []
	};
}

var transitionManager = {
	running: false,
	transitions: [],
	bound: null,
	stylesheet: null,
	activeRules: {},
	promise: null,

	add(transition) {
		this.transitions.push(transition);

		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
		}
	},

	addRule(rule, name) {
		if (!this.stylesheet) {
			const style = createElement('style');
			document.head.appendChild(style);
			transitionManager.stylesheet = style.sheet;
		}

		if (!this.activeRules[name]) {
			this.activeRules[name] = true;
			this.stylesheet.insertRule(`@keyframes ${name} ${rule}`, this.stylesheet.cssRules.length);
		}
	},

	next() {
		this.running = false;

		const now = window.performance.now();
		let i = this.transitions.length;

		while (i--) {
			const transition = this.transitions[i];

			if (transition.program && now >= transition.program.end) {
				transition.done();
			}

			if (transition.pending && now >= transition.pending.start) {
				transition.start(transition.pending);
			}

			if (transition.running) {
				transition.update(now);
				this.running = true;
			} else if (!transition.pending) {
				this.transitions.splice(i, 1);
			}
		}

		if (this.running) {
			requestAnimationFrame(this.bound);
		} else if (this.stylesheet) {
			let i = this.stylesheet.cssRules.length;
			while (i--) this.stylesheet.deleteRule(i);
			this.activeRules = {};
		}
	},

	deleteRule(node, name) {
		node.style.animation = node.style.animation
			.split(', ')
			.filter(anim => anim && anim.indexOf(name) === -1)
			.join(', ');
	},

	wait() {
		if (!transitionManager.promise) {
			transitionManager.promise = Promise.resolve();
			transitionManager.promise.then(() => {
				transitionManager.promise = null;
			});
		}

		return transitionManager.promise;
	}
};

function wrapAnimation(node, from, fn, params) {
	if (!from) return;

	const to = node.getBoundingClientRect();
	if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) return;

	const info = fn(node, { from, to }, params);

	const duration = 'duration' in info ? info.duration : 300;
	const delay = 'delay' in info ? info.delay : 0;
	const ease = info.easing || linear;
	const start = window.performance.now() + delay;
	const end = start + duration;

	const program = {
		a: 0,
		t: 0,
		b: 1,
		delta: 1,
		duration,
		start,
		end
	};

	const cssText = node.style.cssText;

	const animation = {
		pending: delay ? program : null,
		program: delay ? null : program,
		running: true,

		start() {
			if (info.css) {
				if (delay) node.style.cssText = cssText;

				const rule = generateRule(program, ease, info.css);
				program.name = `__svelte_${hash(rule)}`;

				transitionManager.addRule(rule, program.name);

				node.style.animation = (node.style.animation || '')
					.split(', ')
					.filter(anim => anim && (program.delta < 0 || !/__svelte/.test(anim)))
					.concat(`${program.name} ${program.duration}ms linear 1 forwards`)
					.join(', ');
			}

			animation.program = program;
			animation.pending = null;
		},

		update: now => {
			const p = now - program.start;
			const t = program.a + program.delta * ease(p / program.duration);
			if (info.tick) info.tick(t, 1 - t);
		},

		done() {
			if (info.tick) info.tick(1, 0);
			animation.stop();
		},

		stop() {
			if (info.css) transitionManager.deleteRule(node, program.name);
			animation.running = false;
		}
	};

	transitionManager.add(animation);

	if (info.tick) info.tick(0, 1);

	if (delay) {
		if (info.css) node.style.cssText += info.css(0, 1);
	} else {
		animation.start();
	}

	return animation;
}

function fixPosition(node) {
	const style = getComputedStyle(node);

	if (style.position !== 'absolute' && style.position !== 'fixed') {
		const { width, height } = style;
		const a = node.getBoundingClientRect();
		node.style.position = 'absolute';
		node.style.width = width;
		node.style.height = height;
		const b = node.getBoundingClientRect();

		if (a.left !== b.left || a.top !== b.top) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
		}
	}
}

function handlePromise(promise, info) {
	var token = info.token = {};

	function update(type, index, key, value) {
		if (info.token !== token) return;

		info.resolved = key && { [key]: value };

		const child_ctx = assign(assign({}, info.ctx), info.resolved);
		const block = type && (info.current = type)(info.component, child_ctx);

		if (info.block) {
			if (info.blocks) {
				info.blocks.forEach((block, i) => {
					if (i !== index && block) {
						groupOutros();
						block.o(() => {
							block.d(1);
							info.blocks[i] = null;
						});
					}
				});
			} else {
				info.block.d(1);
			}

			block.c();
			block[block.i ? 'i' : 'm'](info.mount(), info.anchor);

			info.component.root.set({}); // flush any handlers that were created
		}

		info.block = block;
		if (info.blocks) info.blocks[index] = block;
	}

	if (isPromise(promise)) {
		promise.then(value => {
			update(info.then, 1, info.value, value);
		}, error => {
			update(info.catch, 2, info.error, error);
		});

		// if we previously had a then/catch block, destroy it
		if (info.current !== info.pending) {
			update(info.pending, 0);
			return true;
		}
	} else {
		if (info.current !== info.then) {
			update(info.then, 1, info.value, promise);
			return true;
		}

		info.resolved = { [info.value]: promise };
	}
}

function destroyBlock(block, lookup) {
	block.d(1);
	lookup[block.key] = null;
}

function outroAndDestroyBlock(block, lookup) {
	block.o(function() {
		destroyBlock(block, lookup);
	});
}

function fixAndOutroAndDestroyBlock(block, lookup) {
	block.f();
	outroAndDestroyBlock(block, lookup);
}

function updateKeyedEach(old_blocks, component, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, intro_method, next, get_context) {
	var o = old_blocks.length;
	var n = list.length;

	var i = o;
	var old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;

	var new_blocks = [];
	var new_lookup = {};
	var deltas = {};

	var i = n;
	while (i--) {
		var child_ctx = get_context(ctx, list, i);
		var key = get_key(child_ctx);
		var block = lookup[key];

		if (!block) {
			block = create_each_block(component, key, child_ctx);
			block.c();
		} else if (dynamic) {
			block.p(changed, child_ctx);
		}

		new_blocks[i] = new_lookup[key] = block;

		if (key in old_indexes) deltas[key] = Math.abs(i - old_indexes[key]);
	}

	var will_move = {};
	var did_move = {};

	function insert(block) {
		block[intro_method](node, next);
		lookup[block.key] = block;
		next = block.first;
		n--;
	}

	while (o && n) {
		var new_block = new_blocks[n - 1];
		var old_block = old_blocks[o - 1];
		var new_key = new_block.key;
		var old_key = old_block.key;

		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		}

		else if (!new_lookup[old_key]) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		}

		else if (!lookup[new_key] || will_move[new_key]) {
			insert(new_block);
		}

		else if (did_move[old_key]) {
			o--;

		} else if (deltas[new_key] > deltas[old_key]) {
			did_move[new_key] = true;
			insert(new_block);

		} else {
			will_move[old_key] = true;
			o--;
		}
	}

	while (o--) {
		var old_block = old_blocks[o];
		if (!new_lookup[old_block.key]) destroy(old_block, lookup);
	}

	while (n) insert(new_blocks[n - 1]);

	return new_blocks;
}

function measure(blocks) {
	const rects = {};
	let i = blocks.length;
	while (i--) rects[blocks[i].key] = blocks[i].node.getBoundingClientRect();
	return rects;
}

function animate(blocks, rects, fn, params) {
	let i = blocks.length;
	while (i--) {
		const block = blocks[i];
		const from = rects[block.key];

		if (!from) continue;
		const to = block.node.getBoundingClientRect();

		if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom) continue;


	}
}

function getSpreadUpdate(levels, updates) {
	var update = {};

	var to_null_out = {};
	var accounted_for = {};

	var i = levels.length;
	while (i--) {
		var o = levels[i];
		var n = updates[i];

		if (n) {
			for (var key in o) {
				if (!(key in n)) to_null_out[key] = 1;
			}

			for (var key in n) {
				if (!accounted_for[key]) {
					update[key] = n[key];
					accounted_for[key] = 1;
				}
			}

			levels[i] = n;
		} else {
			for (var key in o) {
				accounted_for[key] = 1;
			}
		}
	}

	for (var key in to_null_out) {
		if (!(key in update)) update[key] = undefined;
	}

	return update;
}

// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
const invalidAttributeNameCharacter = /[\s'">\/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;

function spread(args) {
	const attributes = Object.assign({}, ...args);
	let str = '';

	Object.keys(attributes).forEach(name => {
		if (invalidAttributeNameCharacter.test(name)) return;

		const value = attributes[name];
		if (value === undefined) return;
		if (value === true) str += " " + name;

		const escaped = String(value)
			.replace(/"/g, '&#34;')
			.replace(/'/g, '&#39;');

		str += " " + name + "=" + JSON.stringify(escaped);
	});

	return str;
}

const escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}

function each(items, assign, fn) {
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(assign(items[i], i));
	}
	return str;
}

const missingComponent = {
	_render: () => ''
};

function validateSsrComponent(component, name) {
	if (!component || !component._render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
	}

	return component;
}

function debug(file, line, column, values) {
	console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`);
	console.log(values);
	return '';
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = noop;

	this._fragment.d(detach !== false);
	this._fragment = null;
	this._state = {};
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function() {
		console.warn('Component was already destroyed');
	};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function _differsImmutable(a, b) {
	return a != a ? b == b : a !== b;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			try {
				handler.__calling = true;
				handler.call(this, data);
			} finally {
				handler.__calling = false;
			}
		}
	}
}

function flush(component) {
	component._lock = true;
	callAll(component._beforecreate);
	callAll(component._oncreate);
	callAll(component._aftercreate);
	component._lock = false;
}

function get() {
	return this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._slots = blankObject();
	component._bind = options._bind;
	component._staged = {};

	component.options = options;
	component.root = options.root || component;
	component.store = options.store || component.root.store;

	if (!options.root) {
		component._beforecreate = [];
		component._oncreate = [];
		component._aftercreate = [];
	}
}

function on(eventName, handler) {
	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	flush(this.root);
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	newState = assign(this._staged, newState);
	this._staged = {};

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _stage(newState) {
	assign(this._staged, newState);
}

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(
			this._debugName + '.set was called without an object of data key-values to update.'
		);
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

var PENDING = {};
var SUCCESS = {};
var FAILURE = {};

function removeFromStore() {
	this.store._remove(this);
}

var proto = {
	destroy,
	get,
	fire,
	on,
	set,
	_recompute: noop,
	_set,
	_stage,
	_mount,
	_differs
};

var protoDev = {
	destroy: destroyDev,
	get,
	fire,
	on,
	set: setDev,
	_recompute: noop,
	_set,
	_stage,
	_mount,
	_differs
};




/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapper_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__sapper__/client.js */ "./__sapper__/client.js");


_sapper_client_js__WEBPACK_IMPORTED_MODULE_0__["start"]({
	target: document.querySelector('#sapper'),
	manifest
});

/***/ }),

/***/ "./src/routes/_error.html":
/*!********************************!*\
  !*** ./src/routes/_error.html ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/svelte/shared.js */ "./node_modules/svelte/shared.js");
/* src\routes\_error.html generated by Svelte v2.16.0 */


const file = "src\\routes\\_error.html";

function add_css() {
	var style = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style");
	style.id = 'svelte-13vgy2g-style';
	style.textContent = "h1.svelte-13vgy2g,p.svelte-13vgy2g{margin:0 auto}h1.svelte-13vgy2g{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-13vgy2g{margin:1em auto}@media(min-width: 480px){h1.svelte-13vgy2g{font-size:4em}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2Vycm9yLmh0bWwiLCJzb3VyY2VzIjpbIl9lcnJvci5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdmVsdGU6aGVhZD5cclxuXHQ8dGl0bGU+e3N0YXR1c308L3RpdGxlPlxyXG48L3N2ZWx0ZTpoZWFkPlxyXG5cclxuPGgxPntzdGF0dXN9PC9oMT5cclxuXHJcbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cclxuXHJcbjxzdHlsZT5cclxuXHRoMSwgcCB7XHJcblx0XHRtYXJnaW46IDAgYXV0bztcclxuXHR9XHJcblxyXG5cdGgxIHtcclxuXHRcdGZvbnQtc2l6ZTogMi44ZW07XHJcblx0XHRmb250LXdlaWdodDogNzAwO1xyXG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcclxuXHR9XHJcblxyXG5cdHAge1xyXG5cdFx0bWFyZ2luOiAxZW0gYXV0bztcclxuXHR9XHJcblxyXG5cdEBtZWRpYSAobWluLXdpZHRoOiA0ODBweCkge1xyXG5cdFx0aDEge1xyXG5cdFx0XHRmb250LXNpemU6IDRlbTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNDLGlCQUFFLENBQUUsQ0FBQyxlQUFDLENBQUMsQUFDTixNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksQUFDZixDQUFDLEFBRUQsRUFBRSxlQUFDLENBQUMsQUFDSCxTQUFTLENBQUUsS0FBSyxDQUNoQixXQUFXLENBQUUsR0FBRyxDQUNoQixNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxBQUNwQixDQUFDLEFBRUQsQ0FBQyxlQUFDLENBQUMsQUFDRixNQUFNLENBQUUsR0FBRyxDQUFDLElBQUksQUFDakIsQ0FBQyxBQUVELE1BQU0sQUFBQyxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDMUIsRUFBRSxlQUFDLENBQUMsQUFDSCxTQUFTLENBQUUsR0FBRyxBQUNmLENBQUMsQUFDRixDQUFDIn0= */";
	Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["append"])(document.head, style);
}

function create_main_fragment(component, ctx) {
	var title_value, text0, h1, text1, text2, p, text3_value = ctx.error.message, text3;

	document.title = title_value = ctx.status;

	return {
		c: function create() {
			text0 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createText"])("\r\n\r\n");
			h1 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h1");
			text1 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createText"])(ctx.status);
			text2 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createText"])("\r\n\r\n");
			p = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p");
			text3 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createText"])(text3_value);
			this.h()
		},

		l: function claim(nodes) {
			text0 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimText"])(nodes, "\r\n\r\n");

			h1 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimElement"])(nodes, "H1", { class: true }, false);
			var h1_nodes = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);

			text1 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimText"])(h1_nodes, ctx.status);
			h1_nodes.forEach(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"]);
			text2 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimText"])(nodes, "\r\n\r\n");

			p = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimElement"])(nodes, "P", { class: true }, false);
			var p_nodes = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["children"])(p);

			text3 = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimText"])(p_nodes, text3_value);
			p_nodes.forEach(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"]);
			this.h();
		},

		h: function hydrate() {
			h1.className = "svelte-13vgy2g";
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["addLoc"])(h1, file, 4, 0, 59);
			p.className = "svelte-13vgy2g";
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["addLoc"])(p, file, 6, 0, 80);
		},

		m: function mount(target, anchor) {
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, text0, anchor);
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, h1, anchor);
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["append"])(h1, text1);
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, text2, anchor);
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, p, anchor);
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["append"])(p, text3);
		},

		p: function update(changed, ctx) {
			if ((changed.status) && title_value !== (title_value = ctx.status)) {
				document.title = title_value;
			}

			if (changed.status) {
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["setData"])(text1, ctx.status);
			}

			if ((changed.error) && text3_value !== (text3_value = ctx.error.message)) {
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["setData"])(text3, text3_value);
			}
		},

		d: function destroy(detach) {
			if (detach) {
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"])(text0);
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"])(h1);
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"])(text2);
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"])(p);
			}
		}
	};
}

function Error(options) {
	this._debugName = '<Error>';
	if (!options || (!options.target && !options.root)) {
		throw new Error("'target' is a required option");
	}

	Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options);
	this._state = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, options.data);
	if (!('status' in this._state)) console.warn("<Error> was created without expected data property 'status'");
	if (!('error' in this._state)) console.warn("<Error> was created without expected data property 'error'");
	this._intro = true;

	if (!document.getElementById("svelte-13vgy2g-style")) add_css();

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		var nodes = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["children"])(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"]);
		this._mount(options.target, options.anchor);
	}
}

Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["assign"])(Error.prototype, C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["protoDev"]);

Error.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

if (true) {
	const { configure, register, reload } = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");

	module.hot.accept();

	if (!module.hot.data) {
		// initial load
		configure({});
		Error = register("src\\routes\\_error.html", Error);
	} else {
		// hot update
		Error = reload("src\\routes\\_error.html", Error);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Error);


/***/ }),

/***/ "./src/routes/_layout.html":
/*!*********************************!*\
  !*** ./src/routes/_layout.html ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/svelte/shared.js */ "./node_modules/svelte/shared.js");
/* src\routes\_layout.html generated by Svelte v2.16.0 */


const file = "src\\routes\\_layout.html";

function add_css() {
	var style = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])("style");
	style.id = 'svelte-1tyvcu5-style';
	style.textContent = "main.svelte-1tyvcu5{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2xheW91dC5odG1sIiwic291cmNlcyI6WyJfbGF5b3V0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiPG1haW4+XHJcblx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17Y2hpbGQuY29tcG9uZW50fSB7Li4uY2hpbGQucHJvcHN9Lz5cclxuPC9tYWluPlxyXG5cclxuPHN0eWxlPlxyXG5cdG1haW4ge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0bWF4LXdpZHRoOiA1NmVtO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcblx0XHRwYWRkaW5nOiAyZW07XHJcblx0XHRtYXJnaW46IDAgYXV0bztcclxuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblx0fVxyXG48L3N0eWxlPlxyXG5cclxuPHNjcmlwdD5cclxuXHJcbjwvc2NyaXB0PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQyxJQUFJLGVBQUMsQ0FBQyxBQUNMLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLFNBQVMsQ0FBRSxJQUFJLENBQ2YsZ0JBQWdCLENBQUUsS0FBSyxDQUN2QixPQUFPLENBQUUsR0FBRyxDQUNaLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUNkLFVBQVUsQ0FBRSxVQUFVLEFBQ3ZCLENBQUMifQ== */";
	Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["append"])(document.head, style);
}

function create_main_fragment(component, ctx) {
	var main;

	var switch_instance_spread_levels = [
		ctx.child.props
	];

	var switch_value = ctx.child.component;

	function switch_props(ctx) {
		var switch_instance_initial_data = {};
		for (var i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_initial_data = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["assign"])(switch_instance_initial_data, switch_instance_spread_levels[i]);
		}
		return {
			root: component.root,
			store: component.store,
			data: switch_instance_initial_data
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c: function create() {
			main = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])("main");
			if (switch_instance) switch_instance._fragment.c();
			this.h()
		},

		l: function claim(nodes) {
			main = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["claimElement"])(nodes, "MAIN", { class: true }, false);
			var main_nodes = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["children"])(main);

			if (switch_instance) switch_instance._fragment.l(main_nodes);
			main_nodes.forEach(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"]);
			this.h();
		},

		h: function hydrate() {
			main.className = "svelte-1tyvcu5";
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["addLoc"])(main, file, 0, 0, 0);
		},

		m: function mount(target, anchor) {
			Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["insert"])(target, main, anchor);

			if (switch_instance) {
				switch_instance._mount(main, null);
			}
		},

		p: function update(changed, ctx) {
			var switch_instance_changes = changed.child ? Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["getSpreadUpdate"])(switch_instance_spread_levels, [
				ctx.child.props
			]) : {};

			if (switch_value !== (switch_value = ctx.child.component)) {
				if (switch_instance) {
					switch_instance.destroy();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance._fragment.c();
					switch_instance._mount(main, null);
				} else {
					switch_instance = null;
				}
			}

			else if (switch_value) {
				switch_instance._set(switch_instance_changes);
			}
		},

		d: function destroy(detach) {
			if (detach) {
				Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"])(main);
			}

			if (switch_instance) switch_instance.destroy();
		}
	};
}

function Layout(options) {
	this._debugName = '<Layout>';
	if (!options || (!options.target && !options.root)) {
		throw new Error("'target' is a required option");
	}

	Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options);
	this._state = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["assign"])({}, options.data);
	if (!('child' in this._state)) console.warn("<Layout> was created without expected data property 'child'");
	this._intro = true;

	if (!document.getElementById("svelte-1tyvcu5-style")) add_css();

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		var nodes = Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["children"])(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["detachNode"]);
		this._mount(options.target, options.anchor);

		Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["flush"])(this);
	}
}

Object(C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["assign"])(Layout.prototype, C_Users_willi_Documents_GitHub_ace_node_modules_svelte_shared_js__WEBPACK_IMPORTED_MODULE_0__["protoDev"]);

Layout.prototype._checkReadOnly = function _checkReadOnly(newState) {
};

if (true) {
	const { configure, register, reload } = __webpack_require__(/*! ./node_modules/svelte-loader/lib/hot-api.js */ "./node_modules/svelte-loader/lib/hot-api.js");

	module.hot.accept();

	if (!module.hot.data) {
		// initial load
		configure({});
		Layout = register("src\\routes\\_layout.html", Layout);
	} else {
		// hot update
		Layout = reload("src\\routes\\_layout.html", Layout);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Layout);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vX19zYXBwZXJfXy9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1kZXYtaGVscGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdmVsdGUtZGV2LWhlbHBlci9saWIvcHJveHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS1kZXYtaGVscGVyL2xpYi9yZWdpc3RyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ZlbHRlLWxvYWRlci9saWIvaG90LWFwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvX2Vycm9yLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvdXRlcy9fbGF5b3V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELEtBQUssSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPLEdBQUcsT0FBTzs7QUFFblg7QUFDQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0I7QUFDeEIsd0JBQXdCOztBQUV4QjtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1osWUFBWTtBQUNaLFdBQVc7QUFDWCxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELElBQUk7QUFDdkQsc0JBQXNCLEtBQUs7QUFDM0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTyxHQUFHLHVCQUF1QixHQUFHLEtBQUssR0FBRyxPQUFPO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHFCQUFxQjtBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsNkRBQTZEO0FBQ25GO0FBQ0EsdUJBQXVCLDZEQUE2RDtBQUNwRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU4b0M7Ozs7Ozs7Ozs7Ozs7QUN4a0M5b0M7QUFBQTtBQUFrRDs7QUFFbEQsdURBQVk7QUFDWjtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0VDQ0csS0FBSyxDQUFDLE9BQU87O29DQUxSLE1BQU07Ozs7OzttSUFHVixNQUFNOzs7Ozs7Ozs7Ozs7OzRJQUFOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhEQUhGLE1BQU07Ozs7O2dJQUdWLE1BQU07Ozs2REFFUCxLQUFLLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQ0w2QixLQUFLLENBQUMsS0FBSzs7O3dCQUFoQyxLQUFLLENBQUMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFNLEtBQUssQ0FBQyxLQUFLOzs7NENBQWhDLEtBQUssQ0FBQyxTQUFTIiwiZmlsZSI6ImVhOGFkNjA1NDFkNmUzZjVlMzQ0L21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZWE4YWQ2MDU0MWQ2ZTNmNWUzNDRcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiL1wiICsgKHtcImluZGV4XCI6XCJpbmRleFwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5cIiArIGNodW5rSWQgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiY2xpZW50L1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9jbGllbnQuanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jbGllbnQuanNcIik7XG4iLCIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5pbXBvcnQgUm9vdENvbXBvbmVudCBmcm9tICcuLi9zcmMvcm91dGVzL19sYXlvdXQuaHRtbCc7XG5pbXBvcnQgRXJyb3JDb21wb25lbnQgZnJvbSAnLi4vc3JjL3JvdXRlcy9fZXJyb3IuaHRtbCc7XG5cbmZ1bmN0aW9uIGdvdG8oaHJlZiwgb3B0cyA9IHsgcmVwbGFjZVN0YXRlOiBmYWxzZSB9KSB7XG4gICAgY29uc3QgdGFyZ2V0JCQxID0gc2VsZWN0X3JvdXRlKG5ldyBVUkwoaHJlZiwgZG9jdW1lbnQuYmFzZVVSSSkpO1xuICAgIGlmICh0YXJnZXQkJDEpIHtcbiAgICAgICAgX2hpc3Rvcnlbb3B0cy5yZXBsYWNlU3RhdGUgPyAncmVwbGFjZVN0YXRlJyA6ICdwdXNoU3RhdGUnXSh7IGlkOiBjaWQgfSwgJycsIGhyZWYpO1xuICAgICAgICByZXR1cm4gbmF2aWdhdGUodGFyZ2V0JCQxLCBudWxsKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIGxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmID0+IHsgfSk7IC8vIG5ldmVyIHJlc29sdmVzXG59XG5cbmNvbnN0IGlnbm9yZSA9IFtdO1xuY29uc3QgY29tcG9uZW50cyA9IFtcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJpbmRleFwiICovIFwiLi4vc3JjL3JvdXRlcy9pbmRleC5odG1sXCIpLFxuXHRcdGNzczogXCJfX1NBUFBFUl9DU1NfUExBQ0VIT0xERVI6aW5kZXguaHRtbF9fXCJcblx0fVxuXTtcbmNvbnN0IHBhZ2VzID0gW1xuXHR7XG5cdFx0Ly8gaW5kZXguaHRtbFxuXHRcdHBhdHRlcm46IC9eXFwvPyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDAgfVxuXHRcdF1cblx0fVxuXTtcbmxldCByZWFkeSA9IGZhbHNlO1xubGV0IHJvb3RfY29tcG9uZW50O1xubGV0IHNlZ21lbnRzID0gW107XG5sZXQgY3VycmVudF90b2tlbjtcbmxldCByb290X3ByZWxvYWQ7XG5sZXQgcm9vdF9kYXRhO1xuY29uc3Qgcm9vdF9wcm9wcyA9IHtcbiAgICBwYXRoOiBudWxsLFxuICAgIHBhcmFtczogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBjaGlsZDoge1xuICAgICAgICBzZWdtZW50OiBudWxsLFxuICAgICAgICBjb21wb25lbnQ6IG51bGwsXG4gICAgICAgIHByb3BzOiB7fVxuICAgIH1cbn07XG5sZXQgcHJlZmV0Y2hpbmcgPSBudWxsO1xuZnVuY3Rpb24gc2V0X3ByZWZldGNoaW5nKGhyZWYsIHByb21pc2UpIHtcbiAgICBwcmVmZXRjaGluZyA9IHsgaHJlZiwgcHJvbWlzZSB9O1xufVxubGV0IHN0b3JlO1xuZnVuY3Rpb24gc2V0X3N0b3JlKGZuKSB7XG4gICAgc3RvcmUgPSBmbihpbml0aWFsX2RhdGEuc3RvcmUpO1xufVxubGV0IHRhcmdldDtcbmZ1bmN0aW9uIHNldF90YXJnZXQoZWxlbWVudCkge1xuICAgIHRhcmdldCA9IGVsZW1lbnQ7XG59XG5sZXQgdWlkID0gMTtcbmZ1bmN0aW9uIHNldF91aWQobikge1xuICAgIHVpZCA9IG47XG59XG5sZXQgY2lkO1xuZnVuY3Rpb24gc2V0X2NpZChuKSB7XG4gICAgY2lkID0gbjtcbn1cbmNvbnN0IGluaXRpYWxfZGF0YSA9IHR5cGVvZiBfX1NBUFBFUl9fICE9PSAndW5kZWZpbmVkJyAmJiBfX1NBUFBFUl9fO1xuY29uc3QgX2hpc3RvcnkgPSB0eXBlb2YgaGlzdG9yeSAhPT0gJ3VuZGVmaW5lZCcgPyBoaXN0b3J5IDoge1xuICAgIHB1c2hTdGF0ZTogKHN0YXRlLCB0aXRsZSwgaHJlZikgPT4geyB9LFxuICAgIHJlcGxhY2VTdGF0ZTogKHN0YXRlLCB0aXRsZSwgaHJlZikgPT4geyB9LFxuICAgIHNjcm9sbFJlc3RvcmF0aW9uOiAnJ1xufTtcbmNvbnN0IHNjcm9sbF9oaXN0b3J5ID0ge307XG5mdW5jdGlvbiBzZWxlY3Rfcm91dGUodXJsKSB7XG4gICAgaWYgKHVybC5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbilcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKCF1cmwucGF0aG5hbWUuc3RhcnRzV2l0aChpbml0aWFsX2RhdGEuYmFzZVVybCkpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHBhdGggPSB1cmwucGF0aG5hbWUuc2xpY2UoaW5pdGlhbF9kYXRhLmJhc2VVcmwubGVuZ3RoKTtcbiAgICAvLyBhdm9pZCBhY2NpZGVudGFsIGNsYXNoZXMgYmV0d2VlbiBzZXJ2ZXIgcm91dGVzIGFuZCBwYWdlc1xuICAgIGlmIChpZ25vcmUuc29tZShwYXR0ZXJuID0+IHBhdHRlcm4udGVzdChwYXRoKSkpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBwYWdlc1tpXTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBwYWdlLnBhdHRlcm4uZXhlYyhwYXRoKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBpZiAodXJsLnNlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXJsLnNlYXJjaC5zbGljZSgxKS5zcGxpdCgnJicpLmZvckVhY2goc2VhcmNoUGFyYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgWywga2V5LCB2YWx1ZV0gPSAvKFtePV0qKSg/Oj0oLiopKT8vLmV4ZWMoZGVjb2RlVVJJQ29tcG9uZW50KHNlYXJjaFBhcmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gKHZhbHVlIHx8ICcnKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWVyeVtrZXldID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVlcnlba2V5XSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB1cmwsIHBhdGgsIHBhZ2UsIG1hdGNoLCBxdWVyeSB9O1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2Nyb2xsX3N0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiBwYWdlWU9mZnNldFxuICAgIH07XG59XG5mdW5jdGlvbiBuYXZpZ2F0ZSh0YXJnZXQsIGlkLCBub3Njcm9sbCwgaGFzaCkge1xuICAgIGlmIChpZCkge1xuICAgICAgICAvLyBwb3BzdGF0ZSBvciBpbml0aWFsIG5hdmlnYXRpb25cbiAgICAgICAgY2lkID0gaWQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJyZW50X3Njcm9sbCA9IHNjcm9sbF9zdGF0ZSgpO1xuICAgICAgICAvLyBjbGlja2VkIG9uIGEgbGluay4gcHJlc2VydmUgc2Nyb2xsIHN0YXRlXG4gICAgICAgIHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBjdXJyZW50X3Njcm9sbDtcbiAgICAgICAgaWQgPSBjaWQgPSArK3VpZDtcbiAgICAgICAgc2Nyb2xsX2hpc3RvcnlbY2lkXSA9IG5vc2Nyb2xsID8gY3VycmVudF9zY3JvbGwgOiB7IHg6IDAsIHk6IDAgfTtcbiAgICB9XG4gICAgY2lkID0gaWQ7XG4gICAgaWYgKHJvb3RfY29tcG9uZW50KSB7XG4gICAgICAgIHJvb3RfY29tcG9uZW50LnNldCh7IHByZWxvYWRpbmc6IHRydWUgfSk7XG4gICAgfVxuICAgIGNvbnN0IGxvYWRlZCA9IHByZWZldGNoaW5nICYmIHByZWZldGNoaW5nLmhyZWYgPT09IHRhcmdldC51cmwuaHJlZiA/XG4gICAgICAgIHByZWZldGNoaW5nLnByb21pc2UgOlxuICAgICAgICBwcmVwYXJlX3BhZ2UodGFyZ2V0KTtcbiAgICBwcmVmZXRjaGluZyA9IG51bGw7XG4gICAgY29uc3QgdG9rZW4gPSBjdXJyZW50X3Rva2VuID0ge307XG4gICAgcmV0dXJuIGxvYWRlZC50aGVuKCh7IHJlZGlyZWN0LCBkYXRhLCBudWxsYWJsZV9kZXB0aCB9KSA9PiB7XG4gICAgICAgIGlmIChyZWRpcmVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGdvdG8ocmVkaXJlY3QubG9jYXRpb24sIHsgcmVwbGFjZVN0YXRlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcihkYXRhLCBudWxsYWJsZV9kZXB0aCwgc2Nyb2xsX2hpc3RvcnlbaWRdLCBub3Njcm9sbCwgaGFzaCwgdG9rZW4pO1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyKGRhdGEsIG51bGxhYmxlX2RlcHRoLCBzY3JvbGwsIG5vc2Nyb2xsLCBoYXNoLCB0b2tlbikge1xuICAgIGlmIChjdXJyZW50X3Rva2VuICE9PSB0b2tlbilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChyb290X2NvbXBvbmVudCkge1xuICAgICAgICAvLyBmaXJzdCwgY2xlYXIgb3V0IGhpZ2hlc3QtbGV2ZWwgcm9vdCBjb21wb25lbnRcbiAgICAgICAgbGV0IGxldmVsID0gZGF0YS5jaGlsZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWxsYWJsZV9kZXB0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gbnVsbGFibGVfZGVwdGgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBsZXZlbCA9IGxldmVsLnByb3BzLmNoaWxkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgY29tcG9uZW50IH0gPSBsZXZlbDtcbiAgICAgICAgbGV2ZWwuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgcm9vdF9jb21wb25lbnQuc2V0KHsgY2hpbGQ6IGRhdGEuY2hpbGQgfSk7XG4gICAgICAgIC8vIHRoZW4gcmVuZGVyIG5ldyBzdHVmZlxuICAgICAgICBsZXZlbC5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgIHJvb3RfY29tcG9uZW50LnNldChkYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGZpcnN0IGxvYWQg4oCUIHJlbW92ZSBTU1InZCA8aGVhZD4gY29udGVudHNcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyLWhlYWQtc3RhcnQnKTtcbiAgICAgICAgY29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhcHBlci1oZWFkLWVuZCcpO1xuICAgICAgICBpZiAoc3RhcnQgJiYgZW5kKSB7XG4gICAgICAgICAgICB3aGlsZSAoc3RhcnQubmV4dFNpYmxpbmcgIT09IGVuZClcbiAgICAgICAgICAgICAgICBkZXRhY2goc3RhcnQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgZGV0YWNoKHN0YXJ0KTtcbiAgICAgICAgICAgIGRldGFjaChlbmQpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwgcm9vdF9kYXRhKTtcbiAgICAgICAgcm9vdF9jb21wb25lbnQgPSBuZXcgUm9vdENvbXBvbmVudCh7XG4gICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgICBoeWRyYXRlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIW5vc2Nyb2xsKSB7XG4gICAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgICAgICAvLyBzY3JvbGwgaXMgYW4gZWxlbWVudCBpZCAoZnJvbSBhIGhhc2gpLCB3ZSBuZWVkIHRvIGNvbXB1dGUgeS5cbiAgICAgICAgICAgIGNvbnN0IGRlZXBfbGlua2VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoYXNoKTtcbiAgICAgICAgICAgIGlmIChkZWVwX2xpbmtlZCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogZGVlcF9saW5rZWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY3JvbGxfaGlzdG9yeVtjaWRdID0gc2Nyb2xsO1xuICAgICAgICBpZiAoc2Nyb2xsKVxuICAgICAgICAgICAgc2Nyb2xsVG8oc2Nyb2xsLngsIHNjcm9sbC55KTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihyb290X3Byb3BzLCBkYXRhKTtcbiAgICByZWFkeSA9IHRydWU7XG59XG5mdW5jdGlvbiBwcmVwYXJlX3BhZ2UodGFyZ2V0KSB7XG4gICAgY29uc3QgeyBwYWdlLCBwYXRoLCBxdWVyeSB9ID0gdGFyZ2V0O1xuICAgIGNvbnN0IG5ld19zZWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgbGV0IGNoYW5nZWRfZnJvbSA9IDA7XG4gICAgd2hpbGUgKHNlZ21lbnRzW2NoYW5nZWRfZnJvbV0gJiZcbiAgICAgICAgbmV3X3NlZ21lbnRzW2NoYW5nZWRfZnJvbV0gJiZcbiAgICAgICAgc2VnbWVudHNbY2hhbmdlZF9mcm9tXSA9PT0gbmV3X3NlZ21lbnRzW2NoYW5nZWRfZnJvbV0pXG4gICAgICAgIGNoYW5nZWRfZnJvbSArPSAxO1xuICAgIGxldCByZWRpcmVjdCA9IG51bGw7XG4gICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICBjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG4gICAgICAgIHN0b3JlLFxuICAgICAgICBmZXRjaDogKHVybCwgb3B0cykgPT4gZmV0Y2godXJsLCBvcHRzKSxcbiAgICAgICAgcmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlZGlyZWN0ICYmIChyZWRpcmVjdC5zdGF0dXNDb2RlICE9PSBzdGF0dXNDb2RlIHx8IHJlZGlyZWN0LmxvY2F0aW9uICE9PSBsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbmZsaWN0aW5nIHJlZGlyZWN0c2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoc3RhdHVzQ29kZSwgbWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgZXJyb3IgPSB7IHN0YXR1c0NvZGUsIG1lc3NhZ2UgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFyb290X3ByZWxvYWQpIHtcbiAgICAgICAgcm9vdF9wcmVsb2FkID0gUm9vdENvbXBvbmVudC5wcmVsb2FkXG4gICAgICAgICAgICA/IGluaXRpYWxfZGF0YS5wcmVsb2FkZWRbMF0gfHwgUm9vdENvbXBvbmVudC5wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHt9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHBhZ2UucGFydHMubWFwKChwYXJ0LCBpKSA9PiB7XG4gICAgICAgIGlmIChpIDwgY2hhbmdlZF9mcm9tKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmICghcGFydClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gbG9hZF9jb21wb25lbnQoY29tcG9uZW50c1twYXJ0LmldKS50aGVuKENvbXBvbmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXEgPSB7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXModGFyZ2V0Lm1hdGNoKSA6IHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHByZWxvYWRlZDtcbiAgICAgICAgICAgIGlmIChyZWFkeSB8fCAhaW5pdGlhbF9kYXRhLnByZWxvYWRlZFtpICsgMV0pIHtcbiAgICAgICAgICAgICAgICBwcmVsb2FkZWQgPSBDb21wb25lbnQucHJlbG9hZFxuICAgICAgICAgICAgICAgICAgICA/IENvbXBvbmVudC5wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCByZXEpXG4gICAgICAgICAgICAgICAgICAgIDoge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVsb2FkZWQgPSBpbml0aWFsX2RhdGEucHJlbG9hZGVkW2kgKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJlbG9hZGVkKS50aGVuKHByZWxvYWRlZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgQ29tcG9uZW50LCBwcmVsb2FkZWQgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgZXJyb3IgPSB7IHN0YXR1c0NvZGU6IDUwMCwgbWVzc2FnZTogZXJyIH07XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9KS50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICBpZiAocm9vdF9kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocm9vdF9wcmVsb2FkKS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICByb290X2RhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSkudGhlbihyZXN1bHRzID0+IHtcbiAgICAgICAgaWYgKHJlZGlyZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4geyByZWRpcmVjdCB9O1xuICAgICAgICB9XG4gICAgICAgIHNlZ21lbnRzID0gbmV3X3NlZ21lbnRzO1xuICAgICAgICBjb25zdCBnZXRfcGFyYW1zID0gcGFnZS5wYXJ0c1twYWdlLnBhcnRzLmxlbmd0aCAtIDFdLnBhcmFtcyB8fCAoKCkgPT4gKHt9KSk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGdldF9wYXJhbXModGFyZ2V0Lm1hdGNoKTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgICAgICBlcnJvcjogdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnID8gbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpIDogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGVycm9yLnN0YXR1c0NvZGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBFcnJvckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wcyA9IHsgcGF0aCwgcXVlcnksIGVycm9yOiBudWxsLCBzdGF0dXM6IG51bGwgfTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBwcmVsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGNoaWxkOiBPYmplY3QuYXNzaWduKHt9LCByb290X3Byb3BzLmNoaWxkLCB7XG4gICAgICAgICAgICAgICAgc2VnbWVudDogc2VnbWVudHNbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjaGFuZ2VkKHF1ZXJ5LCByb290X3Byb3BzLnF1ZXJ5KSlcbiAgICAgICAgICAgIGRhdGEucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgaWYgKGNoYW5nZWQocGFyYW1zLCByb290X3Byb3BzLnBhcmFtcykpXG4gICAgICAgICAgICBkYXRhLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgbGV0IGxldmVsID0gZGF0YS5jaGlsZDtcbiAgICAgICAgbGV0IG51bGxhYmxlX2RlcHRoID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlLnBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0gcGFnZS5wYXJ0c1tpXTtcbiAgICAgICAgICAgIGlmICghcGFydClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGdldF9wYXJhbXMgPSBwYXJ0LnBhcmFtcyB8fCAoKCkgPT4gKHt9KSk7XG4gICAgICAgICAgICBpZiAoaSA8IGNoYW5nZWRfZnJvbSkge1xuICAgICAgICAgICAgICAgIGxldmVsLnByb3BzLnBhdGggPSBwYXRoO1xuICAgICAgICAgICAgICAgIGxldmVsLnByb3BzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgbGV2ZWwucHJvcHMuY2hpbGQgPSBPYmplY3QuYXNzaWduKHt9LCBsZXZlbC5wcm9wcy5jaGlsZCk7XG4gICAgICAgICAgICAgICAgbnVsbGFibGVfZGVwdGggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldmVsLmNvbXBvbmVudCA9IHJlc3VsdHNbaV0uQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIGxldmVsLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgbGV2ZWwucHJvcHMsIHByb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogZ2V0X3BhcmFtcyh0YXJnZXQubWF0Y2gpLFxuICAgICAgICAgICAgICAgIH0sIHJlc3VsdHNbaV0ucHJlbG9hZGVkKTtcbiAgICAgICAgICAgICAgICBsZXZlbC5wcm9wcy5jaGlsZCA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWwgPSBsZXZlbC5wcm9wcy5jaGlsZDtcbiAgICAgICAgICAgIGxldmVsLnNlZ21lbnQgPSBzZWdtZW50c1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YSwgbnVsbGFibGVfZGVwdGggfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGxvYWRfY3NzKGNodW5rKSB7XG4gICAgY29uc3QgaHJlZiA9IGBjbGllbnQvJHtjaHVua31gO1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW2hyZWY9XCIke2hyZWZ9XCJdYCkpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bGZpbCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLmhyZWYgPSBocmVmO1xuICAgICAgICBsaW5rLm9ubG9hZCA9ICgpID0+IGZ1bGZpbCgpO1xuICAgICAgICBsaW5rLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBsb2FkX2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAvLyBUT0RPIHRoaXMgaXMgdGVtcG9yYXJ5IOKAlCBvbmNlIHBsYWNlaG9sZGVycyBhcmVcbiAgICAvLyBhbHdheXMgcmV3cml0dGVuLCBzY3JhdGNoIHRoZSB0ZXJuYXJ5XG4gICAgY29uc3QgcHJvbWlzZXMgPSAodHlwZW9mIGNvbXBvbmVudC5jc3MgPT09ICdzdHJpbmcnID8gW10gOiBjb21wb25lbnQuY3NzLm1hcChsb2FkX2NzcykpO1xuICAgIHByb21pc2VzLnVuc2hpZnQoY29tcG9uZW50LmpzKCkpO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbih2YWx1ZXMgPT4gdmFsdWVzWzBdLmRlZmF1bHQpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBjaGFuZ2VkKGEsIGIpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgIT09IEpTT04uc3RyaW5naWZ5KGIpO1xufVxuXG5mdW5jdGlvbiBwcmVmZXRjaChocmVmKSB7XG4gICAgY29uc3QgdGFyZ2V0JCQxID0gc2VsZWN0X3JvdXRlKG5ldyBVUkwoaHJlZiwgZG9jdW1lbnQuYmFzZVVSSSkpO1xuICAgIGlmICh0YXJnZXQkJDEpIHtcbiAgICAgICAgaWYgKCFwcmVmZXRjaGluZyB8fCBocmVmICE9PSBwcmVmZXRjaGluZy5ocmVmKSB7XG4gICAgICAgICAgICBzZXRfcHJlZmV0Y2hpbmcoaHJlZiwgcHJlcGFyZV9wYWdlKHRhcmdldCQkMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmZXRjaGluZy5wcm9taXNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RhcnQob3B0cykge1xuICAgIGlmICgnc2Nyb2xsUmVzdG9yYXRpb24nIGluIF9oaXN0b3J5KSB7XG4gICAgICAgIF9oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG4gICAgfVxuICAgIHNldF90YXJnZXQob3B0cy50YXJnZXQpO1xuICAgIGlmIChvcHRzLnN0b3JlKVxuICAgICAgICBzZXRfc3RvcmUob3B0cy5zdG9yZSk7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVfY2xpY2spO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgaGFuZGxlX3BvcHN0YXRlKTtcbiAgICAvLyBwcmVmZXRjaFxuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0cmlnZ2VyX3ByZWZldGNoKTtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVfbW91c2Vtb3ZlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaGFzaCwgaHJlZiB9ID0gbG9jYXRpb247XG4gICAgICAgIF9oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IGlkOiB1aWQgfSwgJycsIGhyZWYpO1xuICAgICAgICBpZiAoIWluaXRpYWxfZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0JCQxID0gc2VsZWN0X3JvdXRlKG5ldyBVUkwobG9jYXRpb24uaHJlZikpO1xuICAgICAgICAgICAgaWYgKHRhcmdldCQkMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF2aWdhdGUodGFyZ2V0JCQxLCB1aWQsIGZhbHNlLCBoYXNoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxubGV0IG1vdXNlbW92ZV90aW1lb3V0O1xuZnVuY3Rpb24gaGFuZGxlX21vdXNlbW92ZShldmVudCkge1xuICAgIGNsZWFyVGltZW91dChtb3VzZW1vdmVfdGltZW91dCk7XG4gICAgbW91c2Vtb3ZlX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdHJpZ2dlcl9wcmVmZXRjaChldmVudCk7XG4gICAgfSwgMjApO1xufVxuZnVuY3Rpb24gdHJpZ2dlcl9wcmVmZXRjaChldmVudCkge1xuICAgIGNvbnN0IGEgPSBmaW5kX2FuY2hvcihldmVudC50YXJnZXQpO1xuICAgIGlmICghYSB8fCBhLnJlbCAhPT0gJ3ByZWZldGNoJylcbiAgICAgICAgcmV0dXJuO1xuICAgIHByZWZldGNoKGEuaHJlZik7XG59XG5mdW5jdGlvbiBoYW5kbGVfY2xpY2soZXZlbnQpIHtcbiAgICAvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Zpc2lvbm1lZGlhL3BhZ2UuanNcbiAgICAvLyBNSVQgbGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvcGFnZS5qcyNsaWNlbnNlXG4gICAgaWYgKHdoaWNoKGV2ZW50KSAhPT0gMSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGEgPSBmaW5kX2FuY2hvcihldmVudC50YXJnZXQpO1xuICAgIGlmICghYSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghYS5ocmVmKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gY2hlY2sgaWYgbGluayBpcyBpbnNpZGUgYW4gc3ZnXG4gICAgLy8gaW4gdGhpcyBjYXNlLCBib3RoIGhyZWYgYW5kIHRhcmdldCBhcmUgYWx3YXlzIGluc2lkZSBhbiBvYmplY3RcbiAgICBjb25zdCBzdmcgPSB0eXBlb2YgYS5ocmVmID09PSAnb2JqZWN0JyAmJiBhLmhyZWYuY29uc3RydWN0b3IubmFtZSA9PT0gJ1NWR0FuaW1hdGVkU3RyaW5nJztcbiAgICBjb25zdCBocmVmID0gU3RyaW5nKHN2ZyA/IGEuaHJlZi5iYXNlVmFsIDogYS5ocmVmKTtcbiAgICBpZiAoaHJlZiA9PT0gbG9jYXRpb24uaHJlZikge1xuICAgICAgICBpZiAoIWxvY2F0aW9uLmhhc2gpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIElnbm9yZSBpZiB0YWcgaGFzXG4gICAgLy8gMS4gJ2Rvd25sb2FkJyBhdHRyaWJ1dGVcbiAgICAvLyAyLiByZWw9J2V4dGVybmFsJyBhdHRyaWJ1dGVcbiAgICBpZiAoYS5oYXNBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHwgYS5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gSWdub3JlIGlmIDxhPiBoYXMgYSB0YXJnZXRcbiAgICBpZiAoc3ZnID8gYS50YXJnZXQuYmFzZVZhbCA6IGEudGFyZ2V0KVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChocmVmKTtcbiAgICAvLyBEb24ndCBoYW5kbGUgaGFzaCBjaGFuZ2VzXG4gICAgaWYgKHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gbG9jYXRpb24uc2VhcmNoKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0JCQxID0gc2VsZWN0X3JvdXRlKHVybCk7XG4gICAgaWYgKHRhcmdldCQkMSkge1xuICAgICAgICBjb25zdCBub3Njcm9sbCA9IGEuaGFzQXR0cmlidXRlKCdzYXBwZXItbm9zY3JvbGwnKTtcbiAgICAgICAgbmF2aWdhdGUodGFyZ2V0JCQxLCBudWxsLCBub3Njcm9sbCwgdXJsLmhhc2gpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogY2lkIH0sICcnLCB1cmwuaHJlZik7XG4gICAgfVxufVxuZnVuY3Rpb24gd2hpY2goZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQud2hpY2ggPT09IG51bGwgPyBldmVudC5idXR0b24gOiBldmVudC53aGljaDtcbn1cbmZ1bmN0aW9uIGZpbmRfYW5jaG9yKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZSAmJiBub2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdBJylcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTsgLy8gU1ZHIDxhPiBlbGVtZW50cyBoYXZlIGEgbG93ZXJjYXNlIG5hbWVcbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIGhhbmRsZV9wb3BzdGF0ZShldmVudCkge1xuICAgIHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBzY3JvbGxfc3RhdGUoKTtcbiAgICBpZiAoZXZlbnQuc3RhdGUpIHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0JCQxID0gc2VsZWN0X3JvdXRlKHVybCk7XG4gICAgICAgIGlmICh0YXJnZXQkJDEpIHtcbiAgICAgICAgICAgIG5hdmlnYXRlKHRhcmdldCQkMSwgZXZlbnQuc3RhdGUuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGhhc2hjaGFuZ2VcbiAgICAgICAgc2V0X3VpZCh1aWQgKyAxKTtcbiAgICAgICAgc2V0X2NpZCh1aWQpO1xuICAgICAgICBfaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBpZDogY2lkIH0sICcnLCBsb2NhdGlvbi5ocmVmKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByZWZldGNoUm91dGVzKHBhdGhuYW1lcykge1xuICAgIHJldHVybiBwYWdlc1xuICAgICAgICAuZmlsdGVyKHJvdXRlID0+IHtcbiAgICAgICAgaWYgKCFwYXRobmFtZXMpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lcy5zb21lKHBhdGhuYW1lID0+IHJvdXRlLnBhdHRlcm4udGVzdChwYXRobmFtZSkpO1xuICAgIH0pXG4gICAgICAgIC5yZWR1Y2UoKHByb21pc2UsIHJvdXRlKSA9PiBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocm91dGUucGFydHMubWFwKHBhcnQgPT4gcGFydCAmJiBsb2FkX2NvbXBvbmVudChjb21wb25lbnRzW3BhcnQuaV0pKSk7XG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcbn1cblxuZXhwb3J0IHsgc3RhcnQsIGdvdG8sIHByZWZldGNoLCBwcmVmZXRjaFJvdXRlcyB9O1xuXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRpbXBvcnQoXCJDOi9Vc2Vycy93aWxsaS9Eb2N1bWVudHMvR2l0SHViL2FjZS9ub2RlX21vZHVsZXMvc2FwcGVyL3NhcHBlci1kZXYtY2xpZW50LmpzXCIpLnRoZW4oY2xpZW50ID0+IHtcblx0XHRjbGllbnQuY29ubmVjdCgxMDAwMCk7XG5cdH0pO1xufSIsImV4cG9ydCAqIGZyb20gJy4vbGliL3Byb3h5JzsiLCJpbXBvcnQgUmVnaXN0cnkgZnJvbSAnLi9yZWdpc3RyeSc7XG5cbmxldCBwcm94eU9wdGlvbnMgPSB7XG4gIG5vUHJlc2VydmVTdGF0ZTogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHJldHVybiBzdHJbMF0udG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVidWdOYW1lKGlkKSB7XG4gIGNvbnN0IHBvc2l4SUQgPSBpZC5yZXBsYWNlKC9bL1xcXFxdL2csICcvJyk7XG4gIGNvbnN0IG5hbWUgPSBwb3NpeElELnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJy4nKS5zaGlmdCgpO1xuICByZXR1cm4gYDwke2NhcGl0YWxpemUobmFtZSl9PmA7XG59XG5cbmZ1bmN0aW9uIGdyb3VwU3RhcnQobXNnKSB7XG4gIGNvbnNvbGUuZ3JvdXAgJiYgY29uc29sZS5ncm91cChtc2cpO1xufVxuXG5mdW5jdGlvbiBncm91cEVuZCgpIHtcbiAgY29uc29sZS5ncm91cEVuZCAmJiBjb25zb2xlLmdyb3VwRW5kKCk7XG59XG5cblxuZXhwb3J0IHsgUmVnaXN0cnkgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShfb3B0aW9ucykge1xuICBwcm94eU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHByb3h5T3B0aW9ucywgX29wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICByZXR1cm4gcHJveHlPcHRpb25zO1xufVxuXG4vKlxuY3JlYXRlcyBhIHByb3h5IG9iamVjdCB0aGF0XG5kZWNvcmF0ZXMgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCB3aXRoIHRyYWNrZXJzXG5hbmQgZW5zdXJlcyByZXNvbHV0aW9uIHRvIHRoZVxubGF0ZXN0IHZlcnNpb24gb2YgdGhlIGNvbXBvbmVudFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShpZCkge1xuICBjb25zdCBoYW5kbGVkTWV0aG9kcyA9ICdfbW91bnQsX3VubW91bnQsZGVzdHJveScuc3BsaXQoJywnKTtcbiAgY29uc3QgZm9yd2FyZGVkTWV0aG9kcyA9ICdnZXQsZmlyZSxvYnNlcnZlLG9uLHNldCx0ZWFyZG93bixfcmVjb21wdXRlLF9zZXQsX2JpbmQnLnNwbGl0KCcsJyk7XG4gIGNsYXNzIHByb3h5Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX19tb3VudHBvaW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX19hbmNob3IgPSBudWxsO1xuICAgICAgdGhpcy5fX2luc2VydGlvblBvaW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX19tb3VudGVkID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyKG9wdGlvbnMpO1xuXG4gICAgICB0aGlzLl9kZWJ1Z05hbWUgPSB0aGlzLnByb3h5VGFyZ2V0Ll9kZWJ1Z05hbWUgfHwgZ2V0RGVidWdOYW1lKHRoaXMuaWQpO1xuXG4gICAgICAvLyAtLS0tIGZvcndhcmRlZCBtZXRob2RzIC0tLS1cbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgZm9yd2FyZGVkTWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBzZWxmW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5wcm94eVRhcmdldFttZXRob2RdLmFwcGx5KHNlbGYucHJveHlUYXJnZXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIC8vIC0tLS0gRU5EIGZvcndhcmRlZCBtZXRob2RzIC0tLS1cbiAgICB9XG5cbiAgICAvLyAtLS0tIGF1Z21lbnRlZCBtZXRob2RzIC0tLS1cblxuICAgIF9tb3VudCh0YXJnZXQsIGFuY2hvciwgaW5zZXJ0aW9uUG9pbnQpIHtcblxuICAgICAgdGhpcy5fX21vdW50cG9pbnQgPSB0YXJnZXQ7XG4gICAgICB0aGlzLl9fYW5jaG9yID0gYW5jaG9yO1xuXG4gICAgICBpZiAoaW5zZXJ0aW9uUG9pbnQpIHtcbiAgICAgICAgdGhpcy5fX2luc2VydGlvblBvaW50ID0gaW5zZXJ0aW9uUG9pbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICAgICAgdGhpcy5fX2luc2VydGlvblBvaW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0aGlzLl9kZWJ1Z05hbWUpO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRoaXMuX19pbnNlcnRpb25Qb2ludCwgYW5jaG9yKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fX2luc2VydGlvblBvaW50Ll9fY29tcG9uZW50X18gPSB0aGlzO1xuXG4gICAgICBhbmNob3IgPSB0aGlzLl9faW5zZXJ0aW9uUG9pbnQubmV4dFNpYmxpbmc7XG5cbiAgICAgIGlmICh0YXJnZXQubm9kZU5hbWUgPT0gJyNkb2N1bWVudC1mcmFnbWVudCcgJiYgaW5zZXJ0aW9uUG9pbnQpIHtcbiAgICAgICAgLy9oYW5kbGVzICM0IGJ5IGZvcmNpbmcgYSB0YXJnZXRcbiAgICAgICAgLy9pZiBvcmlnaW5hbCB0YXJnZXQgd2FzIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5fX2luc2VydGlvblBvaW50LnBhcmVudE5vZGU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19tb3VudGVkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIHRoaXMucHJveHlUYXJnZXQuX21vdW50KHRhcmdldCwgYW5jaG9yKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KGRldGFjaCwga2VlcEluc2VydGlvblBvaW50KSB7XG5cbiAgICAgIFJlZ2lzdHJ5LmRlUmVnaXN0ZXJJbnN0YW5jZSh0aGlzKTtcblxuICAgICAgaWYgKCFrZWVwSW5zZXJ0aW9uUG9pbnQgJiYgdGhpcy5fX2luc2VydGlvblBvaW50KSB7XG4gICAgICAgIC8vZGVyZWYgZm9yIEdDIGJlZm9yZSByZW1vdmFsIG9mIG5vZGVcbiAgICAgICAgdGhpcy5fX2luc2VydGlvblBvaW50Ll9fY29tcG9uZW50X18gPSBudWxsO1xuICAgICAgICBjb25zdCBpcCA9IHRoaXMuX19pbnNlcnRpb25Qb2ludDtcbiAgICAgICAgaXAgJiYgaXAucGFyZW50Tm9kZSAmJiBpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnByb3h5VGFyZ2V0LmRlc3Ryb3koZGV0YWNoKTtcbiAgICB9XG5cbiAgICBfdW5tb3VudCgpIHtcbiAgICAgIHRoaXMuX19tb3VudGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5wcm94eVRhcmdldC5fdW5tb3VudC5hcHBseSh0aGlzLnByb3h5VGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIC0tLS0gRU5EIGF1Z21lbnRlZCBtZXRob2RzIC0tLS1cblxuXG4gICAgLy8gLS0tLSBleHRyYSBtZXRob2RzIC0tLS1cblxuICAgIF9yZWdpc3RlcihvcHRpb25zKSB7XG5cbiAgICAgIGNvbnN0IHJlY29yZCA9IFJlZ2lzdHJ5LmdldCh0aGlzLmlkKTtcblxuICAgICAgdHJ5IHtcblxuICAgICAgICAvL3Jlc29sdmUgdG8gbGF0ZXN0IHZlcnNpb24gb2YgY29tcG9uZW50XG4gICAgICAgIHRoaXMucHJveHlUYXJnZXQgPSBuZXcgcmVjb3JkLmNvbXBvbmVudChvcHRpb25zKTtcblxuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIGNvbnN0IHJiID0gcmVjb3JkLnJvbGxiYWNrO1xuXG4gICAgICAgIGlmICghcmIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgIGNvbnNvbGUud2FybignRnVsbCByZWxvYWQgcmVxdWlyZWQuIFBsZWFzZSBmaXggY29tcG9uZW50IGVycm9ycyBhbmQgcmVsb2FkIHRoZSB3aG9sZSBwYWdlJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXBTdGFydCh0aGlzLl9kZWJ1Z05hbWUgKyAnIEVycm9ycycpO1xuXG4gICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgY29uc29sZS53YXJuKHRoaXMuX2RlYnVnTmFtZSArICcgY291bGQgbm90IGJlIGhvdC1sb2FkZWQgYmVjYXVzZSBpdCBoYXMgYW4gZXJyb3InKTtcblxuICAgICAgICAvL3Jlc29sdmUgdG8gcHJldmlvdXMgd29ya2luZyB2ZXJzaW9uIG9mIGNvbXBvbmVudFxuICAgICAgICB0aGlzLnByb3h5VGFyZ2V0ID0gbmV3IHJiKG9wdGlvbnMpO1xuICAgICAgICBjb25zb2xlLmluZm8oJyVjJyArIHRoaXMuX2RlYnVnTmFtZSArICcgcm9sbGVkIGJhY2sgdG8gcHJldmlvdXMgd29ya2luZyB2ZXJzaW9uJywgJ2NvbG9yOmdyZWVuJyk7XG5cbiAgICAgICAgLy9zZXQgbGF0ZXN0IHZlcnNpb24gYXMgdGhlIHJvbGxlZC1iYWNrIHZlcnNpb25cbiAgICAgICAgcmVjb3JkLmNvbXBvbmVudCA9IHJiO1xuXG4gICAgICAgIGdyb3VwRW5kKCk7XG5cbiAgICAgIH1cblxuICAgICAgUmVnaXN0cnkuc2V0KHRoaXMuaWQsIHJlY29yZCk7XG5cbiAgICAgIC8vcmVnaXN0ZXIgY3VycmVudCBpbnN0YW5jZSwgc28gdGhhdFxuICAgICAgLy93ZSBjYW4gcmUtcmVuZGVyIGl0IHdoZW4gcmVxdWlyZWRcbiAgICAgIFJlZ2lzdHJ5LnJlZ2lzdGVySW5zdGFuY2UodGhpcyk7XG5cbiAgICAgIC8vcHJveHkgY3VzdG9tIG1ldGhvZHNcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0IG1ldGhvZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc2VsZi5wcm94eVRhcmdldCkpO1xuICAgICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBpZiAoIWhhbmRsZWRNZXRob2RzLmluY2x1ZGVzKG1ldGhvZCkgJiYgIWZvcndhcmRlZE1ldGhvZHMuaW5jbHVkZXMobWV0aG9kKSkge1xuICAgICAgICAgIHNlbGZbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYucHJveHlUYXJnZXRbbWV0aG9kXS5hcHBseShzZWxmLnByb3h5VGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyhyZSlleHBvc2UgcHJvcGVydGllcyB0aGF0IG1pZ2h0IGJlIHVzZWQgZnJvbSBvdXRzaWRlXG4gICAgICB0aGlzLnJlZnMgPSB0aGlzLnByb3h5VGFyZ2V0LnJlZnMgfHwge307XG4gICAgICB0aGlzLl9mcmFnbWVudCA9IHRoaXMucHJveHlUYXJnZXQuX2ZyYWdtZW50O1xuICAgICAgdGhpcy5fc2xvdHRlZCA9IHRoaXMucHJveHlUYXJnZXQuX3Nsb3R0ZWQ7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLnByb3h5VGFyZ2V0LnJvb3Q7XG4gICAgICB0aGlzLnN0b3JlID0gdGhpcy5wcm94eVRhcmdldC5zdG9yZSB8fCBudWxsO1xuICAgIH1cblxuICAgIF9yZXJlbmRlcigpIHtcbiAgICAgIGNvbnN0IG1vdW50cG9pbnQgPSB0aGlzLl9fbW91bnRwb2ludCB8fCBudWxsLFxuICAgICAgICBhbmNob3IgPSB0aGlzLl9fYW5jaG9yIHx8IG51bGwsXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLnByb3h5VGFyZ2V0Lm9wdGlvbnMsXG4gICAgICAgIG9sZHN0YXRlID0gdGhpcy5nZXQoKSxcbiAgICAgICAgaXNNb3VudGVkID0gdGhpcy5fX21vdW50ZWQsXG4gICAgICAgIGluc2VydGlvblBvaW50ID0gdGhpcy5fX2luc2VydGlvblBvaW50LFxuICAgICAgICBoYW5kbGVycyA9IHRoaXMucHJveHlUYXJnZXQuX2hhbmRsZXJzO1xuXG4gICAgICB0aGlzLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyKG9wdGlvbnMpO1xuXG4gICAgICAvL3JlLWF0dGFjaCBldmVudCBoYW5kbGVyc1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBmb3IgKGNvbnN0IGV2IGluIGhhbmRsZXJzKSB7XG4gICAgICAgIGNvbnN0IF9oYW5kbGVycyA9IGhhbmRsZXJzW2V2XTtcbiAgICAgICAgX2hhbmRsZXJzLmZvckVhY2ggKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpZiAoaXRlbS50b1N0cmluZygpLmluY2x1ZGVzKCdjb21wb25lbnQuZmlyZSgnKSkge1xuICAgICAgICAgICAgc2VsZi5wcm94eVRhcmdldC5vbihldiwgaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdW50cG9pbnQgJiYgaXNNb3VudGVkKSB7XG4gICAgICAgIHRoaXMucHJveHlUYXJnZXQuX2ZyYWdtZW50LmMoKTtcbiAgICAgICAgdGhpcy5fbW91bnQobW91bnRwb2ludCwgYW5jaG9yLCBpbnNlcnRpb25Qb2ludCk7XG5cbiAgICAgICAgLy93b3JrIGFyb3VuZCBfY2hlY2tSZWFkT25seSBpbiBzdmVsdGUgKGZvciBjb21wdXRlZCBwcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLnByb3h5VGFyZ2V0Ll91cGRhdGluZ1JlYWRvbmx5UHJvcGVydHkgPSB0cnVlO1xuXG4gICAgICAgIC8vcHJlc2VydmUgbG9jYWwgc3RhdGUgKHVubGVzcyBub1ByZXNlcnZlU3RhdGUgaXMgdHJ1ZSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgICF0aGlzLnByb3h5VGFyZ2V0LmNvbnN0cnVjdG9yLm5vUHJlc2VydmVTdGF0ZVxuICAgICAgICAgICYmICFwcm94eU9wdGlvbnMubm9QcmVzZXJ2ZVN0YXRlKSB7XG5cbiAgICAgICAgICAvL21hbnVhbGx5IGZsdXNoIGNvbXB1dGF0aW9ucyBhbmQgcmUtcmVuZGVyIGNoYW5nZXNcbiAgICAgICAgICBsZXQgY2hhbmdlZCA9IHt9O1xuICAgICAgICAgIGZvciAobGV0IGsgaW4gb2xkc3RhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZWRba10gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnByb3h5VGFyZ2V0Ll9yZWNvbXB1dGUoY2hhbmdlZCwgb2xkc3RhdGUpO1xuICAgICAgICAgIHRoaXMucHJveHlUYXJnZXQuX2ZyYWdtZW50ICYmIHRoaXMucHJveHlUYXJnZXQuX2ZyYWdtZW50LnAoY2hhbmdlZCwgb2xkc3RhdGUpO1xuXG4gICAgICAgICAgLy9zZXQgb2xkIHN0YXRlIGJhY2tcbiAgICAgICAgICB0aGlzLnNldChvbGRzdGF0ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIC8vd2UgaGF2ZSB0byBjYWxsIC5zZXQoKSBoZXJlXG4gICAgICAgICAgLy9vdGhlcndpc2Ugb25jcmVhdGUgaXMgbm90IGZpcmVkXG4gICAgICAgICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJveHlUYXJnZXQuX3VwZGF0aW5nUmVhZG9ubHlQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLSBFTkQgZXh0cmEgbWV0aG9kcyAtLS0tXG4gIH1cblxuICAvL2ZvcndhcmQgc3RhdGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcbiAgY29uc3Qgb3JpZ2luYWxDb21wb25lbnQgPSBSZWdpc3RyeS5nZXQoaWQpLmNvbXBvbmVudDtcbiAgZm9yIChsZXQga2V5IGluIG9yaWdpbmFsQ29tcG9uZW50KSB7XG4gICAgcHJveHlDb21wb25lbnRba2V5XSA9IG9yaWdpbmFsQ29tcG9uZW50W2tleV07XG4gIH1cblxuICByZXR1cm4gcHJveHlDb21wb25lbnQ7XG59XG4iLCJcbmNsYXNzIHJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faXRlbXMgPSB7fTtcbiAgfVxuXG4gIHNldChrLCB2KSB7XG4gICAgdGhpcy5faXRlbXNba10gPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIHJvbGxiYWNrOiBudWxsLFxuICAgICAgY29tcG9uZW50OiBudWxsLFxuICAgICAgaW5zdGFuY2VzOiBbXVxuICAgIH0sIHYpO1xuICB9XG5cbiAgZ2V0KGspIHtcbiAgICByZXR1cm4gayA/IHRoaXMuX2l0ZW1zW2tdIHx8IHVuZGVmaW5lZCA6IHRoaXMuX2l0ZW1zO1xuICB9XG5cbiAgcmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIGNvbnN0IGlkID0gaW5zdGFuY2UuaWQ7XG4gICAgdGhpcy5faXRlbXNbaWRdICYmIHRoaXMuX2l0ZW1zW2lkXS5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG4gIH1cblxuICBkZVJlZ2lzdGVySW5zdGFuY2UoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBpZCA9IGluc3RhbmNlLmlkO1xuICAgIHRoaXMuX2l0ZW1zW2lkXSAmJiB0aGlzLl9pdGVtc1tpZF0uaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24oY29tcCwgaWR4LCBpbnN0YW5jZXMpIHtcbiAgICAgIGlmIChjb21wID09IGluc3RhbmNlKSB7XG4gICAgICAgIGluc3RhbmNlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jb25zdCBjb21wb25lbnRSZWdpc3RyeSA9ICh3aW5kb3cuX19TVkVMVEVfUkVHSVNUUllfXyA9IG5ldyByZWdpc3RyeSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudFJlZ2lzdHJ5OyIsImltcG9ydCB7IFJlZ2lzdHJ5LCBjb25maWd1cmUgYXMgY29uZmlndXJlUHJveHksIGNyZWF0ZVByb3h5IH0gZnJvbSAnc3ZlbHRlLWRldi1oZWxwZXInO1xuXG5sZXQgaG90T3B0aW9ucyA9IHtcblx0bm9QcmVzZXJ2ZVN0YXRlOiBmYWxzZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShvcHRpb25zKSB7XG5cdGhvdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGhvdE9wdGlvbnMsIG9wdGlvbnMpO1xuXHRjb25maWd1cmVQcm94eShob3RPcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKGlkLCBjb21wb25lbnQpIHtcblxuXHQvL3N0b3JlIG9yaWdpbmFsIGNvbXBvbmVudCBpbiByZWdpc3RyeVxuXHRSZWdpc3RyeS5zZXQoaWQsIHtcblx0XHRyb2xsYmFjazogbnVsbCxcblx0XHRjb21wb25lbnQsXG5cdFx0aW5zdGFuY2VzOiBbXVxuXHR9KTtcblxuXHQvL2NyZWF0ZSB0aGUgcHJveHkgaXRzZWxmXG5cdGNvbnN0IHByb3h5ID0gY3JlYXRlUHJveHkoaWQpO1xuXG5cdC8vcGF0Y2ggdGhlIHJlZ2lzdHJ5IHJlY29yZCB3aXRoIHByb3h5IGNvbnN0cnVjdG9yXG5cdGNvbnN0IHJlY29yZCA9IFJlZ2lzdHJ5LmdldChpZCk7XG5cdHJlY29yZC5wcm94eSA9IHByb3h5O1xuXHRSZWdpc3RyeS5zZXQoaWQsIHJlY29yZCk7XG5cblx0cmV0dXJuIHByb3h5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsb2FkKGlkLCBjb21wb25lbnQpIHtcblxuXHRjb25zdCByZWNvcmQgPSBSZWdpc3RyeS5nZXQoaWQpO1xuXG5cdC8va2VlcCByZWZlcmVuY2UgdG8gcHJldmlvdXMgdmVyc2lvbiB0byBlbmFibGUgcm9sbGJhY2tcblx0cmVjb3JkLnJvbGxiYWNrID0gcmVjb3JkLmNvbXBvbmVudDtcblxuXHQvL3JlcGxhY2UgY29tcG9uZW50IGluIHJlZ2lzdHJ5IHdpdGggbmV3bHkgbG9hZGVkIGNvbXBvbmVudFxuXHRyZWNvcmQuY29tcG9uZW50ID0gY29tcG9uZW50O1xuXG5cdFJlZ2lzdHJ5LnNldChpZCwgcmVjb3JkKTtcblxuXHQvL3JlLXJlbmRlciB0aGUgcHJveHkgaW5zdGFuY2VzXG5cdHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG5cdFx0aW5zdGFuY2UgJiYgaW5zdGFuY2UuX3JlcmVuZGVyKCk7XG5cdH0pO1xuXG5cdC8vcmV0dXJuIHRoZSBvcmlnaW5hbCBwcm94eSBjb25zdHJ1Y3RvciB0aGF0IHdhcyBgcmVnaXN0ZXIoKWAtZWRcblx0cmV0dXJuIHJlY29yZC5wcm94eTtcbn0iLCJmdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG5cdGZvciAodmFyIGsgaW4gc3JjKSB0YXJba10gPSBzcmNba107XG5cdHJldHVybiB0YXI7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblRydWUodGFyLCBzcmMpIHtcblx0Zm9yICh2YXIgayBpbiBzcmMpIHRhcltrXSA9IDE7XG5cdHJldHVybiB0YXI7XG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGNhbGxBZnRlcihmbiwgaSkge1xuXHRpZiAoaSA9PT0gMCkgZm4oKTtcblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIS0taSkgZm4oKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkTG9jKGVsZW1lbnQsIGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhcikge1xuXHRlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG5cdFx0bG9jOiB7IGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhciB9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGV4Y2x1ZGUoc3JjLCBwcm9wKSB7XG5cdGNvbnN0IHRhciA9IHt9O1xuXHRmb3IgKGNvbnN0IGsgaW4gc3JjKSBrID09PSBwcm9wIHx8ICh0YXJba10gPSBzcmNba10pO1xuXHRyZXR1cm4gdGFyO1xufVxuXG5mdW5jdGlvbiBydW4oZm4pIHtcblx0Zm4oKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuXHR0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuXHR0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvcik7XG59XG5cbmZ1bmN0aW9uIGRldGFjaE5vZGUobm9kZSkge1xuXHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5cbmZ1bmN0aW9uIGRldGFjaEJldHdlZW4oYmVmb3JlLCBhZnRlcikge1xuXHR3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcblx0XHRiZWZvcmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiZWZvcmUubmV4dFNpYmxpbmcpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRldGFjaEJlZm9yZShhZnRlcikge1xuXHR3aGlsZSAoYWZ0ZXIucHJldmlvdXNTaWJsaW5nKSB7XG5cdFx0YWZ0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRldGFjaEFmdGVyKGJlZm9yZSkge1xuXHR3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB7XG5cdFx0YmVmb3JlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmVmb3JlLm5leHRTaWJsaW5nKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZWluc2VydEJldHdlZW4oYmVmb3JlLCBhZnRlciwgdGFyZ2V0KSB7XG5cdHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcgJiYgYmVmb3JlLm5leHRTaWJsaW5nICE9PSBhZnRlcikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChiZWZvcmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiZWZvcmUubmV4dFNpYmxpbmcpKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZWluc2VydENoaWxkcmVuKHBhcmVudCwgdGFyZ2V0KSB7XG5cdHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkgdGFyZ2V0LmFwcGVuZENoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbn1cblxuZnVuY3Rpb24gcmVpbnNlcnRBZnRlcihiZWZvcmUsIHRhcmdldCkge1xuXHR3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB0YXJnZXQuYXBwZW5kQ2hpbGQoYmVmb3JlLm5leHRTaWJsaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVpbnNlcnRCZWZvcmUoYWZ0ZXIsIHRhcmdldCkge1xuXHR2YXIgcGFyZW50ID0gYWZ0ZXIucGFyZW50Tm9kZTtcblx0d2hpbGUgKHBhcmVudC5maXJzdENoaWxkICE9PSBhZnRlcikgdGFyZ2V0LmFwcGVuZENoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbn1cblxuZnVuY3Rpb24gZGVzdHJveUVhY2goaXRlcmF0aW9ucywgZGV0YWNoKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChpdGVyYXRpb25zW2ldKSBpdGVyYXRpb25zW2ldLmQoZGV0YWNoKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudCgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChuYW1lKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTdmdFbGVtZW50KG5hbWUpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dChkYXRhKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudCgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJycpO1xufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuXHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuXHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0ZWxzZSBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG5cdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0aWYgKGtleSA9PT0gJ3N0eWxlJykge1xuXHRcdFx0bm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuXHRcdH0gZWxzZSBpZiAoa2V5IGluIG5vZGUpIHtcblx0XHRcdG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0QXR0cmlidXRlKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0Q3VzdG9tRWxlbWVudERhdGEobm9kZSwgcHJvcCwgdmFsdWUpIHtcblx0aWYgKHByb3AgaW4gbm9kZSkge1xuXHRcdG5vZGVbcHJvcF0gPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRzZXRBdHRyaWJ1dGUobm9kZSwgcHJvcCwgdmFsdWUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFhsaW5rQXR0cmlidXRlKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcblx0bm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBnZXRCaW5kaW5nR3JvdXBWYWx1ZShncm91cCkge1xuXHR2YXIgdmFsdWUgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChncm91cFtpXS5jaGVja2VkKSB2YWx1ZS5wdXNoKGdyb3VwW2ldLl9fdmFsdWUpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlID09PSAnJyA/IHVuZGVmaW5lZCA6ICt2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdGltZVJhbmdlc1RvQXJyYXkocmFuZ2VzKSB7XG5cdHZhciBhcnJheSA9IFtdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbiAoZWxlbWVudCkge1xuXHRyZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuXG5mdW5jdGlvbiBjbGFpbUVsZW1lbnQgKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBub2RlID0gbm9kZXNbaV07XG5cdFx0aWYgKG5vZGUubm9kZU5hbWUgPT09IG5hbWUpIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaiArPSAxKSB7XG5cdFx0XHRcdHZhciBhdHRyaWJ1dGUgPSBub2RlLmF0dHJpYnV0ZXNbal07XG5cdFx0XHRcdGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07IC8vIFRPRE8gc3RyaXAgdW53YW50ZWQgYXR0cmlidXRlc1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdmcgPyBjcmVhdGVTdmdFbGVtZW50KG5hbWUpIDogY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cblxuZnVuY3Rpb24gY2xhaW1UZXh0IChub2RlcywgZGF0YSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIG5vZGUgPSBub2Rlc1tpXTtcblx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0bm9kZS5kYXRhID0gZGF0YTtcblx0XHRcdHJldHVybiBub2Rlcy5zcGxpY2UoaSwgMSlbMF07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNyZWF0ZVRleHQoZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHNldERhdGEodGV4dCwgZGF0YSkge1xuXHR0ZXh0LmRhdGEgPSAnJyArIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHNldElucHV0VHlwZShpbnB1dCwgdHlwZSkge1xuXHR0cnkge1xuXHRcdGlucHV0LnR5cGUgPSB0eXBlO1xuXHR9IGNhdGNoIChlKSB7fVxufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShub2RlLCBrZXksIHZhbHVlKSB7XG5cdG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdE9wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG5cblx0XHRpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG5cdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzZWxlY3RPcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcblx0XHRvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0VmFsdWUoc2VsZWN0KSB7XG5cdHZhciBzZWxlY3RlZE9wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuXHRyZXR1cm4gc2VsZWN0ZWRPcHRpb24gJiYgc2VsZWN0ZWRPcHRpb24uX192YWx1ZTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TXVsdGlwbGVWYWx1ZShzZWxlY3QpIHtcblx0cmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gb3B0aW9uLl9fdmFsdWU7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRSZXNpemVMaXN0ZW5lcihlbGVtZW50LCBmbikge1xuXHRpZiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcblx0XHRlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblx0fVxuXG5cdGNvbnN0IG9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xuXHRvYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG92ZXJmbG93OiBoaWRkZW47IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTsnKTtcblx0b2JqZWN0LnR5cGUgPSAndGV4dC9odG1sJztcblxuXHRsZXQgd2luO1xuXG5cdG9iamVjdC5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0d2luID0gb2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0Vmlldztcblx0XHR3aW4uYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZm4pO1xuXHR9O1xuXG5cdGlmICgvVHJpZGVudC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcblx0XHRvYmplY3QuZGF0YSA9ICdhYm91dDpibGFuayc7XG5cdH0gZWxzZSB7XG5cdFx0b2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuXHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQob2JqZWN0KTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y2FuY2VsOiAoKSA9PiB7XG5cdFx0XHR3aW4gJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZuKTtcblx0XHRcdGVsZW1lbnQucmVtb3ZlQ2hpbGQob2JqZWN0KTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuXHRlbGVtZW50LmNsYXNzTGlzdFt0b2dnbGUgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbn1cblxuZnVuY3Rpb24gbGluZWFyKHQpIHtcblx0cmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUnVsZSh7IGEsIGIsIGRlbHRhLCBkdXJhdGlvbiB9LCBlYXNlLCBmbikge1xuXHRjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XG5cdGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG5cblx0Zm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG5cdFx0Y29uc3QgdCA9IGEgKyBkZWx0YSAqIGVhc2UocCk7XG5cdFx0a2V5ZnJhbWVzICs9IHAgKiAxMDAgKyBgJXske2ZuKHQsIDEgLSB0KX19XFxuYDtcblx0fVxuXG5cdHJldHVybiBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xufVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFya3NreWFwcC9zdHJpbmctaGFzaC9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaGFzaChzdHIpIHtcblx0bGV0IGhhc2ggPSA1MzgxO1xuXHRsZXQgaSA9IHN0ci5sZW5ndGg7XG5cblx0d2hpbGUgKGktLSkgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG5cdHJldHVybiBoYXNoID4+PiAwO1xufVxuXG5mdW5jdGlvbiB3cmFwVHJhbnNpdGlvbihjb21wb25lbnQsIG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG5cdGxldCBvYmogPSBmbi5jYWxsKGNvbXBvbmVudCwgbm9kZSwgcGFyYW1zKTtcblx0bGV0IGR1cmF0aW9uO1xuXHRsZXQgZWFzZTtcblx0bGV0IGNzc1RleHQ7XG5cblx0bGV0IGluaXRpYWxpc2VkID0gZmFsc2U7XG5cblx0cmV0dXJuIHtcblx0XHR0OiBpbnRybyA/IDAgOiAxLFxuXHRcdHJ1bm5pbmc6IGZhbHNlLFxuXHRcdHByb2dyYW06IG51bGwsXG5cdFx0cGVuZGluZzogbnVsbCxcblxuXHRcdHJ1bihiLCBjYWxsYmFjaykge1xuXHRcdFx0aWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIud2FpdCgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdG9iaiA9IG9iaigpO1xuXHRcdFx0XHRcdHRoaXMuX3J1bihiLCBjYWxsYmFjayk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcnVuKGIsIGNhbGxiYWNrKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X3J1bihiLCBjYWxsYmFjaykge1xuXHRcdFx0ZHVyYXRpb24gPSBvYmouZHVyYXRpb24gfHwgMzAwO1xuXHRcdFx0ZWFzZSA9IG9iai5lYXNpbmcgfHwgbGluZWFyO1xuXG5cdFx0XHRjb25zdCBwcm9ncmFtID0ge1xuXHRcdFx0XHRzdGFydDogd2luZG93LnBlcmZvcm1hbmNlLm5vdygpICsgKG9iai5kZWxheSB8fCAwKSxcblx0XHRcdFx0Yixcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrIHx8IG5vb3Bcblx0XHRcdH07XG5cblx0XHRcdGlmIChpbnRybyAmJiAhaW5pdGlhbGlzZWQpIHtcblx0XHRcdFx0aWYgKG9iai5jc3MgJiYgb2JqLmRlbGF5KSB7XG5cdFx0XHRcdFx0Y3NzVGV4dCA9IG5vZGUuc3R5bGUuY3NzVGV4dDtcblx0XHRcdFx0XHRub2RlLnN0eWxlLmNzc1RleHQgKz0gb2JqLmNzcygwLCAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvYmoudGljaykgb2JqLnRpY2soMCwgMSk7XG5cdFx0XHRcdGluaXRpYWxpc2VkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFiKSB7XG5cdFx0XHRcdHByb2dyYW0uZ3JvdXAgPSBvdXRyb3MuY3VycmVudDtcblx0XHRcdFx0b3V0cm9zLmN1cnJlbnQucmVtYWluaW5nICs9IDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvYmouZGVsYXkpIHtcblx0XHRcdFx0dGhpcy5wZW5kaW5nID0gcHJvZ3JhbTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc3RhcnQocHJvZ3JhbSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5ydW5uaW5nKSB7XG5cdFx0XHRcdHRoaXMucnVubmluZyA9IHRydWU7XG5cdFx0XHRcdHRyYW5zaXRpb25NYW5hZ2VyLmFkZCh0aGlzKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c3RhcnQocHJvZ3JhbSkge1xuXHRcdFx0Y29tcG9uZW50LmZpcmUoYCR7cHJvZ3JhbS5iID8gJ2ludHJvJyA6ICdvdXRybyd9LnN0YXJ0YCwgeyBub2RlIH0pO1xuXG5cdFx0XHRwcm9ncmFtLmEgPSB0aGlzLnQ7XG5cdFx0XHRwcm9ncmFtLmRlbHRhID0gcHJvZ3JhbS5iIC0gcHJvZ3JhbS5hO1xuXHRcdFx0cHJvZ3JhbS5kdXJhdGlvbiA9IGR1cmF0aW9uICogTWF0aC5hYnMocHJvZ3JhbS5iIC0gcHJvZ3JhbS5hKTtcblx0XHRcdHByb2dyYW0uZW5kID0gcHJvZ3JhbS5zdGFydCArIHByb2dyYW0uZHVyYXRpb247XG5cblx0XHRcdGlmIChvYmouY3NzKSB7XG5cdFx0XHRcdGlmIChvYmouZGVsYXkpIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHQ7XG5cblx0XHRcdFx0Y29uc3QgcnVsZSA9IGdlbmVyYXRlUnVsZShwcm9ncmFtLCBlYXNlLCBvYmouY3NzKTtcblx0XHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIuYWRkUnVsZShydWxlLCBwcm9ncmFtLm5hbWUgPSAnX19zdmVsdGVfJyArIGhhc2gocnVsZSkpO1xuXG5cdFx0XHRcdG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKVxuXHRcdFx0XHRcdC5zcGxpdCgnLCAnKVxuXHRcdFx0XHRcdC5maWx0ZXIoYW5pbSA9PiBhbmltICYmIChwcm9ncmFtLmRlbHRhIDwgMCB8fCAhL19fc3ZlbHRlLy50ZXN0KGFuaW0pKSlcblx0XHRcdFx0XHQuY29uY2F0KGAke3Byb2dyYW0ubmFtZX0gJHtwcm9ncmFtLmR1cmF0aW9ufW1zIGxpbmVhciAxIGZvcndhcmRzYClcblx0XHRcdFx0XHQuam9pbignLCAnKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcm9ncmFtID0gcHJvZ3JhbTtcblx0XHRcdHRoaXMucGVuZGluZyA9IG51bGw7XG5cdFx0fSxcblxuXHRcdHVwZGF0ZShub3cpIHtcblx0XHRcdGNvbnN0IHByb2dyYW0gPSB0aGlzLnByb2dyYW07XG5cdFx0XHRpZiAoIXByb2dyYW0pIHJldHVybjtcblxuXHRcdFx0Y29uc3QgcCA9IG5vdyAtIHByb2dyYW0uc3RhcnQ7XG5cdFx0XHR0aGlzLnQgPSBwcm9ncmFtLmEgKyBwcm9ncmFtLmRlbHRhICogZWFzZShwIC8gcHJvZ3JhbS5kdXJhdGlvbik7XG5cdFx0XHRpZiAob2JqLnRpY2spIG9iai50aWNrKHRoaXMudCwgMSAtIHRoaXMudCk7XG5cdFx0fSxcblxuXHRcdGRvbmUoKSB7XG5cdFx0XHRjb25zdCBwcm9ncmFtID0gdGhpcy5wcm9ncmFtO1xuXHRcdFx0dGhpcy50ID0gcHJvZ3JhbS5iO1xuXG5cdFx0XHRpZiAob2JqLnRpY2spIG9iai50aWNrKHRoaXMudCwgMSAtIHRoaXMudCk7XG5cblx0XHRcdGNvbXBvbmVudC5maXJlKGAke3Byb2dyYW0uYiA/ICdpbnRybycgOiAnb3V0cm8nfS5lbmRgLCB7IG5vZGUgfSk7XG5cblx0XHRcdGlmICghcHJvZ3JhbS5iICYmICFwcm9ncmFtLmludmFsaWRhdGVkKSB7XG5cdFx0XHRcdHByb2dyYW0uZ3JvdXAuY2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRcdHByb2dyYW0uY2FsbGJhY2soKTtcblx0XHRcdFx0XHRpZiAob2JqLmNzcykgdHJhbnNpdGlvbk1hbmFnZXIuZGVsZXRlUnVsZShub2RlLCBwcm9ncmFtLm5hbWUpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoLS1wcm9ncmFtLmdyb3VwLnJlbWFpbmluZyA9PT0gMCkge1xuXHRcdFx0XHRcdHByb2dyYW0uZ3JvdXAuY2FsbGJhY2tzLmZvckVhY2gocnVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG9iai5jc3MpIHRyYW5zaXRpb25NYW5hZ2VyLmRlbGV0ZVJ1bGUobm9kZSwgcHJvZ3JhbS5uYW1lKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5ydW5uaW5nID0gISF0aGlzLnBlbmRpbmc7XG5cdFx0fSxcblxuXHRcdGFib3J0KHJlc2V0KSB7XG5cdFx0XHRpZiAodGhpcy5wcm9ncmFtKSB7XG5cdFx0XHRcdGlmIChyZXNldCAmJiBvYmoudGljaykgb2JqLnRpY2soMSwgMCk7XG5cdFx0XHRcdGlmIChvYmouY3NzKSB0cmFuc2l0aW9uTWFuYWdlci5kZWxldGVSdWxlKG5vZGUsIHRoaXMucHJvZ3JhbS5uYW1lKTtcblx0XHRcdFx0dGhpcy5wcm9ncmFtID0gdGhpcy5wZW5kaW5nID0gbnVsbDtcblx0XHRcdFx0dGhpcy5ydW5uaW5nID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGludmFsaWRhdGUoKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9ncmFtKSB7XG5cdFx0XHRcdHRoaXMucHJvZ3JhbS5pbnZhbGlkYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5sZXQgb3V0cm9zID0ge307XG5cbmZ1bmN0aW9uIGdyb3VwT3V0cm9zKCkge1xuXHRvdXRyb3MuY3VycmVudCA9IHtcblx0XHRyZW1haW5pbmc6IDAsXG5cdFx0Y2FsbGJhY2tzOiBbXVxuXHR9O1xufVxuXG52YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSB7XG5cdHJ1bm5pbmc6IGZhbHNlLFxuXHR0cmFuc2l0aW9uczogW10sXG5cdGJvdW5kOiBudWxsLFxuXHRzdHlsZXNoZWV0OiBudWxsLFxuXHRhY3RpdmVSdWxlczoge30sXG5cdHByb21pc2U6IG51bGwsXG5cblx0YWRkKHRyYW5zaXRpb24pIHtcblx0XHR0aGlzLnRyYW5zaXRpb25zLnB1c2godHJhbnNpdGlvbik7XG5cblx0XHRpZiAoIXRoaXMucnVubmluZykge1xuXHRcdFx0dGhpcy5ydW5uaW5nID0gdHJ1ZTtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmJvdW5kIHx8ICh0aGlzLmJvdW5kID0gdGhpcy5uZXh0LmJpbmQodGhpcykpKTtcblx0XHR9XG5cdH0sXG5cblx0YWRkUnVsZShydWxlLCBuYW1lKSB7XG5cdFx0aWYgKCF0aGlzLnN0eWxlc2hlZXQpIHtcblx0XHRcdGNvbnN0IHN0eWxlID0gY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIuc3R5bGVzaGVldCA9IHN0eWxlLnNoZWV0O1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5hY3RpdmVSdWxlc1tuYW1lXSkge1xuXHRcdFx0dGhpcy5hY3RpdmVSdWxlc1tuYW1lXSA9IHRydWU7XG5cdFx0XHR0aGlzLnN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCB0aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcblx0XHR9XG5cdH0sXG5cblx0bmV4dCgpIHtcblx0XHR0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcblxuXHRcdGNvbnN0IG5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHRsZXQgaSA9IHRoaXMudHJhbnNpdGlvbnMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0Y29uc3QgdHJhbnNpdGlvbiA9IHRoaXMudHJhbnNpdGlvbnNbaV07XG5cblx0XHRcdGlmICh0cmFuc2l0aW9uLnByb2dyYW0gJiYgbm93ID49IHRyYW5zaXRpb24ucHJvZ3JhbS5lbmQpIHtcblx0XHRcdFx0dHJhbnNpdGlvbi5kb25lKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0cmFuc2l0aW9uLnBlbmRpbmcgJiYgbm93ID49IHRyYW5zaXRpb24ucGVuZGluZy5zdGFydCkge1xuXHRcdFx0XHR0cmFuc2l0aW9uLnN0YXJ0KHRyYW5zaXRpb24ucGVuZGluZyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0cmFuc2l0aW9uLnJ1bm5pbmcpIHtcblx0XHRcdFx0dHJhbnNpdGlvbi51cGRhdGUobm93KTtcblx0XHRcdFx0dGhpcy5ydW5uaW5nID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoIXRyYW5zaXRpb24ucGVuZGluZykge1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25zLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5ydW5uaW5nKSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5ib3VuZCk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnN0eWxlc2hlZXQpIHtcblx0XHRcdGxldCBpID0gdGhpcy5zdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpLS0pIHRoaXMuc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuXHRcdFx0dGhpcy5hY3RpdmVSdWxlcyA9IHt9O1xuXHRcdH1cblx0fSxcblxuXHRkZWxldGVSdWxlKG5vZGUsIG5hbWUpIHtcblx0XHRub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uXG5cdFx0XHQuc3BsaXQoJywgJylcblx0XHRcdC5maWx0ZXIoYW5pbSA9PiBhbmltICYmIGFuaW0uaW5kZXhPZihuYW1lKSA9PT0gLTEpXG5cdFx0XHQuam9pbignLCAnKTtcblx0fSxcblxuXHR3YWl0KCkge1xuXHRcdGlmICghdHJhbnNpdGlvbk1hbmFnZXIucHJvbWlzZSkge1xuXHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIucHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIucHJvbWlzZS50aGVuKCgpID0+IHtcblx0XHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIucHJvbWlzZSA9IG51bGw7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJhbnNpdGlvbk1hbmFnZXIucHJvbWlzZTtcblx0fVxufTtcblxuZnVuY3Rpb24gd3JhcEFuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG5cdGlmICghZnJvbSkgcmV0dXJuO1xuXG5cdGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0aWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pIHJldHVybjtcblxuXHRjb25zdCBpbmZvID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuXG5cdGNvbnN0IGR1cmF0aW9uID0gJ2R1cmF0aW9uJyBpbiBpbmZvID8gaW5mby5kdXJhdGlvbiA6IDMwMDtcblx0Y29uc3QgZGVsYXkgPSAnZGVsYXknIGluIGluZm8gPyBpbmZvLmRlbGF5IDogMDtcblx0Y29uc3QgZWFzZSA9IGluZm8uZWFzaW5nIHx8IGxpbmVhcjtcblx0Y29uc3Qgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgKyBkZWxheTtcblx0Y29uc3QgZW5kID0gc3RhcnQgKyBkdXJhdGlvbjtcblxuXHRjb25zdCBwcm9ncmFtID0ge1xuXHRcdGE6IDAsXG5cdFx0dDogMCxcblx0XHRiOiAxLFxuXHRcdGRlbHRhOiAxLFxuXHRcdGR1cmF0aW9uLFxuXHRcdHN0YXJ0LFxuXHRcdGVuZFxuXHR9O1xuXG5cdGNvbnN0IGNzc1RleHQgPSBub2RlLnN0eWxlLmNzc1RleHQ7XG5cblx0Y29uc3QgYW5pbWF0aW9uID0ge1xuXHRcdHBlbmRpbmc6IGRlbGF5ID8gcHJvZ3JhbSA6IG51bGwsXG5cdFx0cHJvZ3JhbTogZGVsYXkgPyBudWxsIDogcHJvZ3JhbSxcblx0XHRydW5uaW5nOiB0cnVlLFxuXG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRpZiAoaW5mby5jc3MpIHtcblx0XHRcdFx0aWYgKGRlbGF5KSBub2RlLnN0eWxlLmNzc1RleHQgPSBjc3NUZXh0O1xuXG5cdFx0XHRcdGNvbnN0IHJ1bGUgPSBnZW5lcmF0ZVJ1bGUocHJvZ3JhbSwgZWFzZSwgaW5mby5jc3MpO1xuXHRcdFx0XHRwcm9ncmFtLm5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfWA7XG5cblx0XHRcdFx0dHJhbnNpdGlvbk1hbmFnZXIuYWRkUnVsZShydWxlLCBwcm9ncmFtLm5hbWUpO1xuXG5cdFx0XHRcdG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKVxuXHRcdFx0XHRcdC5zcGxpdCgnLCAnKVxuXHRcdFx0XHRcdC5maWx0ZXIoYW5pbSA9PiBhbmltICYmIChwcm9ncmFtLmRlbHRhIDwgMCB8fCAhL19fc3ZlbHRlLy50ZXN0KGFuaW0pKSlcblx0XHRcdFx0XHQuY29uY2F0KGAke3Byb2dyYW0ubmFtZX0gJHtwcm9ncmFtLmR1cmF0aW9ufW1zIGxpbmVhciAxIGZvcndhcmRzYClcblx0XHRcdFx0XHQuam9pbignLCAnKTtcblx0XHRcdH1cblxuXHRcdFx0YW5pbWF0aW9uLnByb2dyYW0gPSBwcm9ncmFtO1xuXHRcdFx0YW5pbWF0aW9uLnBlbmRpbmcgPSBudWxsO1xuXHRcdH0sXG5cblx0XHR1cGRhdGU6IG5vdyA9PiB7XG5cdFx0XHRjb25zdCBwID0gbm93IC0gcHJvZ3JhbS5zdGFydDtcblx0XHRcdGNvbnN0IHQgPSBwcm9ncmFtLmEgKyBwcm9ncmFtLmRlbHRhICogZWFzZShwIC8gcHJvZ3JhbS5kdXJhdGlvbik7XG5cdFx0XHRpZiAoaW5mby50aWNrKSBpbmZvLnRpY2sodCwgMSAtIHQpO1xuXHRcdH0sXG5cblx0XHRkb25lKCkge1xuXHRcdFx0aWYgKGluZm8udGljaykgaW5mby50aWNrKDEsIDApO1xuXHRcdFx0YW5pbWF0aW9uLnN0b3AoKTtcblx0XHR9LFxuXG5cdFx0c3RvcCgpIHtcblx0XHRcdGlmIChpbmZvLmNzcykgdHJhbnNpdGlvbk1hbmFnZXIuZGVsZXRlUnVsZShub2RlLCBwcm9ncmFtLm5hbWUpO1xuXHRcdFx0YW5pbWF0aW9uLnJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0dHJhbnNpdGlvbk1hbmFnZXIuYWRkKGFuaW1hdGlvbik7XG5cblx0aWYgKGluZm8udGljaykgaW5mby50aWNrKDAsIDEpO1xuXG5cdGlmIChkZWxheSkge1xuXHRcdGlmIChpbmZvLmNzcykgbm9kZS5zdHlsZS5jc3NUZXh0ICs9IGluZm8uY3NzKDAsIDEpO1xuXHR9IGVsc2Uge1xuXHRcdGFuaW1hdGlvbi5zdGFydCgpO1xuXHR9XG5cblx0cmV0dXJuIGFuaW1hdGlvbjtcbn1cblxuZnVuY3Rpb24gZml4UG9zaXRpb24obm9kZSkge1xuXHRjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cblx0aWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG5cdFx0Y29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBzdHlsZTtcblx0XHRjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0bm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0Y29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG5cdFx0XHRjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cdFx0XHRjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuXG5cdFx0XHRub2RlLnN0eWxlLnRyYW5zZm9ybSA9IGAke3RyYW5zZm9ybX0gdHJhbnNsYXRlKCR7YS5sZWZ0IC0gYi5sZWZ0fXB4LCAke2EudG9wIC0gYi50b3B9cHgpYDtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XG5cdHZhciB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcblxuXHRmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcblx0XHRpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pIHJldHVybjtcblxuXHRcdGluZm8ucmVzb2x2ZWQgPSBrZXkgJiYgeyBba2V5XTogdmFsdWUgfTtcblxuXHRcdGNvbnN0IGNoaWxkX2N0eCA9IGFzc2lnbihhc3NpZ24oe30sIGluZm8uY3R4KSwgaW5mby5yZXNvbHZlZCk7XG5cdFx0Y29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShpbmZvLmNvbXBvbmVudCwgY2hpbGRfY3R4KTtcblxuXHRcdGlmIChpbmZvLmJsb2NrKSB7XG5cdFx0XHRpZiAoaW5mby5ibG9ja3MpIHtcblx0XHRcdFx0aW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcblx0XHRcdFx0XHRpZiAoaSAhPT0gaW5kZXggJiYgYmxvY2spIHtcblx0XHRcdFx0XHRcdGdyb3VwT3V0cm9zKCk7XG5cdFx0XHRcdFx0XHRibG9jay5vKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0YmxvY2suZCgxKTtcblx0XHRcdFx0XHRcdFx0aW5mby5ibG9ja3NbaV0gPSBudWxsO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluZm8uYmxvY2suZCgxKTtcblx0XHRcdH1cblxuXHRcdFx0YmxvY2suYygpO1xuXHRcdFx0YmxvY2tbYmxvY2suaSA/ICdpJyA6ICdtJ10oaW5mby5tb3VudCgpLCBpbmZvLmFuY2hvcik7XG5cblx0XHRcdGluZm8uY29tcG9uZW50LnJvb3Quc2V0KHt9KTsgLy8gZmx1c2ggYW55IGhhbmRsZXJzIHRoYXQgd2VyZSBjcmVhdGVkXG5cdFx0fVxuXG5cdFx0aW5mby5ibG9jayA9IGJsb2NrO1xuXHRcdGlmIChpbmZvLmJsb2NrcykgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG5cdH1cblxuXHRpZiAoaXNQcm9taXNlKHByb21pc2UpKSB7XG5cdFx0cHJvbWlzZS50aGVuKHZhbHVlID0+IHtcblx0XHRcdHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcblx0XHR9LCBlcnJvciA9PiB7XG5cdFx0XHR1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG5cdFx0aWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG5cdFx0XHR1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcblx0XHRcdHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aW5mby5yZXNvbHZlZCA9IHsgW2luZm8udmFsdWVdOiBwcm9taXNlIH07XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVzdHJveUJsb2NrKGJsb2NrLCBsb29rdXApIHtcblx0YmxvY2suZCgxKTtcblx0bG9va3VwW2Jsb2NrLmtleV0gPSBudWxsO1xufVxuXG5mdW5jdGlvbiBvdXRyb0FuZERlc3Ryb3lCbG9jayhibG9jaywgbG9va3VwKSB7XG5cdGJsb2NrLm8oZnVuY3Rpb24oKSB7XG5cdFx0ZGVzdHJveUJsb2NrKGJsb2NrLCBsb29rdXApO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZml4QW5kT3V0cm9BbmREZXN0cm95QmxvY2soYmxvY2ssIGxvb2t1cCkge1xuXHRibG9jay5mKCk7XG5cdG91dHJvQW5kRGVzdHJveUJsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVLZXllZEVhY2gob2xkX2Jsb2NrcywgY29tcG9uZW50LCBjaGFuZ2VkLCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIGludHJvX21ldGhvZCwgbmV4dCwgZ2V0X2NvbnRleHQpIHtcblx0dmFyIG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcblx0dmFyIG4gPSBsaXN0Lmxlbmd0aDtcblxuXHR2YXIgaSA9IG87XG5cdHZhciBvbGRfaW5kZXhlcyA9IHt9O1xuXHR3aGlsZSAoaS0tKSBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuXG5cdHZhciBuZXdfYmxvY2tzID0gW107XG5cdHZhciBuZXdfbG9va3VwID0ge307XG5cdHZhciBkZWx0YXMgPSB7fTtcblxuXHR2YXIgaSA9IG47XG5cdHdoaWxlIChpLS0pIHtcblx0XHR2YXIgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcblx0XHR2YXIga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuXHRcdHZhciBibG9jayA9IGxvb2t1cFtrZXldO1xuXG5cdFx0aWYgKCFibG9jaykge1xuXHRcdFx0YmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhjb21wb25lbnQsIGtleSwgY2hpbGRfY3R4KTtcblx0XHRcdGJsb2NrLmMoKTtcblx0XHR9IGVsc2UgaWYgKGR5bmFtaWMpIHtcblx0XHRcdGJsb2NrLnAoY2hhbmdlZCwgY2hpbGRfY3R4KTtcblx0XHR9XG5cblx0XHRuZXdfYmxvY2tzW2ldID0gbmV3X2xvb2t1cFtrZXldID0gYmxvY2s7XG5cblx0XHRpZiAoa2V5IGluIG9sZF9pbmRleGVzKSBkZWx0YXNba2V5XSA9IE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKTtcblx0fVxuXG5cdHZhciB3aWxsX21vdmUgPSB7fTtcblx0dmFyIGRpZF9tb3ZlID0ge307XG5cblx0ZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG5cdFx0YmxvY2tbaW50cm9fbWV0aG9kXShub2RlLCBuZXh0KTtcblx0XHRsb29rdXBbYmxvY2sua2V5XSA9IGJsb2NrO1xuXHRcdG5leHQgPSBibG9jay5maXJzdDtcblx0XHRuLS07XG5cdH1cblxuXHR3aGlsZSAobyAmJiBuKSB7XG5cdFx0dmFyIG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuXHRcdHZhciBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcblx0XHR2YXIgbmV3X2tleSA9IG5ld19ibG9jay5rZXk7XG5cdFx0dmFyIG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuXG5cdFx0aWYgKG5ld19ibG9jayA9PT0gb2xkX2Jsb2NrKSB7XG5cdFx0XHQvLyBkbyBub3RoaW5nXG5cdFx0XHRuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xuXHRcdFx0by0tO1xuXHRcdFx0bi0tO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKCFuZXdfbG9va3VwW29sZF9rZXldKSB7XG5cdFx0XHQvLyByZW1vdmUgb2xkIGJsb2NrXG5cdFx0XHRkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcblx0XHRcdG8tLTtcblx0XHR9XG5cblx0XHRlbHNlIGlmICghbG9va3VwW25ld19rZXldIHx8IHdpbGxfbW92ZVtuZXdfa2V5XSkge1xuXHRcdFx0aW5zZXJ0KG5ld19ibG9jayk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoZGlkX21vdmVbb2xkX2tleV0pIHtcblx0XHRcdG8tLTtcblxuXHRcdH0gZWxzZSBpZiAoZGVsdGFzW25ld19rZXldID4gZGVsdGFzW29sZF9rZXldKSB7XG5cdFx0XHRkaWRfbW92ZVtuZXdfa2V5XSA9IHRydWU7XG5cdFx0XHRpbnNlcnQobmV3X2Jsb2NrKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aWxsX21vdmVbb2xkX2tleV0gPSB0cnVlO1xuXHRcdFx0by0tO1xuXHRcdH1cblx0fVxuXG5cdHdoaWxlIChvLS0pIHtcblx0XHR2YXIgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcblx0XHRpZiAoIW5ld19sb29rdXBbb2xkX2Jsb2NrLmtleV0pIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuXHR9XG5cblx0d2hpbGUgKG4pIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG5cblx0cmV0dXJuIG5ld19ibG9ja3M7XG59XG5cbmZ1bmN0aW9uIG1lYXN1cmUoYmxvY2tzKSB7XG5cdGNvbnN0IHJlY3RzID0ge307XG5cdGxldCBpID0gYmxvY2tzLmxlbmd0aDtcblx0d2hpbGUgKGktLSkgcmVjdHNbYmxvY2tzW2ldLmtleV0gPSBibG9ja3NbaV0ubm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0cmV0dXJuIHJlY3RzO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKGJsb2NrcywgcmVjdHMsIGZuLCBwYXJhbXMpIHtcblx0bGV0IGkgPSBibG9ja3MubGVuZ3RoO1xuXHR3aGlsZSAoaS0tKSB7XG5cdFx0Y29uc3QgYmxvY2sgPSBibG9ja3NbaV07XG5cdFx0Y29uc3QgZnJvbSA9IHJlY3RzW2Jsb2NrLmtleV07XG5cblx0XHRpZiAoIWZyb20pIGNvbnRpbnVlO1xuXHRcdGNvbnN0IHRvID0gYmxvY2subm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKSBjb250aW51ZTtcblxuXG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0U3ByZWFkVXBkYXRlKGxldmVscywgdXBkYXRlcykge1xuXHR2YXIgdXBkYXRlID0ge307XG5cblx0dmFyIHRvX251bGxfb3V0ID0ge307XG5cdHZhciBhY2NvdW50ZWRfZm9yID0ge307XG5cblx0dmFyIGkgPSBsZXZlbHMubGVuZ3RoO1xuXHR3aGlsZSAoaS0tKSB7XG5cdFx0dmFyIG8gPSBsZXZlbHNbaV07XG5cdFx0dmFyIG4gPSB1cGRhdGVzW2ldO1xuXG5cdFx0aWYgKG4pIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdGlmICghKGtleSBpbiBuKSkgdG9fbnVsbF9vdXRba2V5XSA9IDE7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBuKSB7XG5cdFx0XHRcdGlmICghYWNjb3VudGVkX2ZvcltrZXldKSB7XG5cdFx0XHRcdFx0dXBkYXRlW2tleV0gPSBuW2tleV07XG5cdFx0XHRcdFx0YWNjb3VudGVkX2ZvcltrZXldID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXZlbHNbaV0gPSBuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gbykge1xuXHRcdFx0XHRhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZvciAodmFyIGtleSBpbiB0b19udWxsX291dCkge1xuXHRcdGlmICghKGtleSBpbiB1cGRhdGUpKSB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiB1cGRhdGU7XG59XG5cbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuY29uc3QgaW52YWxpZEF0dHJpYnV0ZU5hbWVDaGFyYWN0ZXIgPSAvW1xccydcIj5cXC89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XG5cbmZ1bmN0aW9uIHNwcmVhZChhcmdzKSB7XG5cdGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcblx0bGV0IHN0ciA9ICcnO1xuXG5cdE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0aWYgKGludmFsaWRBdHRyaWJ1dGVOYW1lQ2hhcmFjdGVyLnRlc3QobmFtZSkpIHJldHVybjtcblxuXHRcdGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXHRcdGlmICh2YWx1ZSA9PT0gdHJ1ZSkgc3RyICs9IFwiIFwiICsgbmFtZTtcblxuXHRcdGNvbnN0IGVzY2FwZWQgPSBTdHJpbmcodmFsdWUpXG5cdFx0XHQucmVwbGFjZSgvXCIvZywgJyYjMzQ7Jylcblx0XHRcdC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xuXG5cdFx0c3RyICs9IFwiIFwiICsgbmFtZSArIFwiPVwiICsgSlNPTi5zdHJpbmdpZnkoZXNjYXBlZCk7XG5cdH0pO1xuXG5cdHJldHVybiBzdHI7XG59XG5cbmNvbnN0IGVzY2FwZWQgPSB7XG5cdCdcIic6ICcmcXVvdDsnLFxuXHRcIidcIjogJyYjMzk7Jyxcblx0JyYnOiAnJmFtcDsnLFxuXHQnPCc6ICcmbHQ7Jyxcblx0Jz4nOiAnJmd0Oydcbn07XG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG5cdHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuXG5mdW5jdGlvbiBlYWNoKGl0ZW1zLCBhc3NpZ24sIGZuKSB7XG5cdGxldCBzdHIgPSAnJztcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHN0ciArPSBmbihhc3NpZ24oaXRlbXNbaV0sIGkpKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufVxuXG5jb25zdCBtaXNzaW5nQ29tcG9uZW50ID0ge1xuXHRfcmVuZGVyOiAoKSA9PiAnJ1xufTtcblxuZnVuY3Rpb24gdmFsaWRhdGVTc3JDb21wb25lbnQoY29tcG9uZW50LCBuYW1lKSB7XG5cdGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuX3JlbmRlcikge1xuXHRcdGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpIG5hbWUgKz0gJyB0aGlzPXsuLi59Jztcblx0XHR0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XG5cdH1cblxuXHRyZXR1cm4gY29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBkZWJ1ZyhmaWxlLCBsaW5lLCBjb2x1bW4sIHZhbHVlcykge1xuXHRjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTtcblx0Y29uc29sZS5sb2codmFsdWVzKTtcblx0cmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBibGFua09iamVjdCgpIHtcblx0cmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3koZGV0YWNoKSB7XG5cdHRoaXMuZGVzdHJveSA9IG5vb3A7XG5cdHRoaXMuZmlyZSgnZGVzdHJveScpO1xuXHR0aGlzLnNldCA9IG5vb3A7XG5cblx0dGhpcy5fZnJhZ21lbnQuZChkZXRhY2ggIT09IGZhbHNlKTtcblx0dGhpcy5fZnJhZ21lbnQgPSBudWxsO1xuXHR0aGlzLl9zdGF0ZSA9IHt9O1xufVxuXG5mdW5jdGlvbiBkZXN0cm95RGV2KGRldGFjaCkge1xuXHRkZXN0cm95LmNhbGwodGhpcywgZGV0YWNoKTtcblx0dGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS53YXJuKCdDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkJyk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIF9kaWZmZXJzKGEsIGIpIHtcblx0cmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxuXG5mdW5jdGlvbiBfZGlmZmVyc0ltbXV0YWJsZShhLCBiKSB7XG5cdHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuXG5mdW5jdGlvbiBmaXJlKGV2ZW50TmFtZSwgZGF0YSkge1xuXHR2YXIgaGFuZGxlcnMgPVxuXHRcdGV2ZW50TmFtZSBpbiB0aGlzLl9oYW5kbGVycyAmJiB0aGlzLl9oYW5kbGVyc1tldmVudE5hbWVdLnNsaWNlKCk7XG5cdGlmICghaGFuZGxlcnMpIHJldHVybjtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIGhhbmRsZXIgPSBoYW5kbGVyc1tpXTtcblxuXHRcdGlmICghaGFuZGxlci5fX2NhbGxpbmcpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGhhbmRsZXIuX19jYWxsaW5nID0gdHJ1ZTtcblx0XHRcdFx0aGFuZGxlci5jYWxsKHRoaXMsIGRhdGEpO1xuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0aGFuZGxlci5fX2NhbGxpbmcgPSBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZmx1c2goY29tcG9uZW50KSB7XG5cdGNvbXBvbmVudC5fbG9jayA9IHRydWU7XG5cdGNhbGxBbGwoY29tcG9uZW50Ll9iZWZvcmVjcmVhdGUpO1xuXHRjYWxsQWxsKGNvbXBvbmVudC5fb25jcmVhdGUpO1xuXHRjYWxsQWxsKGNvbXBvbmVudC5fYWZ0ZXJjcmVhdGUpO1xuXHRjb21wb25lbnQuX2xvY2sgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0KCkge1xuXHRyZXR1cm4gdGhpcy5fc3RhdGU7XG59XG5cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zKSB7XG5cdGNvbXBvbmVudC5faGFuZGxlcnMgPSBibGFua09iamVjdCgpO1xuXHRjb21wb25lbnQuX3Nsb3RzID0gYmxhbmtPYmplY3QoKTtcblx0Y29tcG9uZW50Ll9iaW5kID0gb3B0aW9ucy5fYmluZDtcblx0Y29tcG9uZW50Ll9zdGFnZWQgPSB7fTtcblxuXHRjb21wb25lbnQub3B0aW9ucyA9IG9wdGlvbnM7XG5cdGNvbXBvbmVudC5yb290ID0gb3B0aW9ucy5yb290IHx8IGNvbXBvbmVudDtcblx0Y29tcG9uZW50LnN0b3JlID0gb3B0aW9ucy5zdG9yZSB8fCBjb21wb25lbnQucm9vdC5zdG9yZTtcblxuXHRpZiAoIW9wdGlvbnMucm9vdCkge1xuXHRcdGNvbXBvbmVudC5fYmVmb3JlY3JlYXRlID0gW107XG5cdFx0Y29tcG9uZW50Ll9vbmNyZWF0ZSA9IFtdO1xuXHRcdGNvbXBvbmVudC5fYWZ0ZXJjcmVhdGUgPSBbXTtcblx0fVxufVxuXG5mdW5jdGlvbiBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcblx0dmFyIGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSB8fCAodGhpcy5faGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdKTtcblx0aGFuZGxlcnMucHVzaChoYW5kbGVyKTtcblxuXHRyZXR1cm4ge1xuXHRcdGNhbmNlbDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuXHRcdFx0aWYgKH5pbmRleCkgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIHNldChuZXdTdGF0ZSkge1xuXHR0aGlzLl9zZXQoYXNzaWduKHt9LCBuZXdTdGF0ZSkpO1xuXHRpZiAodGhpcy5yb290Ll9sb2NrKSByZXR1cm47XG5cdGZsdXNoKHRoaXMucm9vdCk7XG59XG5cbmZ1bmN0aW9uIF9zZXQobmV3U3RhdGUpIHtcblx0dmFyIG9sZFN0YXRlID0gdGhpcy5fc3RhdGUsXG5cdFx0Y2hhbmdlZCA9IHt9LFxuXHRcdGRpcnR5ID0gZmFsc2U7XG5cblx0bmV3U3RhdGUgPSBhc3NpZ24odGhpcy5fc3RhZ2VkLCBuZXdTdGF0ZSk7XG5cdHRoaXMuX3N0YWdlZCA9IHt9O1xuXG5cdGZvciAodmFyIGtleSBpbiBuZXdTdGF0ZSkge1xuXHRcdGlmICh0aGlzLl9kaWZmZXJzKG5ld1N0YXRlW2tleV0sIG9sZFN0YXRlW2tleV0pKSBjaGFuZ2VkW2tleV0gPSBkaXJ0eSA9IHRydWU7XG5cdH1cblx0aWYgKCFkaXJ0eSkgcmV0dXJuO1xuXG5cdHRoaXMuX3N0YXRlID0gYXNzaWduKGFzc2lnbih7fSwgb2xkU3RhdGUpLCBuZXdTdGF0ZSk7XG5cdHRoaXMuX3JlY29tcHV0ZShjaGFuZ2VkLCB0aGlzLl9zdGF0ZSk7XG5cdGlmICh0aGlzLl9iaW5kKSB0aGlzLl9iaW5kKGNoYW5nZWQsIHRoaXMuX3N0YXRlKTtcblxuXHRpZiAodGhpcy5fZnJhZ21lbnQpIHtcblx0XHR0aGlzLmZpcmUoXCJzdGF0ZVwiLCB7IGNoYW5nZWQ6IGNoYW5nZWQsIGN1cnJlbnQ6IHRoaXMuX3N0YXRlLCBwcmV2aW91czogb2xkU3RhdGUgfSk7XG5cdFx0dGhpcy5fZnJhZ21lbnQucChjaGFuZ2VkLCB0aGlzLl9zdGF0ZSk7XG5cdFx0dGhpcy5maXJlKFwidXBkYXRlXCIsIHsgY2hhbmdlZDogY2hhbmdlZCwgY3VycmVudDogdGhpcy5fc3RhdGUsIHByZXZpb3VzOiBvbGRTdGF0ZSB9KTtcblx0fVxufVxuXG5mdW5jdGlvbiBfc3RhZ2UobmV3U3RhdGUpIHtcblx0YXNzaWduKHRoaXMuX3N0YWdlZCwgbmV3U3RhdGUpO1xufVxuXG5mdW5jdGlvbiBzZXREZXYobmV3U3RhdGUpIHtcblx0aWYgKHR5cGVvZiBuZXdTdGF0ZSAhPT0gJ29iamVjdCcpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHR0aGlzLl9kZWJ1Z05hbWUgKyAnLnNldCB3YXMgY2FsbGVkIHdpdGhvdXQgYW4gb2JqZWN0IG9mIGRhdGEga2V5LXZhbHVlcyB0byB1cGRhdGUuJ1xuXHRcdCk7XG5cdH1cblxuXHR0aGlzLl9jaGVja1JlYWRPbmx5KG5ld1N0YXRlKTtcblx0c2V0LmNhbGwodGhpcywgbmV3U3RhdGUpO1xufVxuXG5mdW5jdGlvbiBjYWxsQWxsKGZucykge1xuXHR3aGlsZSAoZm5zICYmIGZucy5sZW5ndGgpIGZucy5zaGlmdCgpKCk7XG59XG5cbmZ1bmN0aW9uIF9tb3VudCh0YXJnZXQsIGFuY2hvcikge1xuXHR0aGlzLl9mcmFnbWVudFt0aGlzLl9mcmFnbWVudC5pID8gJ2knIDogJ20nXSh0YXJnZXQsIGFuY2hvciB8fCBudWxsKTtcbn1cblxudmFyIFBFTkRJTkcgPSB7fTtcbnZhciBTVUNDRVNTID0ge307XG52YXIgRkFJTFVSRSA9IHt9O1xuXG5mdW5jdGlvbiByZW1vdmVGcm9tU3RvcmUoKSB7XG5cdHRoaXMuc3RvcmUuX3JlbW92ZSh0aGlzKTtcbn1cblxudmFyIHByb3RvID0ge1xuXHRkZXN0cm95LFxuXHRnZXQsXG5cdGZpcmUsXG5cdG9uLFxuXHRzZXQsXG5cdF9yZWNvbXB1dGU6IG5vb3AsXG5cdF9zZXQsXG5cdF9zdGFnZSxcblx0X21vdW50LFxuXHRfZGlmZmVyc1xufTtcblxudmFyIHByb3RvRGV2ID0ge1xuXHRkZXN0cm95OiBkZXN0cm95RGV2LFxuXHRnZXQsXG5cdGZpcmUsXG5cdG9uLFxuXHRzZXQ6IHNldERldixcblx0X3JlY29tcHV0ZTogbm9vcCxcblx0X3NldCxcblx0X3N0YWdlLFxuXHRfbW91bnQsXG5cdF9kaWZmZXJzXG59O1xuXG5leHBvcnQgeyBibGFua09iamVjdCwgZGVzdHJveSwgZGVzdHJveURldiwgX2RpZmZlcnMsIF9kaWZmZXJzSW1tdXRhYmxlLCBmaXJlLCBmbHVzaCwgZ2V0LCBpbml0LCBvbiwgc2V0LCBfc2V0LCBfc3RhZ2UsIHNldERldiwgY2FsbEFsbCwgX21vdW50LCBQRU5ESU5HLCBTVUNDRVNTLCBGQUlMVVJFLCByZW1vdmVGcm9tU3RvcmUsIHByb3RvLCBwcm90b0Rldiwgd3JhcEFuaW1hdGlvbiwgZml4UG9zaXRpb24sIGhhbmRsZVByb21pc2UsIGFwcGVuZCwgaW5zZXJ0LCBkZXRhY2hOb2RlLCBkZXRhY2hCZXR3ZWVuLCBkZXRhY2hCZWZvcmUsIGRldGFjaEFmdGVyLCByZWluc2VydEJldHdlZW4sIHJlaW5zZXJ0Q2hpbGRyZW4sIHJlaW5zZXJ0QWZ0ZXIsIHJlaW5zZXJ0QmVmb3JlLCBkZXN0cm95RWFjaCwgY3JlYXRlRnJhZ21lbnQsIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVN2Z0VsZW1lbnQsIGNyZWF0ZVRleHQsIGNyZWF0ZUNvbW1lbnQsIGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgc2V0QXR0cmlidXRlLCBzZXRBdHRyaWJ1dGVzLCBzZXRDdXN0b21FbGVtZW50RGF0YSwgc2V0WGxpbmtBdHRyaWJ1dGUsIGdldEJpbmRpbmdHcm91cFZhbHVlLCB0b051bWJlciwgdGltZVJhbmdlc1RvQXJyYXksIGNoaWxkcmVuLCBjbGFpbUVsZW1lbnQsIGNsYWltVGV4dCwgc2V0RGF0YSwgc2V0SW5wdXRUeXBlLCBzZXRTdHlsZSwgc2VsZWN0T3B0aW9uLCBzZWxlY3RPcHRpb25zLCBzZWxlY3RWYWx1ZSwgc2VsZWN0TXVsdGlwbGVWYWx1ZSwgYWRkUmVzaXplTGlzdGVuZXIsIHRvZ2dsZUNsYXNzLCBkZXN0cm95QmxvY2ssIG91dHJvQW5kRGVzdHJveUJsb2NrLCBmaXhBbmRPdXRyb0FuZERlc3Ryb3lCbG9jaywgdXBkYXRlS2V5ZWRFYWNoLCBtZWFzdXJlLCBhbmltYXRlLCBnZXRTcHJlYWRVcGRhdGUsIGludmFsaWRBdHRyaWJ1dGVOYW1lQ2hhcmFjdGVyLCBzcHJlYWQsIGVzY2FwZWQsIGVzY2FwZSwgZWFjaCwgbWlzc2luZ0NvbXBvbmVudCwgdmFsaWRhdGVTc3JDb21wb25lbnQsIGRlYnVnLCBsaW5lYXIsIGdlbmVyYXRlUnVsZSwgaGFzaCwgd3JhcFRyYW5zaXRpb24sIG91dHJvcywgZ3JvdXBPdXRyb3MsIHRyYW5zaXRpb25NYW5hZ2VyLCBub29wLCBhc3NpZ24sIGFzc2lnblRydWUsIGlzUHJvbWlzZSwgY2FsbEFmdGVyLCBhZGRMb2MsIGV4Y2x1ZGUsIHJ1biB9O1xuIiwiaW1wb3J0ICogYXMgc2FwcGVyIGZyb20gJy4uL19fc2FwcGVyX18vY2xpZW50LmpzJztcclxuXHJcbnNhcHBlci5zdGFydCh7XHJcblx0dGFyZ2V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyJyksXHJcblx0bWFuaWZlc3RcclxufSk7IiwiPHN2ZWx0ZTpoZWFkPlxyXG5cdDx0aXRsZT57c3RhdHVzfTwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcblxyXG48aDE+e3N0YXR1c308L2gxPlxyXG5cclxuPHA+e2Vycm9yLm1lc3NhZ2V9PC9wPlxyXG5cclxuPHN0eWxlPlxyXG5cdGgxLCBwIHtcclxuXHRcdG1hcmdpbjogMCBhdXRvO1xyXG5cdH1cclxuXHJcblx0aDEge1xyXG5cdFx0Zm9udC1zaXplOiAyLjhlbTtcclxuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XHJcblx0XHRtYXJnaW46IDAgMCAwLjVlbSAwO1xyXG5cdH1cclxuXHJcblx0cCB7XHJcblx0XHRtYXJnaW46IDFlbSBhdXRvO1xyXG5cdH1cclxuXHJcblx0QG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XHJcblx0XHRoMSB7XHJcblx0XHRcdGZvbnQtc2l6ZTogNGVtO1xyXG5cdFx0fVxyXG5cdH1cclxuPC9zdHlsZT4iLCI8bWFpbj5cclxuXHQ8c3ZlbHRlOmNvbXBvbmVudCB0aGlzPXtjaGlsZC5jb21wb25lbnR9IHsuLi5jaGlsZC5wcm9wc30vPlxyXG48L21haW4+XHJcblxyXG48c3R5bGU+XHJcblx0bWFpbiB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRtYXgtd2lkdGg6IDU2ZW07XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuXHRcdHBhZGRpbmc6IDJlbTtcclxuXHRcdG1hcmdpbjogMCBhdXRvO1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcclxuXHR9XHJcbjwvc3R5bGU+XHJcblxyXG48c2NyaXB0PlxyXG5cclxuPC9zY3JpcHQ+Il0sInNvdXJjZVJvb3QiOiIifQ==