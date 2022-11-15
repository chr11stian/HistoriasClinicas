import { TratamientoConsultaService } from './../../services/tratamiento-consulta.service';
import { his } from './../../models/his';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import {
    dato,
    motivoConsultaInterface,
    proxCita,
} from "../../../../models/data";
import { SpinnerHandlerService } from "src/app/core/services/spinner-handler.service";
import { DatePipe } from "@angular/common";
import { RolGuardiaService } from "src/app/core/services/rol-guardia/rol-guardia.service";
import { ConsultaGeneralService } from "../../services/consulta-general.service";
import { MenuItem, MessageService } from "primeng/api";
import { FinalizarConsultaService } from "../../services/finalizar-consulta.service";
import { Router } from '@angular/router';

@Component({
    selector: "app-tratamiento-consulta",
    templateUrl: "./tratamiento-consulta.component.html",
    styleUrls: ["./tratamiento-consulta.component.css"],
})
export class TratamientoConsultaComponent implements OnInit {
    data: dato;
    attributeLocalS = "documento";
    //--Interconsulta
    tooltipItems: MenuItem[];
    interconsulta: proxCita[] = [];
    listInterconsulta: proxCita[] = [];
    dialogInterconsulta: boolean;
    formInterconsulta: FormGroup;
    isUpdate: boolean = false;
    datePipe = new DatePipe("en-US");
    fecha: Date;
    servicios: string[] = [];
    loading: boolean = false;
    //--HIS
    dialogHIS: boolean;
    isUpdateHIS: boolean = false;
    formHIS: FormGroup;
    listHIS: his[] = [];
    nexDate: NextDate;
    existData: boolean = false;
    arrayFua: FUA[];
    personalData: PersonalInfo;
    constructor(
        private tratamientoService: TratamientoConsultaService,
        private rolGuardiaService: RolGuardiaService,
        private consultaGeneralService: ConsultaGeneralService,
        private finalizarConsulta: FinalizarConsultaService,
        private router: Router,
    ) {
        // this.nexDate = this.consultaGeneralService.fecha
        // console.log("proxima citaaaa ", this.nexDate);
    }
    ngOnInit(): void {
        this.data = <dato>(
            JSON.parse(localStorage.getItem(this.attributeLocalS))
        );
    }

    /* interconsulta */
    open(): void {
        this.isUpdate = false;
    }


    concludeConsultation(): void {
        this.nexDate = {
            fecha: this.consultaGeneralService.fecha,
            motivo: null,
        };
        Swal.fire({
            title: '¿Desea cerrar la consulta?',
            text: "Ya no podra modificar nada en la consulta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.dialogHIS = false;
                this.finalizarConsulta
                    .putNextAppointment(this.data.idConsulta, this.nexDate)
                    .then((res: any) => {
                        if (res.cod == '2126') {
                            this.router.navigate(['/dashboard/cred/lista-consulta'])
                            Swal.fire({
                                icon: 'success',
                                title: 'Se cerro la consulta satisfactoriamente',
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            this.dialogHIS = false;
                            
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo cerrar la consulta',
                                showConfirmButton: false,
                                timer: 2000,
                            }
                            );
                        }

                    });
            }
        })

    }
    /* his */
    async his() {
        this.cargarHis();
        this.isUpdateHIS = false;
        this.dialogHIS = true;
        await this.finalizarConsulta.getShowFuaData(this.data.idConsulta).then((res: any) => {
            this.arrayFua = res.object;
            this.arrayFua.sort((a, b) => a.codPrestacion.localeCompare(b.codPrestacion));
            if (this.arrayFua != null) {
                this.personalData = {
                    nombre: this.arrayFua[0].nombre + ' ' + this.arrayFua[0].apePaterno + ' ' + this.arrayFua[0].apeMaterno,
                    tipoDoc: this.arrayFua[0].tipoDoc,
                    nroDoc: this.arrayFua[0].nroDoc
                }
            }
            // console.log('data of fua ', this.personalData);
        })
    }
    cargarHis() {
        this.tratamientoService
            .getHIS(this.data.idConsulta)
            .subscribe((r: any) => {
                if (r.cod == "2015") {
                    Swal.fire({
                        icon: 'info',
                        title: 'Ya se cerro la consulta',
                        text: '',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    this.dialogHIS = false;
                    return;
                }
                this.listHIS = r.object;
                // console.log("his", this.listHIS);
                this.listHIS == null ? this.existData = false : this.existData = true;
            });
    }

}

interface NextDate {
    fecha: string;
    motivo?: string;
}
interface FUA {
    nroDoc: string;
    tipoDoc: string;
    nombre: string;
    apePaterno: string;
    apeMaterno: string;
    codPrestacion?: string;
    inmunizaciones?: Inmunizaciones[];
    diagnosticos?: Diagnosticos[];
}
interface Diagnosticos {
    cie_10: string;
    diagnostico: string;
    lab?: string;
    tipoDx: string;
}
interface Inmunizaciones {
    nombre: string;
    codPrestacion: string;
    nombreComercial: string;
}
interface PersonalInfo {
    nombre: string;
    tipoDoc: string;
    nroDoc: string;
}