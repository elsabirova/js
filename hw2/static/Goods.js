//Task 3
class GoodsList {
    constructor(styleClass, count, begin) {
        this.styleClass = styleClass;
        //количество подгружаемых записей
        this.count = count;
        //начиная с
        this.begin = begin;
        getData('/goods/').then(data => {
            this.items = data;
            this.init();
        }).catch(() => $(this.styleClass).html(`<div class="error">Ошибка загрузки данных</div>`));
    
        this.scrolling = this.scrolling.bind(this);
    }
    
    init() {
        //запуск функции при прокрутке
        window.onscroll = this.scrolling;
        //Отрисовка товаров
        this.render();
    }
    render() {
        let goods = '';
        let items = this.items.splice(this.begin, this.count);
        for (let i = 0; i < items.length; i++) {
            goods += `<div class="goods-item">
                        <p class="good-name">${items[i].productName}</p>
                        <div class="good-price ">${items[i].price}</div>
                      </div>`;
        }
    
        $(this.styleClass).append(goods);
    }
    
    scrolling() {
        const el = document.querySelector(this.styleClass);
    
        //Если достигли конца страницы, подгружаем новые элементы
        if((el.getBoundingClientRect().bottom <= window.innerHeight)) {
            this.begin =+ this.count;
            this.render();
        }
    }
}

