import { Component, OnInit } from '@angular/core';
import { TestDesarrollo } from './test-desarrollo.service';
@Component({
  selector: 'app-test-desarrollo',
  templateUrl: './test-desarrollo.component.html',
  styleUrls: ['./test-desarrollo.component.css'],
  providers: [TestDesarrollo]
})
export class TestDesarrolloComponent implements OnInit {

  constructor(
    private testDesarrollo: TestDesarrollo
  ) { }

  imagenes: any[];
  ngOnInit(): void {
    this.testDesarrollo.getImagenes().then(data => {
        this.imagenes = data;
      }
    )
  }

  cambiarEstado(){
    console.log("cambio de estado")
  }

}
