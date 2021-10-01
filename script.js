const goods = [
  {
    title: 'Shirt',
    price: 150,
    photo: 'https://cdn11.bigcommerce.com/s-lqiq2tqil5/product_images/uploaded_images/5417-check-shirt-red-black-thumb1.jpg?t=1594254101&_ga=2.177697827.767471844.1594155284-1025973031.1592776194'
  },
  {
    title: 'Socks',
    price: 50,
    photo: 'https://images.ru.prom.st/736981013_w640_h640_nabor-zhenskih-dlinnyh.jpg'
  },
  {
    title: 'Jacket',
    price: 350,
    photo: 'https://sneakerstudio.ru/rus_pl_%D0%9C%D1%83%D0%B6%D1%81%D0%BA%D0%B0%D1%8F-%D0%BA%D1%83%D1%80%D1%82%D0%BA%D0%B0-Alife-Varsity-Jacket-ALIFW20-22-BLUE-CREAM-37001_1.jpg'
  },
  {
    title: 'Shoes',
    price: 250,
    photo: 'https://amazonxyz.com/wp/wp-content/uploads/2020/12/41u06HG0ScL.jpg'
  },
];

const renderGoodsItem = (title, price, photo) => {
    return `<div class="goods-item">
              <h3>${title}</h3>
              <p>${price}</p>
              <img class="goods-photo" src="${photo}">
              <button class="by-btn">Добавить</button>
            </div>`;
  };

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.photo));
  document.querySelector('.goods-list').innerHTML = goodsList.join("");
}

renderGoodsList(goods);
