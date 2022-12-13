import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {
    SuplementacionesMicronutrientesService
} from "../../../../../plan/component/plan-atencion-integral/services/suplementaciones-micronutrientes/suplementaciones-micronutrientes.service";
import {DosajeHemoglobina} from "../../../../models/dosaje.interface";
import {delayWhen} from "rxjs/operators";
import {ConfirmationService} from "primeng/api";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dosaje',
    templateUrl: './dosaje.component.html',
    styleUrls: ['./dosaje.component.css']
})
export class DosajeComponent implements OnInit {
    idIpress = JSON.parse(localStorage.getItem('usuario')).ipress.idIpress;
    factorAjuste: number = 0;
    nivelAnemia = [
        {name: 'Anemia Leve', code: 'LEVE'},
        {name: 'Anemia Moderada', code: 'MODERADA'},
        {name: 'Anemia Severa', code: 'SEVERA'}
    ]
    positivoNegativo = [
        {name: 'Negativo', code: 'NO'},
        {name: 'Positivo', code: 'SI'},
    ]
    tipoDiagnosticoList = [
      { name: 'DEFINITIVO', code: 'D' },
      { name: 'PRESUNTIVO', code: 'P' },
      { name: 'REPETITIVO', code: 'R' },
    ];
    dosajeFG: FormGroup;
    dosaje: DosajeHemoglobina = this.config.data;
    documento = JSON.parse(localStorage.getItem('documento'))
    idConsulta = this.documento.idConsulta;

    constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig
        , private dosajeService: SuplementacionesMicronutrientesService,
                public confirmationService:ConfirmationService,
    ) {
    }

    ngOnInit(): void {
        this.getFactor()
        this.buildForm()
        this.getDosaje()
    }

    getFactor() {
        this.dosajeService.getFactorCorrepcionXipress(this.idIpress).subscribe((resp) => {
            if(resp.object==null)
                this.factorAjuste=0;
            else{
                this.factorAjuste = resp['object']['factorAjuste']
            }   
        })
    }

    getFC(control: string): AbstractControl {
        return this.dosajeFG.get(control);
    }

    nivelAnemiaSelected: '';
    isDisabledNivelAnemia: boolean = true

    buildForm() {
        this.dosajeFG = new FormGroup({
            fechaTentativa: new FormControl({value: '', disabled: true}, Validators.required),
            fechaAdministrada: new FormControl({value: '', disabled: true}, Validators.required),
            valorHb: new FormControl('', Validators.required),
            valorHbRestado: new FormControl({value: '', disabled: true}, Validators.required),
            positivoAnemia: new FormControl('', Validators.required),
            codLab: new FormControl({value: '', disabled: false}, Validators.required),
            tipoDiagnostico: new FormControl({value: '', disabled: false}, Validators.required),
            // nivelAnemia:new FormControl({ value: '', disabled: this.isDisabledNivel }, { validators: [Validators.required] }),

        })
    }

    getDosaje() {
        this.getFC("fechaTentativa").setValue(this.dosaje.fechaTentativa);
        this.getFC("fechaAdministrada").setValue(new Date());
        this.getFC("codLab").setValue(this.dosaje.nroControl);
    }

    valorCorrejido(valor: number) {
        if (valor <= 0) {
            this.getFC('valorHbRestado').setValue(0);
        } else {
            this.getFC('valorHbRestado').setValue(valor - this.factorAjuste)
        }

    }

    cancel() {
        this.ref.close('cerrado')
    }

    save() {
       /*  const inputRequest = {
            servicio: "SERVICIO",
            nroCama: "15",
            dxPresuntivo: "SI",
            examenesAuxiliares: [
                {
                    tipoLaboratorio: "EXAMEN_LABORATORIO",
                    subTipo: "HEMATOLOGIA",
                    // nombreExamen: "HEMOGLOBINA",
                    nombreExamen: "DOSAJE DE HEMOGLOBINA",
                    codigo: "85018",//cod procedimiento
                    codPrestacion: "001",
                    cie10: "",
                    codigoHIS: "",
                    lugarExamen: "CONSULTORIO",
                    resultado: {
                        hematologia: {
                            hemoglobina: this.getFC('valorHb').value,
                            valorHb: this.getFC('valorHbRestado').value,
                            factorCorreccion: this.factorAjuste,
                            hematocrito: " ",
                            grupoSanguineo: " ",
                            factorRH: " ",
                            tiempoSangria: " ",
                            tiempoCoagulacion: " ",
                            tiempoProtrombina: " ",
                            tiempoTromboplastina: " ",
                            reticulocitos: " ",
                            compatibilidadSanguinea: " ",
                            rctoGlobulosRojos: " ",
                            rctoPlaquetas: " ",
                            rctoGlobulosBlancos: " ",
                            blastos: " ",
                            juveniles: " ",
                            neutrofilos: " ",
                            nAbastonados: " ",
                            nSegmentados: " ",
                            vsg1hora: " ",
                            vsg2hora: " ",
                            // adiccionales
                            resultados:{
                                clave:'ANEMIA',
                                valor:this.nivelAnemiaSelected,
                                resultado:this.getFC('positivoAnemia').value
                            },
                            observacionesLab:"",
                        },
                    },
                    labExterno: "false"
                }
            ],
            observaciones: "ALGUNA OBSERVACION",
            tsa: {
                tipoTratamiento: this.dosaje.tipoTratamiento,//preventivo o terapeutico
                descripcionEdad: this.dosaje.descripcionEdad,
                nombre: this.dosaje.nombre,
                edadMes: this.dosaje.edadMes,
                nroControl: this.dosaje.nroControl,
                valorHb: this.getFC('valorHbRestado').value,
                factorCorreccion: this.factorAjuste,
                estadoControlado: true,
                tieneAnemia: this.getFC('positivoAnemia').value,//positivo negativo
                nivelAnemia: this.nivelAnemiaSelected,
                fecha: this.obtenerFecha(this.getFC('fechaAdministrada').value),
                fechaTentativa: this.obtenerFecha(this.getFC('fechaTentativa').value),
            }
        } */
        const inputRequest=
        {
            /* fua start */
            codPrestacion: "codPrestacion",
            diagnosticoSIS: "diagnosticoSIS",
            cie10SIS: "cie10SIS",
            /* end */
            codProcedimientoHIS: "85018",
            nombreUPS: "Enfermeria",
            nombreUPSaux: "CRED",
            lab: this.getFC('codLab').value,
            tipo: this.getFC('tipoDiagnostico').value,
            tipoTratamiento: this.dosaje.tipoTratamiento,//preventivo o terapeutico
            descripcionEdad:this.dosaje.descripcionEdad,
            nombre: this.dosaje.nombre,
            edadMes:  this.dosaje.edadMes,
            nroControl: this.dosaje.nroControl,
            valorHb: this.getFC('valorHb').value,
            factorCorreccion:  this.factorAjuste,
            estadoControlado: true,
            tieneAnemia: this.getFC('positivoAnemia').value,//positivo negativo
            nivelAnemia: this.nivelAnemiaSelected,
            fecha:  this.obtenerFecha(this.getFC('fechaAdministrada').value),
            fechaTentativa: this.obtenerFecha(this.getFC('fechaTentativa').value),
        }
        this.confirmationService.confirm({
            header: "Confirmación",
            message: "Esta Seguro que desea guardar el Dosaje de Hemoglobina",
            icon: "pi  pi-exclamation-triangle ",
            acceptLabel: "Si",
            rejectLabel: "No",
            key:'claveDialog',
            accept: () => {
                this.dosajeService.postDosajeHemoglobinaConsultorio(this.idConsulta, inputRequest).subscribe((resp) => {
                    if(resp.cod=="2121"){
                        this.ref.close('agregado')
                    }
                })
            },
            reject: () => {
            },
        });
    }

    obtenerFecha(fecha: Date) {
        const parte1 = fecha.toISOString().split("T");
        const parte2 = parte1[1].split(".")[0];
        return `${parte1[0]}`;
    }

    cambiamosResultado(rescatado) {
        const evaluado = this.getFC('positivoAnemia').value
        if (evaluado == 'SI') {
            this.isDisabledNivelAnemia = false;
            this.vistoBuenoDrop=false
        } else {
            this.isDisabledNivelAnemia = true;
            this.nivelAnemiaSelected = '';
        }
    }

    botonGuardar() {
        const evaluado = this.getFC('positivoAnemia').value
        if(evaluado=='SI'){
            if (this.dosajeFG.valid && this.vistoBuenoDrop)
                return true 
            else
            return false 
        }
        else{
            if (this.dosajeFG.valid){
                return true
            }
            else
                return false     
        }
       
    }
    vistoBuenoDrop:boolean=true
    yaEstoyHabilidado(){
        if(this.nivelAnemiaSelected!=''){
            this.vistoBuenoDrop=true
        }
    }
}
