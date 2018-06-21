"use strict";

const getData = (url) => {
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res;
            }
            throw new Error(res.statusText)
        })
        .then(res => res.json())
        .catch(e => Promise.reject(e));
};

new GoodsList('.goods');