import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {
  profiles: any []=[
    {
      "id":1,
      "nombre":"Sofia1",
      "puesto":"Desarrollador FronT End",
      "descripcion":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "imagen":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "linkedin":"https://www.linkedin.com/in/yuviqp/",
      "github":"https://github.com/YuviQP"
    },
    {
      "id":1,
      "nombre":"Sofia2",
      "puesto":"Desarrollador FronT End",
      "descripcion":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "imagen":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "linkedin":"https://www.linkedin.com/in/yuviqp/",
      "github":"https://github.com/YuviQP"
    },
    {
      "id":1,
      "nombre":"Sofia3",
      "puesto":"Desarrollador FronT End",
      "descripcion":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "imagen":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "linkedin":"https://www.linkedin.com/in/yuviqp/",
      "github":"https://github.com/YuviQP"
    },
    {
      "id":1,
      "nombre":"Sofia4",
      "puesto":"Desarrollador FronT End",
      "descripcion":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "imagen":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "linkedin":"https://www.linkedin.com/in/yuviqp/",
      "github":"https://github.com/YuviQP"
    },
    {
      "id":1,
      "nombre":"Sofia5",
      "puesto":"Desarrollador FronT End",
      "descripcion":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing",
      "imagen":"https://res.cloudinary.com/dhcetqc1j/image/upload/v1648754228/cld-sample.jpg",
      "linkedin":"https://www.linkedin.com/in/yuviqp/",
      "github":"https://github.com/YuviQP"
    },
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
