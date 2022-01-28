export const UniqueIdSell = () => {
    const  d = new Date();
    const  h = addZeroToSell(d.getHours(), 2);
    const  m = addZeroToSell(d.getMinutes(), 2);
    const  s = addZeroToSell(d.getSeconds(), 1);
    const  ms = addZeroToSell(d.getMilliseconds(), 1);
    return `${h}${m}${s}${ms}`;
}

export const UniqueIdToLease = () => {
    const  d = new Date();
    const  h = addZeroToLease(d.getHours(), 2);
    const  m = addZeroToLease(d.getMinutes(), 2);
    const  s = addZeroToLease(d.getSeconds(), 1);
    const  ms = addZeroToLease(d.getMilliseconds(), 1);
    return `${h}${m}${s}${ms}`;
}

function addZeroToSell(x, n) {
    while (x.toString().length < n) {
      x = "01" + x;
    }
    return x;
}

function addZeroToLease(x, n) {
    while (x.toString().length < n) {
      x = "00" + x;
    }
    return x;
}