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
import * as noteRepository from "../repositories/notesRepository.js";
export function createNote(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNoteByName(data.owner_id, data.title)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, noteRepository.addNoteToDatabase(__assign({}, data))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getAllNotes(owner_id) {
    return __awaiter(this, void 0, void 0, function () {
        var notes, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, noteRepository.getAllUserNotes(owner_id)];
                case 1:
                    notes = _a.sent();
                    data = notes.map(function (el, ind) {
                        return {
                            id: el.id,
                            title: el.title,
                            anotation: el.anotation
                        };
                    });
                    return [2 /*return*/, { notes: data }];
            }
        });
    });
}
function getNoteByName(owner_id, name) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, noteRepository.getNoteByName(owner_id, name)];
                case 1:
                    note = _a.sent();
                    if (note.length !== 0)
                        throw { code: "Conflict", message: "Já existe uma nota com esse nome." };
                    return [2 /*return*/];
            }
        });
    });
}
export function getNoteById(noteId, owner_id) {
    return __awaiter(this, void 0, void 0, function () {
        var note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, noteRepository.getNoteById(noteId)];
                case 1:
                    note = _a.sent();
                    if (!note)
                        throw { code: "NotFound", message: "Nota não existe." };
                    if (note.owner_id !== owner_id)
                        throw { code: "Unauthorized", message: "Nota não pertence ao usuário." };
                    return [2 /*return*/, __assign({}, note)];
            }
        });
    });
}
export function deleteNote(noteId, owner_id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNoteById(noteId, owner_id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, noteRepository.deleteNote(noteId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
