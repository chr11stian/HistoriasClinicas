import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UpsService } from '../../services/ups/ups.service';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { TipoUpsService } from '../../services/tipo-ups.service';

@Component({
    selector: 'app-ups',
    templateUrl: './ups.component.html',
    styleUrls: ['./ups.component.css'],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class UpsComponent implements OnInit {

    listaUPS: any;
    listaTipoUPS: any;
    dialogUPS: boolean = false;
    formUPS: FormGroup;
    dataUPS: any;
    selectedValue: string;
    selectedTipoUPS: any;

    constructor(
        private fb: FormBuilder,
        private upsService: UpsService,
        private tipoUpsService: TipoUpsService,
    ) { }

    ngOnInit(): void {
        this.inicializarForm();
        this.cargarUPS();
        this.cargarTipoUPS();
    }

    inicializarForm() {
        this.formUPS = this.fb.group({
            codUPS: new FormControl(''),
            nombreUPS: new FormControl(''),
            nombreComercial: new FormControl(''),
        })
    }

    cargarUPS(){
        this.upsService.getUPS().subscribe((res:any)=>{
            this.listaUPS = res.object;
            console.log('res back ', this.listaUPS)
        })
    }

    cargarTipoUPS(){
        this.tipoUpsService.getTipoUPSs().subscribe((res:any)=>{
            this.listaTipoUPS = res.object;
            console.log('lista tipo UPS', this.listaTipoUPS)
        })
    }

    recuperarDatos(){
        this.dataUPS = {
            nombreUPS:'',
            nombreComercial_id:'',
            esHIS:'',
            esSIS:'',
            estado:'',
            tipoUPS_id:'',

        }
    }

    selectedUPS() {

    }

    openDialogUPS() {
        this.dialogUPS = true;
    }

    openDialog() {

    }

}
