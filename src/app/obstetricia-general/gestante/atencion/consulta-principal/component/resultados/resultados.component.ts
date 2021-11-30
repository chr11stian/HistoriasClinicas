import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.component.html',
    styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
    isUpdate = false;
    resultadoFG: FormGroup;
    ecografiaResultadosFG: FormGroup;
    examenTomadosList = []
    examenList: any = [
        {name: 'Grupo Sanguineo'},
        {name: 'factor RH'},
        {name: 'Hemograma'},
        {name: 'Hemoglobina'},
        {name: 'Factor Correccion'},
        {name: 'Hto'},
        {name: 'Glucosa'},
        {name: 'Tolerancia Glucosa'},
        {name: 'Examen Orina'},
        {name: 'RPR'},
        {name: 'RPR Reactivo'},
        {name: 'Examen Orina'},
        {name: 'Ex Sec V'},
        {name: 'Protenuari Cuatitativa'},
        {name: 'Prueba VIH'},
        {name: 'Prueba Hepatitas'},
        {name: 'Elisa'},
        {name: 'Glicemia'},
        {name: 'Bacteriuria'},
        {name: 'Nitriitos'},
        {name: 'Urocultivo'},
        {name: 'bkEsputo '},
        {name: 'wsternBlotlfi '},
        {name: 'thlv1'},
        {name: 'torch'},
        {name: 'gotaGruesa'},
        {name: 'pap'},
        {name: 'iva'},
    ]

    constructor() {
        this.buildForm();
        this.buildForm2();
    }

    ngOnInit(): void {
    }

    buildForm() {
        this.resultadoFG = new FormGroup({
            examen: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
            fecha: new FormControl('', Validators.required),
        })
    }

    buildForm2() {
        this.ecografiaResultadosFG = new FormGroup({
            fechaEcografia1: new FormControl('', [Validators.required]),
            resultado1: new FormControl('', [Validators.required]),
            semana1: new FormControl('', [Validators.required]),
            dia1: new FormControl('', [Validators.required]),

            fechaEcografia2: new FormControl('', [Validators.required]),
            resultado2: new FormControl('', [Validators.required]),
            semana2: new FormControl('', [Validators.required]),
            dia2: new FormControl('', [Validators.required]),


            fechaEcografia3: new FormControl('', [Validators.required]),
            resultado3: new FormControl('', [Validators.required]),
            semana3: new FormControl('', [Validators.required]),
            dia3: new FormControl('', [Validators.required]),

        })
    }

    getFC(control: string): AbstractControl {
        return this.resultadoFG.get(control);
    }

    getFC2(control: string): AbstractControl {
        return this.ecografiaResultadosFG.get(control);
    }

    agregarResultado() {
        let examen = {
            examen: this.getFC('examen').value,
            resultado: this.getFC('valor').value,
            fechaResultado: this.getFechaHora(this.getFC('fecha').value),
        }
        if (!this.isUpdate) {
            this.examenTomadosList.push(examen)
        } else {
            this.examenTomadosList.splice(this.auxIndex, 1, examen)
        }
        this.resultadoFG.reset()

    }

    auxIndex = 0;

    actualizar(index) {
        //recuperamos datos
        this.getFC('examen').setValue(this.examenTomadosList[index].examen);
        this.getFC('valor').setValue(this.examenTomadosList[index].valor);
        this.getFC('fecha').setValue(this.examenTomadosList[index].fecha);
        this.auxIndex = index

    }

    delete(index) {
        this.examenTomadosList.splice(index, 1)

    }

    getFechaHora(date: Date) {
        if (date.toString() !== '') {
            let hora = date.toLocaleTimeString();
            let dd = date.getDate();
            let mm = date.getMonth() + 1; //January is 0!
            let yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + dd + ' ' + hora
        } else {
            return '';
        }
    }

    agregar() {
        // console.log(this.ecografiaFG.value);
        // console.log(this.examenTomadosList);
        let input = {
            examenes: this.examenTomadosList,
            ecografias: [{
                fecha: this.getFechaHora(this.getFC2('fechaEcografia1').value),
                descripcion: this.getFC2('resultado1').value,
                semanas: this.getFC2('semana1').value,
                dias: this.getFC2('dia1').value
            }, {
                fecha: this.getFechaHora(this.getFC2('fechaEcografia2').value),
                descripcion: this.getFC2('resultado2').value,
                semanas: this.getFC2('semana2').value,
                dias: this.getFC2('dia2').value
            }, {
                fecha: this.getFechaHora(this.getFC2('fechaEcografia3').value),
                descripcion: this.getFC2('resultado3').value,
                semanas: this.getFC2('semana3').value,
                dias: this.getFC2('dia3').value
            }
            ],
            encargardo: {
                tipoDoc: 'DNI',
                nroDoc: '77777777'
            }
        }

        console.log(this.ecografiaResultadosFG.value);

    }
}
