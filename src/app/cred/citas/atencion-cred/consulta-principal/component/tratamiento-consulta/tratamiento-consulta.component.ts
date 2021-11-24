import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tratamiento-consulta',
    templateUrl: './tratamiento-consulta.component.html',
    styleUrls: ['./tratamiento-consulta.component.css']
})
export class TratamientoConsultaComponent implements OnInit {
    data: any[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    editar(rowData: any) {
    }

    eliminar(rowData: any) {
    }
}
