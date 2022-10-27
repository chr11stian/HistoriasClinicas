import { stringify } from "querystring";
import { TratamientoConsultaService } from "src/app/cred/citas/atencion-cred/consulta-principal/services/tratamiento-consulta.service";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
    selector: "app-consejeria",
    templateUrl: "./consejeria.component.html",
    styleUrls: ["./consejeria.component.css"],
})
export class ConsejeriaComponent implements OnInit {
    FrmConsejeria: FormGroup;
    idConsulta: string;
    constructor(public consejeriaService: TratamientoConsultaService) {}

    ngOnInit(): void {
        this.build();
        this.idConsulta = JSON.parse(
            localStorage.getItem("documento")
        ).idConsulta;
        this.cargar();
    }

    build() {
        this.FrmConsejeria = new FormGroup({
            consejeria: new FormControl("", []),
        });
    }
    cargar() {
        this.consejeriaService
            .getConsejeria(this.idConsulta)
            .subscribe((r: any) => {
                this.FrmConsejeria.get("consejeria").setValue(r.object.consejeria);
            });
    }
    guardar() {
        let body = {
            consejeria: this.FrmConsejeria.get("consejeria").value,
        };
        this.consejeriaService
            .saveConsejeria(this.idConsulta, body)
            .subscribe((res: any) => {
                if (res.cod == "2121") {
                    Swal.fire({
                        icon: "success",
                        text: "Se guardo correctamente consejeria",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            });
    }
}
