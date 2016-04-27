"use strict";

import escape from "lodash/string/escape";
import loget from "lodash/object/get";

function escapeGet(obj, key) {
    return escape(loget(obj, key, ''));
}

function isQuoted(v) {
    if (!v) return false;

    var first = v[0], last = v[v.length - 1];
    if (first === '"' && last === '"' || first === "'" && last === "'") {
        return true;
    }
    return false;
}

function addArg(obj, key) {
    if (!isQuoted(key)) {
        obj[key] = true;
    }
    return obj;
}

function toArg(v) {
    return isQuoted(v) ? v : `loget(obj, '${v}')`;
}
export default function substitute(str) {

    if (str == null) {
        str = '';
    }
    const checks = {};
    const funcs = {};

    function substitute$inner(v, content, key) {
        content = content.replace(/'/g, "\\'");
        const f = /\s*(\w+?)\s*\(\s*([^)]+?)\s*\)/.exec(key);
        if (f) {
            funcs[f[1]] = true;
            const args = f[2].split(/\,\s*/);
            args.reduce(addArg, checks);
            key = `$fns.${f[1]}(${(args.map(toArg).join(', '))})`;

            return `${content}'+(escape(${key}))+'`;

        } else {
            checks[key] = true;
            return `${content}'+(escapeGet(obj, '${key}'))+'`;
        }
    }
    const source = "obj = obj || {}; return \'" + (str.replace(/(.*?)\{([^\{\}]*)\}/g, substitute$inner)) + "'";
    const format = new Function('escapeGet', 'loget', 'escape', 'obj', '$fns', source).bind(null, escapeGet, loget, escape);
    const listen = Object.keys(checks);
    const formatters = Object.keys(funcs);
    return {
        format,
        listen,
        formatters
    };
}

