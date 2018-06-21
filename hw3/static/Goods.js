"use strict";

class GoodsList {
    constructor(styleClass) {
        this.styleClass = styleClass;
        
        this.searchParams = new URLSearchParams({page: 1});
        
        getData(`/goods/?${this.searchParams.toString()}`).then(data => {
            this.items = data;
            this.init();
        }).catch(() => $(this.styleClass).html(`<div class="error">Ошибка загрузки данных</div>`));
        
        
        this.hundleClickButtonPrev = this.hundleClickButtonPrev.bind(this);
        this.hundleClickButtonNext = this.hundleClickButtonNext.bind(this);
    }
    
    init() {
        //Отрисовка товаров
        this.render();
        //Кнопки Prev Next
        this.renderPagination();
        
        $('.prev').on('click', this.hundleClickButtonPrev);
        $('.next').on('click', this.hundleClickButtonNext);
    }
    
    render() {
        let goods = '';
        for (let i = 0; i < this.items.length; i++) {
            goods += `<div class="goods-item">
                        <p class="good-name">${this.items[i].productName}</p>
                        <div class="good-price ">${this.items[i].price}</div>
                      </div>`;
        }
        
        $(this.styleClass).html(goods);
    }
    
    renderPagination() {
        const buttons = '<Button class="prev">Prev</Button><Button class="next">Next</Button>';
        $(this.styleClass).after(buttons);
    }
    
    hundleClickButtonPrev() {
        this.reloadData(1);
    }
    
    hundleClickButtonNext() {
        this.reloadData(2);
    }
    
    reloadData(pageNumber) {
        this.searchParams = new URLSearchParams({page: pageNumber});
        getData(`/goods/?${this.searchParams.toString()}`).then(data => {
            this.items = data;
            this.render();
        }).catch(() => $(this.styleClass).html(`<div class="error">Ошибка загрузки данных</div>`));
    }
}

