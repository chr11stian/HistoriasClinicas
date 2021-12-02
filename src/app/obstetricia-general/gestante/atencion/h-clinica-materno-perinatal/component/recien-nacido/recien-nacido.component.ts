import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {RecienNacidoDialogoComponent} from './recien-nacido-dialogo/recien-nacido-dialogo.component';
import {RecienNacidoService} from '../../services/recien-nacido/recien-nacido.service';
import {ObstetriciaGeneralService} from 'src/app/obstetricia-general/services/obstetricia-general.service';

@Component({
    selector: 'app-recien-nacido',
    templateUrl: './recien-nacido.component.html',
    styleUrls: ['./recien-nacido.component.css'],
    providers: [DialogService]
})
export class RecienNacidoComponent implements OnInit {
    todosRN: any[] = [];
    ref: DynamicDialogRef;
    idObstetricia: string;

    constructor(
        public dialog: DialogService,
        public recienNacidoService: RecienNacidoService,
        private obstetriciaGeneralService: ObstetriciaGeneralService
    ) {
        this.idObstetricia = this.obstetriciaGeneralService.idGestacion;
        this.recuperarRecienNacidos();
    }

    openDialogRN() {
        this.ref = this.dialog.open(RecienNacidoDialogoComponent, {
            header: "RECIEN NACIDO",
            width: "95%",
            contentStyle: {
                "max-height": "800px",
                overflow: "auto",
            },
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined)
                this.todosRN.push(data);
        })
    }

    openDialogEditarRN(row, index) {
        let aux = {
            index: index,
            row: row
        }
        this.ref = this.dialog.open(RecienNacidoDialogoComponent, {
            header: "RECIEN NACIDO",
            width: "95%",
            contentStyle: {
                "max-height": "800px",
                overflow: "auto",
            },
            data: aux
        })
        this.ref.onClose.subscribe((data: any) => {
            console.log('data de otro dialog ', data)
            if (data !== undefined) {
                this.todosRN.splice(data.index, 1, data.row);
            }
            ;
        })
    }

    guardarRecienNacidos() {
        console.log('data to save ', this.todosRN);
        this.recienNacidoService.postRecienNacido(this.idObstetricia, {recienNacido: this.todosRN}).subscribe((res: any) => {
            console.log('se guardo con exito ', res)
        })
    }

    recuperarRecienNacidos() {
        console.log('data to save ', this.todosRN);
        this.recienNacidoService.getRecienNacidoById(this.idObstetricia).subscribe((res: any) => {
            console.log('trajo datos exito ', res)
            this.todosRN = res.object.recienNacido ? res.object.recienNacido : [];
        })
    }

    ngOnInit(): void {
    }

}
