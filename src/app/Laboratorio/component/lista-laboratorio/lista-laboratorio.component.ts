import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {LaboratoriosService} from "../../services/laboratorios.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import Swal from "sweetalert2";
import {LabHematologiaComponent} from "../lab-hematologia/lab-hematologia.component";
import {LabInmunologiaComponent} from "../lab-inmunologia/lab-inmunologia.component";

@Component({
    selector: 'app-lista-laboratorio',
    templateUrl: './lista-laboratorio.component.html',
    styleUrls: ['./lista-laboratorio.component.css'],
    providers: [DialogService],
})
export class ListaLaboratorioComponent implements OnInit {
    formListaLabo: FormGroup;
    datePipe = new DatePipe('en-US');
    fechaActual = new Date();
    idIpres = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    DataLisLab: any;
    data: hematologiaInterface[]
    loading: boolean = true;
    ref: DynamicDialogRef;


    constructor(private fb: FormBuilder,
                private dialog: DialogService,
                private laboratoriosService: LaboratoriosService
    ) {


    }

    ngOnInit(): void {
        this.buildForm();
        this.formListaLabo.get('fechaBusqueda').setValue(this.fechaActual);
        this.listaLab();
        this.data = [{
            hemoglobina: "1"
        }]
    }

    buildForm() {
        this.formListaLabo = this.fb.group({
            fechaInicio: new FormControl(''),
            fechaBusqueda: new FormControl(''),
            tipoDoc: new FormControl(''),
            nroDoc: new FormControl(''),
        })
    }

    listaLab() {
        let data = {
            fecha: this.datePipe.transform(this.formListaLabo.value.fechaBusqueda, 'yyyy-MM-dd')
        }
        console.log('DATA ', data);

        this.laboratoriosService.getSolicitudLaboratorio(this.idIpres, data).subscribe((res: any) => {
            this.DataLisLab = res.object;
            this.loading = false;
            console.log('LISTA DE SOLICITUD ', this.DataLisLab);
        })
    }


    /**Abre el dialog dependiendo a los exemenes de laboratorio**/
    openDialogLab(data) {
        let dataAux = {
            data: data,
        }
        let opcion;

        //condion para devolver una opcion
        if ((data.datosLaboratorio.subTipo == "INMUNOLOGÍA") || (data.datosLaboratorio.subTipo == "INMUNOLOGIA")) {
            opcion = 0;
        }
        if ((data.datosLaboratorio.subTipo == "HEMATOLOGÍA") || (data.datosLaboratorio.subTipo == "HEMATOLOGIA")) {
            opcion = 1;
        }
        if ((data.datosLaboratorio.subTipo == "BIOQUÍMICA") || (data.datosLaboratorio.subTipo == "BIOQUIMICA")) {
            opcion = 2;
        }

        //opciones segun el laboratorio seleccione
        switch (opcion) {
            case 1: {
                this.ref = this.dialog.open(LabHematologiaComponent, {
                    header: "LABORATORIO CLINICO - HEMATOLOGIA",
                    width: '70%',
                    data: dataAux,
                });
                console.log("DATA", data)
                this.ref.onClose.subscribe((data: any) => {
                    // this.buscarCuposPorPersonal();
                });
            }
                break

            case 0: {
                this.ref = this.dialog.open(LabInmunologiaComponent, {
                    header: "LABORATORIO CLINICO - INMUNOLOGIA",
                    width: '70%',
                    data: dataAux,
                });
                console.log("DATA", data)
                this.ref.onClose.subscribe((data: any) => {
                    // this.buscarCuposPorPersonal();
                });
            }
                break
        }

        console.log("opcion", opcion)
    }
}

export interface hematologiaInterface {
    nroMuestra?: string
    resultadoExamen?: string
    hemoglobina?: string
    rctoGlobulosRojos?: string
    hematocrito?: string
    rctoPlaquetas?: string
    vsg1hora?: string
    vsg2hora?: string
    grupoSanguineo?: string
    rctoGlobulosBlancos?: string
    factorRH?: string
    vcm?: string
    vrVcm?: string
    tiempoSangria?: string
    blastos?: string
    linfocitos?: string
    chcm?: string
    vrChcm?: string
    tiempoCoagulacion?: string
    juveniles?: string
    monocitos?: string
    hcm?: string
    vrHcm?: string
    tiempoProtrombina?: string
    neutrofilos?: string
    eosinofilos?: string
    tiempoTromboplastina?: string
    nAbastonados?: string
    basofilos?: string
    reticulocitos?: string
    nSegmentados?: string
    compatibilidadSanguinea?: string
    hbConFactorCorrecion?: string
    factorCorreccion?: string
}
