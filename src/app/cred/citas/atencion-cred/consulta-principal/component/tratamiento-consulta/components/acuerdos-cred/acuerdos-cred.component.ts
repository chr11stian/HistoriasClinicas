import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { stringify } from "querystring";
import {
    dato,
    listaAcuerdosConMadre,
    acuerdosInterface,
} from "../../../../../../models/data";
import Swal from "sweetalert2";
import { FinalizarConsultaService } from "../../../../services/finalizar-consulta.service";
import { TratamientoConsultaService } from "../../../../services/tratamiento-consulta.service";

@Component({
    selector: "app-acuerdos-cred",
    templateUrl: "./acuerdos-cred.component.html",
    styleUrls: ["./acuerdos-cred.component.css"],
})
export class AcuerdosCredComponent implements OnInit {
    FrmAcuerdo: FormGroup;
    FrmObservacion: FormGroup;
    acuerdos: listaAcuerdosConMadre[] = [];
    listAcuerdos: listaAcuerdosConMadre[] = [];
    acuerdosAux: listaAcuerdosConMadre[] = [];
    data: dato;
    mes;
    constructor(
        private acuerdoService: TratamientoConsultaService,
        private acuerdosService: FinalizarConsultaService
    ) {}

    ngOnInit(): void {
        this.buid();
        this.listaAcuerdos();
        this.data = <dato>JSON.parse(localStorage.getItem("documento"));
        this.mes = this.data.mes;
        this.inicioListaAcuerdo();
    }
    inicioListaAcuerdo() {
        this.acuerdoService
            .getListAcuerdo(this.data.idConsulta)
            .subscribe((r: any) => {
                this.acuerdosAux =
                    r.object.acuerdosCompromisosCRED?.listaAcuerdosConMadre || [];
                this.FrmObservacion.get("observaciones").setValue(r.object.observacionesConsulta)
            });
    }
    listaAcuerdos() {
        this.acuerdosService.getListaAcuerdos().subscribe((r: any) => {
            this.listAcuerdos = r.object;
        });
    }
    buid() {
        this.FrmAcuerdo = new FormGroup({
            acuerdo: new FormControl({ value: null, disabled: false }, []),
        });
        this.FrmObservacion = new FormGroup({
            observaciones: new FormControl("", []),
        });
    }
    Eliminar(index) {
        this.acuerdos.splice(index, 1);
        this.acuerdosAux.splice(index, 1);
    }
    Agregar() {
        let a: listaAcuerdosConMadre = {
            nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
        };
        let b: listaAcuerdosConMadre = {
            nroAcuerdo: this.FrmAcuerdo.value.acuerdo,
            descripcion:
                this.listAcuerdos[this.FrmAcuerdo.value.acuerdo - 1]
                    .descripcion,
        };
        if (
            this.acuerdos.find(
                (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
            ) === undefined
        )
            this.acuerdos.push(a);
        if (
            this.acuerdosAux.find(
                (rol) => rol.nroAcuerdo === this.FrmAcuerdo.value.acuerdo
            ) === undefined
        )
            this.acuerdosAux.push(b);
    }
    Guardar() {
        let aux: acuerdosInterface = {
            acuerdosCompromisosCRED: {
                edadMes: this.mes,
                listaAcuerdosConMadre: this.acuerdos,
            },
            observacionesConsulta:
                this.FrmObservacion.get("observaciones").value,
        };

        if (
            this.acuerdosAux.length > 0
            // this.FrmObservacion.get("observaciones").value != ""
        ) {
            this.acuerdoService
                .saveAcuerdo(this.data.idConsulta, aux)
                .subscribe((r: any) => {
                    Swal.fire({
                        icon: "success",
                        title: "Acuerdos",
                        text: "Agregado correctamente",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Acuerdos",
                text: "Datos incompletos...",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    }
}
