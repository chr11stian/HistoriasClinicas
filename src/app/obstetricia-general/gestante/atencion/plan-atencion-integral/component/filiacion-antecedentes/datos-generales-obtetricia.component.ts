import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Network, DataSet} from 'vis';
import {FiliancionService} from "../../services/filiancion-atenciones/filiancion.service";
import {ObstetriciaGeneralService} from "../../../../../services/obstetricia-general.service";

@Component({
    selector: "app-datos-generales-obtetricia",
    templateUrl: "./datos-generales-obtetricia.component.html",
    styleUrls: ["./datos-generales-obtetricia.component.css"],
})
export class DatosGeneralesObtetriciaComponent implements OnInit {

    // @ViewChild('network', {static: false})
    // @ViewChild('visNetwork', {static: false}) visNetwork!: ElementRef;
    // private networkInstance: any;
    departamentos: any;
    opciones: any;
    estadoCivil: any;
    familiares: any
    studies: any;

    selected1: any;
    selected2: any;



    // idDocumento: string;

    formAntecedentes: FormGroup;

    //Pacientes
    dataPacientes: any;

    constructor(private form: FormBuilder,
                private filiancionService: FiliancionService,
                private obstetriciaGeneralService: ObstetriciaGeneralService) {
        this.opciones = [
            {name: 'SI', code: 'S'},
            {name: 'NO', code: 'N'},
        ];

        this.studies = [
            {name: 'Analfabeta'},
            {name: 'Primaria'},
            {name: 'Secundaria'},
            {name: 'Superior'},
            {name: 'Superior No Univ.'},
        ];

        this.estadoCivil = [
            {name: 'Soltero', code: 'S'},
            {name: 'Casado', code: 'N'},
            {name: 'Combiviente', code: 'N'},
        ];

        this.departamentos = [
            {name: 'Cusco'},
            {name: 'Lima'},
            {name: 'Arequipa'},
            {name: 'Puno'},
            {name: 'Madre de Dios'},
            {name: 'Loreto'},
            {name: 'Cajamarca'},
            {name: 'Ayacucho'},
        ];


        this.familiares = [
            {name: 'Padre'},
            {name: 'Madre'},
            {name: 'Hermano'},
            {name: 'Hermana'},
            {name: 'Abuelo'},
            {name: 'Otros'},
        ];
    }

    ngOnInit(): void {
        // this.obstetriciaGeneralService.observable$.subscribe(id => {
        //     this.idDocumento = id;
        //     console.log("ID", this.idDocumento);
        // })
        this.buildForm2();

    }


    buildForm2() {
        this.formAntecedentes = this.form.group({
            terminacion: new FormControl(''),
            ectópico: new FormControl(''),
            abortoMolar: new FormControl(''),
            noAplica: new FormControl(''),
            incompleto: new FormControl(''),
            completo: new FormControl(''),
            frustoRetenido: new FormControl(''),
            septico: new FormControl(''),
            noAplica2: new FormControl(''),
            noHubo: new FormControl(''),
            menorSeisMeses: new FormControl(''),
            SeisMesesMas: new FormControl(''),
            noAplica3: new FormControl(''),
            EESS: new FormControl(''),
            domic: new FormControl(''),
        })
    }

    fnCheckbox(value) {
        console.log(value);
    }

    // ngAfterViewInit(): void {
    //     // create an array with nodes
    //     const nodes = new DataSet<any>([
    //         {id: 1, label: 'Node 1'},
    //         {id: 2, label: 'Node 2'},
    //         {id: 3, label: 'Node 3'},
    //         {id: 4, label: 'Node 4'},
    //         {id: 5, label: 'Node 5'},
    //     ]);
    //
    //     // create an array with edges
    //     const edges = new DataSet<any>([
    //         {from: '1', to: '3'},
    //         {from: '1', to: '2'},
    //         {from: '2', to: '4'},
    //         {from: '2', to: '5'},
    //     ]);
    //
    //     const data = {nodes, edges};
    //
    //     const container = this.visNetwork;
    //     this.networkInstance = new Network(container.nativeElement, data, {});
    // }
}
