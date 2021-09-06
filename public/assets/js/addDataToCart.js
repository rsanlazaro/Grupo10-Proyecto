let totalPrice = 0;

function showdata(items) {
    // console.log(items);
    // data = JSON.parse(items);
    let data = ``;
    items.forEach(element => {
        data += `
        <div class="col-md-4  col-sm-8 my-2">
                    <img src="${element.productImage}" class="w-100" alt="">
                </div>
                <div class="col-md-8 pt-4  col-sm-8">
                    <h3 class="price">${element.price}</h3>
                    <p class="py-2">${element.description}</p>
                    <a href="/products/cart/delete.html/${element.productID}" class="btn">Remove</a>
        </div>
        `
        totalPrice += Number(element.price);

    });
    document.getElementById('data').innerHTML = data;
    document.getElementById('total').innerHTML = "$" + totalPrice;

}