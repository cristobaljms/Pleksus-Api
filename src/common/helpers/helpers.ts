export function uniqueId(prefix, correlativo) {
    var id = ++correlativo + '';
    return prefix ? prefix + id : id;
};

