import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import {AntecedentesViviendaFormType, AntecedentesViviendaType} from '../../models/antecedentes.interface';
import {AntecedenteViviendaService} from '../../../../../../services/antecedentes/antecedente-vivienda.service';
import {dato} from "../../../../../models/data";
import { identifierModuleUrl } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-vivienda',
    templateUrl: './vivienda.component.html',
    styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {
    @Output() viviendaEmit: EventEmitter<AntecedentesViviendaFormType> = new EventEmitter<AntecedentesViviendaFormType>();
    viviendaFG: FormGroup;
    nroDoc: string = ''
    attributeLocalS = 'documento'
    data: dato
    stateOptions: any[];
    datosVivienda:any;
    isUpdate:boolean=false

    constructor(
        private formBuilder: FormBuilder,
        private servicioVivienda: AntecedenteViviendaService) {

        this.buildForm();
        this.stateOptions = [{label: 'SI', value: true},
            {label: 'NO', value: false}];
        this.data = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS));
        this.nroDoc = this.data.nroDocumento
    }

    getAntecendentesVivienda() {
        this.servicioVivienda.getDatosGenerales(this.nroDoc)
            .toPromise().then(res => <AntecedentesViviendaType[]>res['object'])
            .then(data => {
                this.isUpdate=true;
                
                this.getFC('agua').setValue(data[0].valor)
                this.getFC('detalleAgua').setValue(data[0].especificar)
                this.getFC('desague').setValue(data[1].valor)
                this.getFC('detalleDesague').setValue(data[1].especificar)
            })
            .catch(error => {
                return error;
            });

    }

    getFC(control: string): AbstractControl {
        return this.viviendaFG.get(control)
    }

    buildForm(): void {
        this.viviendaFG = this.formBuilder.group({
            agua: new FormControl({value:'',disabled:false},[Validators.required]),
            detalleAgua: new FormControl({value:'',disabled:false},[Validators.required]),
            desague: new FormControl({value:'',disabled:false},[Validators.required]),
            detalleDesague: new FormControl({value:'',disabled:false},[Validators.required]),

        })
    }


    // rellenarForm(tabla: AntecedentesViviendaType[]): void {

    //     this.getFC('agua').setValue(tabla[0].valor)
    //     this.getFC('detalleAgua').setValue(tabla[0].especificar)
    //     this.getFC('desague').setValue(tabla[1].valor)
    //     this.getFC('detalleDesague').setValue(tabla[1].especificar)
    // }

    ngOnInit(): void {
        this.getAntecendentesVivienda();

    }

    save() {
        const inputRequest=[
            {
                descripcion:'tiene agua potable',
                valor: this.getFC('agua').value,
                especificar: this.getFC('detalleAgua').value
            },
            {
                descripcion:'tiene desague',
                valor: this.getFC('desague').value,
                especificar: this.getFC('detalleDesague').value,
            }
        ]
        if(!this.isUpdate){

            this.servicioVivienda.addAntecedentesVivienda(this.nroDoc,inputRequest).subscribe(()=>{
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Guardo el registro con correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                
                
            })
        }
        else{
            this.servicioVivienda.updateAntecedentesVivienda(this.nroDoc,inputRequest).subscribe(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Registro actualizado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500,
                })
            })
        }

    }

    limpiar() {
        this.viviendaFG.reset();
    }

}
