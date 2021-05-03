"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_spellchecker_1 = __importDefault(require("simple-spellchecker"));
const SpellCheckerNode = (words) => {
    let wordError = [];
    simple_spellchecker_1.default.getDictionary('pt-BR', (err, dictionary) => {
        if (!err) {
            words.map((item) => {
                const misspelled = !dictionary.spellCheck(item);
                if (misspelled) {
                    // const suggestions = dictionary.getSuggestions(item);
                    wordError.push(item);
                }
            });
        }
    });
    return wordError.length > 0 ? false : true;
};
exports.default = SpellCheckerNode;
