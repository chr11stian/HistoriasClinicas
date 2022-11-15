import { ConsultaService } from "./../services/consulta.service";
import { Component, OnInit } from "@angular/core";
import { Consulta, Diagnostico } from "../models/consulta-lab";
import { DatePipe, formatDate } from "@angular/common";
import Swal from "sweetalert2";
@Component({
    selector: "app-consulta-lab",
    templateUrl: "./consulta-lab.component.html",
    styleUrls: ["./consulta-lab.component.css"],
})
export class ConsultaLabComponent implements OnInit {
    dni: string;
    fecha: string;
    listaConsulta: Consulta[];
    datePipe = new DatePipe("en-US");
    //---dialog
    dialogDiagnostico: boolean;
    listDiagnosticos: Diagnostico[];
    id: string; //--id his
    listTDx: string[] = ["P", "D", "R"];
    constructor(private consultaService: ConsultaService) {}

    ngOnInit(): void {}

    buscar() {
        let body = {
            fecha: this.datePipe.transform(this.fecha, "yyyy-MM-dd"),
        };
        this.consultaService
            .listConsultaLab(this.dni, body)
            .subscribe((r: any) => {
                this.listaConsulta = r.object;
            });
    }

    habilitar(id: string, diagnosticos: Diagnostico[]) {
        this.dialogDiagnostico = true;
        this.id = id;
        this.listDiagnosticos = diagnosticos;
    }

    actualizar(a, b, c) {
        this.consultaService
            .updateConsultaLab(this.id, a, b, c)
            .subscribe((r: any) => {
                if ((r.cod = "2126")) {
                    Swal.fire({
                        title: "Se actualizo el campo LAB & TDx",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
    }
}
