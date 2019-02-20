window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function(btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),         // клонируем элемент выбранного продукта
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div');
                //empty = cartWrapper.querySelector('.empty');            
            trigger.remove();

            showConfirm();            

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';                 // добавили крестик 
            item.appendChild(removeBtn);                    // добавляем крестик удаления на карточку товара
            cartWrapper.appendChild(item);                  // помещаем товар с крестиком в корзину
            //if (empty) {
               //empty.style.display = 'none';                             // Скрываем сообщение "в корзине нет товара"
            //} 

            calcGoods();        
            calcTotal();
            removeFromCart();
            
        });
    });
    
function sliceTitle() {                                                       // работа с одинаковым размером названий товаров
    titles.forEach(function(item) {
        if (item.textContent.length < 70) {             // количество символов в названии
            return;                                     // если меньше 70 - выходим
        } else {
            const str = item.textContent.slice(0, 70) + '...';       // оставляем только первые 69 знаков 
            //const str = '${item.textContent.slice(0, 70)} ...';
            item.textContent = str;
        }

    });
}
sliceTitle();

    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);          // запуск frame каждые 10 сек
        function frame() {
            if (counter == 10) {
                clearInterval(id);                  // останавливаем 
                confirm.style.display = 'none';     // убираем с экрана
            } else {
                counter--;
                confirm.style.transform = 'translateY(-${counter}px)';  // смещение по Y
                confirm.style.opacity = '.' + counter;      // прозрачность
            }
        }        
    }

    function calcGoods() {                          // подсчет количества товаров в корзине
        const items = cartWrapper.querySelectorAll('.goods__item');
        empty = cartWrapper.querySelector('.empty');
        badge.textContent = items.length;
        if (items.length === 0) {
            empty.style.display = 'block';
        } else { 
            empty.style.display = 'none'; 
        }

    }

    function calcTotal() {                          // подсчет общей суммы в корзине
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach(function(item) {
            total += +item.textContent;             // общая сумма в корзине, "+item" превращает строку в число
        });
        totalCost.textContent = total;
    }

    function removeFromCart() {                     // удаление из корзины
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {   // при нажатии кнопки удаления
                btn.parentElement.remove();         // удаляем родительский элемент
                calcGoods(0);
                calcTotal();                
            });
        });    
        
    }
});



