/**
* Make symbol, polyfill if no Symbol
* @param {string} name - The name of the symbol
*/
function makeSymbol(name) {
    if (typeof Symbol === "function") {
        return Symbol.for(name);
    } else {
        return "_"+name;
    }
}

export const INIT_DOC = makeSymbol("init_doc");
export const DOWNLOAD_DOC = makeSymbol("download_doc");
export const SAVE_DOC = makeSymbol("save_doc");
export const CLEAR_DOC = makeSymbol("clear_doc");
export const DEL_DOC = makeSymbol("del_doc");
