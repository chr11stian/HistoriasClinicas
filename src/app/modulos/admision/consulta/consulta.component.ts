import { ConsultaService } from "./../services/consulta.service";
import { Component, OnInit } from "@angular/core";
import { Consulta, DatosPaciente } from "./../models/consulta";
import Swal from "sweetalert2";
@Component({
    selector: "app-consulta",
    templateUrl: "./consulta.component.html",
    styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent implements OnInit {
    dni: string;
    listaConsulta: Consulta[];
    constructor(private consultaService: ConsultaService) {}

    ngOnInit(): void {}

    buscar() {
        this.consultaService.listConsulta(this.dni).subscribe((r: any) => {
            this.listaConsulta = r.object;
        });
    }

    habilitar(id: string) {
        this.consultaService.updateConsulta(id).subscribe((r: any) => {
            if ((r.cod = "2126")) {
                Swal.fire({
                    title: "Se habilito la consulta",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }
}
