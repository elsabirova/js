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

const isScrolledIntoView = (el) => {
    const rect = el.getBoundingClientRect();
    const elTop = rect.top;
    const elBottom = rect.bottom;
    
    //if visible
    return (elTop >= 0) && (elBottom <= window.innerHeight);
};
//getData('/users/0').then(data => console.log(data))
//Task 1
/*getData('/users/0')
     .then(data => {
         console.log('Task 1', data);
         return getData(`/cart/${data.id}`);
     })
     .then(data => {
         console.log(data);
         return getData('/goods/');
     }).then(data => console.log(data));*/

//Task 2
Promise.all([getData('/users/0'), getData('/goods/'), getData('/cart/0')])
     .then((data) => {
         console.log('Task 2', data);
     }).catch(e => Promise.reject(e));

//Task 3
new GoodsList('.goods', 8, 0);