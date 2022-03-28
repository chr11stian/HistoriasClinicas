import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-antecendentes',
  templateUrl: './antecendentes.component.html',
  styleUrls: ['./antecendentes.component.css']
})
export class AntecendentesComponent implements OnInit {
  @Input() isFirstConsulta=false
  @Output() onChangeIndice:EventEmitter<number>=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  guardarDatosGenerales(){
    this.onChangeIndice.emit(2);

  }

}
