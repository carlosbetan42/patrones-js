// class SaleContext {
//   constructor(strategy) {
//     this.strategy = strategy;
//   }

//   setStrategy(strategy) {
//     this.strategy = strategy;
//   }

//   calculate(amount) {
//     return this.strategy.calculate(amount);
//   }
// }

// class RegularSaleStrategy {
//   constructor(tax) {
//     this.tax = tax;
//   }

//   calculate(amount) {
//     return amount + (amount * this.tax);
//   }
// }

// class DiscountSaleStrategy {
//   constructor(tax, discount) {
//     this.tax = tax;
//     this.discount = discount;
//   }

//   calculate(amount) {
//     return amount + (amount * this.tax) - this.discount;
//   }
// }

// class ForeignStrategy {
//   calculate(amount) {
//     return amount * this.getDollarPrice();
//   }

//   getDollarPrice() {
//     return 20;
//   }
// }

// const regularSale = new RegularSaleStrategy(0.16);
// const discountSale = new DiscountSaleStrategy(0.16, 3);
// const foreignSale = new ForeignStrategy();

// const sale = new SaleContext(regularSale);
// console.log(sale.calculate(10));

// sale.setStrategy(discountSale);
// console.log(sale.calculate(10));

// sale.setStrategy(foreignSale);
// console.log(sale.calculate(10));

// Explicación práctica--------------------------------------------------------------------------------

const data = [
  {
    name: "Erdinger Pikantus",
    country: "Alemania",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam quaerat aliquid rerum sit ipsum iusto nam corporis minima inventore enim veniam sapiente obcaecati ullam dolor, ipsa eligendi nulla placeat!",
    img: "https://google.com"
  },
  {
    name: "Corona",
    country: "México",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum possimus veniam cumque saepe accusamus facilis incidunt, quia rerum aliquam! Obcaecati quasi earum, mollitia corporis commodi qui maxime sequi eum.",
    img: "https://google.com"
  },
  {
    name: "Delirium",
    country: "Bélgica",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam quaerat aliquid rerum sit ipsum iusto nam corporis minima inventore enim veniam sapiente obcaecati ullam dolor, ipsa eligendi nulla placeat!",
    img: "https://google.com"
  }
];

class InfoContext {
  constructor(strategy, data, element) {
    this.setStrategy(strategy);
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  show() {
    this.strategy.show(this.data, this.element);
  }
}

class ListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, beer) => {
      return ac + `
        <div>
          <h2>${beer.name}</h2>
          <p>${beer.country}</p>
        </div>
      `
    }, '');
  }
}

class DetailedListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, beer) => {
      return ac + `
        <div>
          <h2>${beer.name}</h2>
          <p>${beer.country}</p>
          <p>${beer.info}</p>
        </div>
      `
    }, '');
  }
}

class ListWithImageStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, beer) => {
      return ac + `
        <div>
         <img width="10%" src="${beer.img}" />
         <h2>${beer.name}</h2>
        </div>
        <hr />
      `
    }, '');
  }
}


const strategies = [
  new ListStrategy(),
  new DetailedListStrategy(),
  new ListWithImageStrategy()
];

const info = new InfoContext(new ListStrategy(), data, document.getElementById("content"));
info.show();

slcOptions.addEventListener('change', (event) => {
  const op = event.target.value;
  info.setStrategy(strategies[op]);
  info.show();
});