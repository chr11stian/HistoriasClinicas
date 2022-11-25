import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {
  products: any []=[
    {
      "id":1,
      "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price":109.95,
      "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "rating":{"rate":3.9,"count":120}},
      {"id":2,
      "title":"Mens Casual Premium Slim Fit T-Shirts ",
      "price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category":"men's clothing",
      "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "rating":{"rate":4.1,"count":259}},
      {
        "id":1,
        "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price":109.95,
        "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
        "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
        "rating":{"rate":3.9,"count":120}},
        {"id":2,
        "title":"Mens Casual Premium Slim Fit T-Shirts ",
        "price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category":"men's clothing",
        "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
        "rating":{"rate":4.1,"count":259}},
        {
          "id":1,
          "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price":109.95,
          "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
          "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
          "rating":{"rate":3.9,"count":120}},
          {"id":2,
          "title":"Mens Casual Premium Slim Fit T-Shirts ",
          "price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category":"men's clothing",
          "image":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
          "rating":{"rate":4.1,"count":259}}
    ];

	responsiveOptions;

  constructor() { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
  }

}
