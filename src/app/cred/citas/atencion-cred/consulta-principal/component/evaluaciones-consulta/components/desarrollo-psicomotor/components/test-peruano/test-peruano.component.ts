import { Component, OnInit } from '@angular/core';
import {TestDesarrollo} from "../../../../../../../plan/component/evaluacion-general/test-desarrollo/test-desarrollo.service";
import {TestPeruano} from "../../services/test-peruano/tes-peruano.service";

@Component({
  selector: 'app-test-peruano',
  templateUrl: './test-peruano.component.html',
  styleUrls: ['./test-peruano.component.css'],
  providers: [TestPeruano]
})
export class TestPeruanoComponent implements OnInit {
  imagenes: any[];
  constructor(private testDesarrollo: TestDesarrollo) { }

  ngOnInit(): void {
    this.testDesarrollo.getImagenes().then(data => {
          this.imagenes = data;
        }
    )
  }

}
