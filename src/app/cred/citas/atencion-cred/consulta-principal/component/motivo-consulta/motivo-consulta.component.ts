import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import Swal from "sweetalert2";
import { MotivosConsultaService } from "../../services/motivos-consulta.service";

interface formControlInterface {
    pro: string,
    label: string,
    nameFC: string
}

@Component({
    selector: 'app-motivo-consulta',
    templateUrl: './motivo-consulta.component.html',
    styleUrls: ['./motivo-consulta.component.css']

})
export class MotivoConsultaComponent implements OnInit {
    id: string;
    attributeLocalS = 'idConsulta'
    examFG: FormGroup;
    motivoFG: FormGroup;
    formExam: FormGroup;
    dataExamFisicos: formControlInterface[] = [
        { pro: 't', label: 'T°', nameFC: 'TFC' },
        { pro: 'pa', label: 'PA', nameFC: 'PAFC' },
        { pro: 'fc', label: 'FC:', nameFC: 'FC' },
        { pro: 'fr', label: 'FR', nameFC: 'FRFC' },
        { pro: 'peso', label: 'Peso ', nameFC: 'PesoFC' },
        { pro: 'talla', label: 'Talla ', nameFC: 'TallaFC' },
        { pro: 'pc', label: 'PC ', nameFC: 'PCFC' }
    ]
    motivosConsulta: motivosConsultaInterface;

    constructor(private motivosService: MotivosConsultaService) {
        this.buildFG()
        this.recuperarMotivos()
    }

    buildFG(): void {
        this.id = localStorage.getItem(this.attributeLocalS);
        this.motivoFG = new FormGroup({
            detailMotivoFC: new FormControl({ value: null, disabled: false }, []),
            enfermedadFC: new FormControl({ value: null, disabled: false }, []),
            inicioFC: new FormControl({ value: null, disabled: false }, []),
            cursoFC: new FormControl({ value: null, disabled: false }, []),
        })
        /** Signos vitales */
        this.examFG = new FormGroup({
            TFC: new FormControl({ value: null, disabled: false }, []),
            PAFC: new FormControl({ value: null, disabled: false }, []),
            FC: new FormControl({ value: null, disabled: false }, []),
            FRFC: new FormControl({ value: null, disabled: false }, []),
            PesoFC: new FormControl({ value: null, disabled: false }, []),
            TallaFC: new FormControl({ value: null, disabled: false }, []),
            PCFC: new FormControl({ value: null, disabled: false }, []),
            detailFC: new FormControl("", []),
        })
        /** examen fisico */
        this.formExam = new FormGroup({
            piel: new FormControl(""),
            mucosas: new FormControl(""),
            cabeza: new FormControl(""),
            cuello: new FormControl(""),
            cardioVascular: new FormControl(""),
            pulmones: new FormControl(""),
            mamas: new FormControl(""),
            pezones: new FormControl(""),
            abdomen: new FormControl(""),
            obsExamenFisico: new FormControl(""),
        });
    }

    ngOnInit(): void {
    }

    /*  objeto motivo */
    recuperarMotivos() {
        this.motivosService.getMotivos(this.id).subscribe((r: any) => {
            //-- recupera informacion de motivos
            this.motivosConsulta = r.object;
            console.log('motivos', r)
            this.motivoFG.get('detailMotivoFC').setValue(this.motivosConsulta.motivosConsulta)
            this.motivoFG.get('enfermedadFC').setValue(this.motivosConsulta.tiempoEnfermedad)
            this.motivoFG.get('inicioFC').setValue(this.motivosConsulta.formaInicio)
            this.motivoFG.get('cursoFC').setValue(this.motivosConsulta.curso)
            this.examFG.get('TFC').setValue(this.motivosConsulta.examenFisico.signosVitales.t)
            this.examFG.get('PAFC').setValue(this.motivosConsulta.examenFisico.signosVitales.pa)
            this.examFG.get('FC').setValue(this.motivosConsulta.examenFisico.signosVitales.fc)
            this.examFG.get('FRFC').setValue(this.motivosConsulta.examenFisico.signosVitales.fr)
            this.examFG.get('PesoFC').setValue(this.motivosConsulta.examenFisico.signosVitales.peso)
            this.examFG.get('TallaFC').setValue(this.motivosConsulta.examenFisico.signosVitales.talla)
            this.examFG.get('PCFC').setValue(this.motivosConsulta.examenFisico.signosVitales.pc)
            this.examFG.get('detailFC').setValue(this.motivosConsulta.examenFisico.revisionCuello)
        })
    }

    save() {
        let signosVitales: signosVitalesInterface = {
            t: this.examFG.value.TFC,
            pa: this.examFG.value.PAFC,
            fc: this.examFG.value.FC,
            fr: this.examFG.value.FRFC,
            peso: this.examFG.value.PesoFC,
            talla: this.examFG.value.TallaFC,
            pc: this.examFG.value.PCFC
        }
        console.log("examFG ", this.examFG.value)
        let examenFisico: examenFisicoInterface = {
            signosVitales: signosVitales,
            revisionCabeza: this.examFG.value.detailFC,
            revisionCuello: this.examFG.value.detailFC,
            revisionTorax: this.examFG.value.detailFC,
            revisionAbdomen: this.examFG.value.detailFC,
            revisionGenitales: this.examFG.value.detailFC,
            revisionExtremidades: this.examFG.value.detailFC
        }
        const req = {
            motivosConsulta: this.motivoFG.value.detailMotivoFC,
            tiempoEnfermedad: this.motivoFG.value.enfermedadFC,
            formaInicio: this.motivoFG.value.inicioFC,
            curso: this.motivoFG.value.cursoFC,
            examenFisico: examenFisico
        }
        console.log('req', req)
        if (req) {
            this.motivosService.updateMotivos(this.id, req).subscribe(
                (resp) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado correctamente',
                        text: '',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            )
        }
    }
}

interface motivosConsultaInterface {
    motivosConsulta: string,
    tiempoEnfermedad: string,
    formaInicio: string,
    curso: string,
    examenFisico: examenFisicoInterface
}

interface examenFisicoInterface {
    signosVitales: signosVitalesInterface,
    revisionCabeza: string,
    revisionCuello: string,
    revisionTorax: string,
    revisionAbdomen: string,
    revisionGenitales: string,
    revisionExtremidades: string
}

interface signosVitalesInterface {
    t: number,
    pa: number,
    fc: string,
    fr: string,
    peso: number,
    talla: number,
    pc: number
}