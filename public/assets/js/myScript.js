const btn = document.querySelector('#show-data');
const img = document.querySelector('#product-img');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productQuantity = document.querySelector('#product-quantity');
const deleteProductBtn = document.querySelector('.deleteProduct-btn');
//container to product data
var showArea = document.createElement('div');
showArea.className = "show-area";

var Data = {};
btn.addEventListener(
    'click',
    (e) => {
        e.preventDefault();
        
        showData(1);
    }
);
// deleteProductBtn.addEventListener(
//     'click',
//     (e) => {
        
//        // deleteProduct(e.target.id);
//        console.log(e.target.id)
//     }
// );

// delete product function
async function deleteProduct(productID){

		var res = await fetch(`/products/delete.html/${productID}`, {
			method: "delete"

		})
}

function showData(page) {
    const url = `/products/productList.html/${page}`;
    // const theURL = new URL(url)
    // theURL.searchParams.set('page', page)
    // console.log(theURL.href);
    showArea.innerHTML = '';
    fetch(url)
        .then(returnJsonData => returnJsonData.json())
        .then(data => {

            console.log(data)
            //loop for data to create show area
            data.data.forEach(item => {
                console.log(item)
                

                //create card container
                var cardContainer = document.createElement('div');
                cardContainer.className = 'card m-3 p-1 card-style';

                //create card sub-container
                var cardSubContainer = document.createElement('div');
                cardSubContainer.className = 'row no-gutters';

                //create image container
                var imageContainer = document.createElement('div');
                imageContainer.className = 'col-md-5 img-area';

                //create img
                var img = document.createElement('img');
                img.setAttribute('id', 'product-img');
                img.src = `/${item.productImage}`;

                //create body container
                var bodyContainer = document.createElement('div');
                bodyContainer.className = 'col-md-7';

                //create card body 
                var cardBody = document.createElement('div');
                cardBody.className = 'card-body text-center';

                //create card body Titel
                var cardBodyTitel = document.createElement('h5');
                var cardBodyTitelTexet = document.createTextNode(item.productName);
                cardBodyTitel.className = 'card-title .bg-secondary';
                cardBodyTitel.setAttribute('id', 'product-name');

                //append inner text to cardBodyTitelTexet
                cardBodyTitel.appendChild(cardBodyTitelTexet);

                //create card body price
                var cardBodyPrice = document.createElement('div');
                var cardBodyPriceTexet = document.createTextNode('Price');


                //append inner text to cardBodyPrice
                cardBodyPrice.appendChild(cardBodyPriceTexet);

                //create card body price-content
                var cardBodyPriceContent = document.createElement('div');
                cardBodyPriceContent.setAttribute('id', "product-price")
                var cardBodyPriceContentTexet = document.createTextNode(`$${item.productPrice}`);

                //append inner price value to cardBodyPrice
                cardBodyPriceContent.appendChild(cardBodyPriceContentTexet);


                //create card body quantity
                var cardBodyQuantity = document.createElement('div');
                var cardBodyQuantityTexet = document.createTextNode('Quantity');

                cardBodyQuantity.appendChild(cardBodyQuantityTexet);
                //create card body quantity-content
                var cardBodyQuantityContent = document.createElement('div');
                cardBodyQuantityContent.setAttribute('id', "product-price")
                var cardBodyQuantityContentTexet = document.createTextNode(`${item.productQuantity}`);


                cardBodyQuantityContent.appendChild(cardBodyQuantityContentTexet);

                //create card delete-btn
                var cardDeleteBtn = document.createElement('button');
                var cardDeleteBtnTexet = document.createTextNode('Delete Product');
                cardDeleteBtn.className = "btn btn-primary deleteProduct-btn";

                cardDeleteBtn.appendChild(cardDeleteBtnTexet);
                cardDeleteBtn.addEventListener(
                    'click',
                    (e) => {
                        
                       deleteProduct(e.target.id);
                       showData(1);
                      
                    }
                );
                cardDeleteBtn.setAttribute('id', item.productID)
                var hr = document.createElement('hr');


                // appende to cardBody
                cardBody.appendChild(cardBodyTitel);

                cardBody.appendChild(cardBodyPrice);

                cardBody.appendChild(cardBodyPriceContent);
                cardBody.appendChild(hr);
                cardBody.appendChild(cardBodyQuantity)
                cardBody.appendChild(cardBodyQuantityContent);
                cardBody.appendChild(cardDeleteBtn);
                bodyContainer.appendChild(cardBody);
                imageContainer.appendChild(img);

                cardSubContainer.appendChild(imageContainer);
                cardSubContainer.appendChild(bodyContainer);
                cardContainer.appendChild(cardSubContainer);
                showArea.appendChild(cardContainer)
            })
            
            document.body.appendChild(showArea);
        });




}