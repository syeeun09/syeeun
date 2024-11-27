const cartitems = {};
const cartDisplay = document.getElementById("cartitems");
const totalDisplay = document.getElementById("totalamount");

document.querySelectorAll('section.Menu > article').forEach((menuitem) => {
    menuitem.addEventListener('click',() => {
        const name = menuitem.getAttribute('data-name');
        const price = parseInt(menuitem.getAttribute('data-price'));

        if(cartitems[name]) {
            cartitems[name].count++;
        } else {
            cartitems[name] = { price, count: 1 };
        }

        updateCart();
    })
})

function updateCart() {
    cartDisplay.innerHTML = "";
    let total = 0;

    for (const name in cartitems) {

        const {price, count} = cartitems[name];
        total += price * count;

        const itemElement = document.createElement("div");
        itemElement.classList.add('cartitems');

        const itemNameAndCount = document.createElement('span');
        itemNameAndCount.textContent = `${name} x ${count}`;

        const itemprice = document.createElement('span');
        itemprice.textContent = `${(price * count).toLocaleString()}€`;
        
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            if(cartitems[name].count > 1) {
                cartitems[name].count--;
            } else {
                delete cartitems[name];
            }
            updateCart();
        });

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
            cartitems[name].count++;
            updateCart();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = '삭제';
        removeButton.addEventListener('click', () => {
            delete cartitems[name];
            updateCart();
        })

        itemElement.appendChild(itemNameAndCount);
        itemElement.appendChild(increaseButton);
        itemElement.appendChild(decreaseButton);
        itemElement.appendChild(itemprice);
        itemElement.appendChild(removeButton);

        cartDisplay.appendChild(itemElement);
    }

    totalDisplay.textContent = total.toLocaleString();
} 