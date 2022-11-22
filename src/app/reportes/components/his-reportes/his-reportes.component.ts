import { his, hisObject } from "../../interface/his.interface";
import { environment } from "./../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ReportesHisServicesService } from "../../services/reportes-his-services.service";
import { DatePipe } from "@angular/common";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { UpsAuxIpressService } from "../../../mantenimientos/services/ups-aux-ipress/ups-aux-ipress.service";
import { HISService } from "../../../his/services/services.service";

@Component({
    selector: "app-his-reportes",
    templateUrl: "./his-reportes.component.html",
    styleUrls: ["./his-reportes.component.css"],
    providers: [DialogService, DynamicDialogConfig],
})
export class HisReportesComponent implements OnInit {
    src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    formHIS: FormGroup;
    dataHIS: any;
    datePipe = new DatePipe("en-US");
    dataReporteHis: any;
    idIpress: string = "";
    displayMaximizable: boolean = false;
    formHISReporte: FormGroup;
    listaUpsAuxHis: any[] = [];
    diagnosticos: any;
    token: string = "";
    linkHis: string = "";
    //--HIS
    listHIS: his[] = [];
    constructor(
        private fb: FormBuilder,
        private reportesHisServicesService: ReportesHisServicesService,
        private messageService: MessageService,
        private UpsAuxService: UpsAuxIpressService,
        private HisServices: HISService
    ) {
        this.idIpress = JSON.parse(
            localStorage.getItem("usuario")
        ).ipress.idIpress;
        this.token = JSON.parse(localStorage.getItem("token")).token;
    }

    ngOnInit(): void {
        this.buildForm();
        this.recuperarUpsAuxHis();
    }
    /** Servicios para recuperar lista de ups Aux por ipress***/
    recuperarUpsAuxHis() {
        this.UpsAuxService.getUpsAuxPorIpress(this.idIpress).subscribe(
            (r: any) => {
                if (r.object != null) {
                    this.listaUpsAuxHis = r.object.filter(
                        (element) => element.estado == true
                    );
                }
                console.log("lista ups aux ", this.listaUpsAuxHis);
            }
        );
    }
    buildForm() {
        (this.formHIS = this.fb.group({
            upsAux: new FormControl(""),
            fechaBusqueda: new FormControl(""),
        })),
            (this.formHISReporte = this.fb.group({
                anio: new FormControl({ value: "", disabled: true }),
                mes: new FormControl({ value: "", disabled: true }),
                dia: new FormControl({ value: "", disabled: true }),
                ipress: new FormControl({ value: "", disabled: true }),
                ups: new FormControl({ value: "", disabled: true }),
                upsAux: new FormControl({ value: "", disabled: true }),
                nombreDigitador: new FormControl({ value: "", disabled: true }),
                codigoDigitador: new FormControl({ value: "", disabled: true }),
                nombreResponsable: new FormControl({
                    value: "",
                    disabled: true,
                }),
                codigoResponsable: new FormControl({
                    value: "",
                    disabled: true,
                }),
                dniResponsable: new FormControl({ value: "", disabled: true }),
                apePaterno: new FormControl({ value: "", disabled: true }),
                apeMaterno: new FormControl({ value: "", disabled: true }),
                nombre: new FormControl({ value: "", disabled: true }),
                fechaNacimiento: new FormControl({ value: "", disabled: true }),
                hora: new FormControl({ value: "", disabled: true }),
                hcl: new FormControl({ value: "", disabled: true }),
                financiamiento: new FormControl({ value: "", disabled: true }),
                ccpp: new FormControl({ value: "", disabled: true }),
                edad: new FormControl({ value: "", disabled: true }),
                sexo: new FormControl({ value: "", disabled: true }),
                grupoRiesgo: new FormControl({ value: "", disabled: true }),
                con_es: new FormControl({ value: "", disabled: true }),
                con_se: new FormControl({ value: "", disabled: true }),
                saludMaterna: new FormControl({ value: "", disabled: true }),
                nroDoc: new FormControl({ value: "", disabled: true }),
                etnia: new FormControl({ value: "", disabled: true }),
                registroOpcional: new FormControl({
                    value: "",
                    disabled: true,
                }),
                semanaGestacion: new FormControl({ value: "", disabled: true }),
                distrito: new FormControl({ value: "", disabled: true }),
                sector: new FormControl({ value: "", disabled: true }),
                peso: new FormControl({ value: "", disabled: true }),
                talla: new FormControl({ value: "", disabled: true }),
                hb: new FormControl({ value: "", disabled: true }),
                codigoActividad: new FormControl({ value: "", disabled: true }),
                diagnosticos: new FormControl({ value: "", disabled: true }),
            }));
    }
    /**Busca un cupo por el numero de dni de un paciente**/
    async buscarHisPorFecha() {
        let upsAux = this.formHIS.value.upsAux;
        console.log(upsAux);
        let fecha = {
            fecha: this.datePipe.transform(
                this.formHIS.value.fechaBusqueda,
                "yyyy-MM-dd"
            ),
        };
        await this.reportesHisServicesService
            .getListHisForUpsAuxFecha(fecha, upsAux)
            .subscribe((result) => {
                this.dataHIS = result;
                console.log(result);
                console.log("LISTA DE CUPO DEL PACIENTE", result);
                if (this.dataHIS == undefined || this.dataHIS.object == null) {
                    this.showInfo();
                } else {
                    this.showSucces();
                    this.dataReporteHis = this.dataHIS.object;
                }
            });
    }

    verHis(rowData: any) {
        console.log(rowData);
        this.displayMaximizable = true;
        let id = rowData.id;
        this.HisServices.getListaHisGeneradosPorId(id).subscribe((r: any) => {
            if (r.object != null) {
                this.diagnosticos = r.object.diagnosticos;
                this.formHISReporte.patchValue({ anio: r.object.anio });
                this.formHISReporte.patchValue({ mes: r.object.mes });
                this.formHISReporte.patchValue({ dia: r.object.dia });
                this.formHISReporte.patchValue({
                    ipress: r.object.nombreIpress,
                });
                this.formHISReporte.patchValue({ ups: r.object.ups });
                this.formHISReporte.patchValue({
                    upsAux: r.object.upsAuxiliar,
                });
                this.formHISReporte.patchValue({
                    nombreDigitador: r.object.nombreDigitador,
                });
                this.formHISReporte.patchValue({
                    codigoDigitador: r.object.codigoDigitador,
                });
                this.formHISReporte.patchValue({
                    nombreResponsable: r.object.nombreProfesional,
                });
                this.formHISReporte.patchValue({
                    codigoResponsable: r.object.colegiatura,
                });
                this.formHISReporte.patchValue({
                    dniResponsable: r.object.dniProfesional,
                });
                this.formHISReporte.patchValue({ hora: r.object.horaAtencion });
                this.formHISReporte.patchValue({ hcl: r.object.nroHcl });
                this.formHISReporte.patchValue({ ccpp: r.object.ccpp });
                this.formHISReporte.patchValue({ edad: r.object.edad });
                this.formHISReporte.patchValue({ sexo: r.object.sexo });
                this.formHISReporte.patchValue({
                    grupoRiesgo: r.object.grupoRiesgo,
                });
                this.formHISReporte.patchValue({ con_es: r.object.conIngEs });
                this.formHISReporte.patchValue({ con_se: r.object.conIngSe });
                this.formHISReporte.patchValue({
                    saludMaterna: r.object.saludMaterna,
                });
                this.formHISReporte.patchValue({ nroDoc: r.object.nroDoc });
                this.formHISReporte.patchValue({ etnia: r.object.etnia });
                this.formHISReporte.patchValue({
                    registroOpcional: r.object.registroOpcional,
                });
                this.formHISReporte.patchValue({
                    semanaGestacion: r.object.semanaGestacion,
                });
                this.formHISReporte.patchValue({
                    saludMaterna: r.object.saludMaterna,
                });
                this.formHISReporte.patchValue({ distrito: r.object.distrito });
                this.formHISReporte.patchValue({ sector: r.object.sector });
                this.formHISReporte.patchValue({
                    codigoActividad: r.object.actividad,
                });
                this.formHISReporte.patchValue({ peso: r.object.peso });
                this.formHISReporte.patchValue({ talla: r.object.talla });
                this.formHISReporte.patchValue({ hb: r.object.hb });
            }
            console.log("lista ups aux ", this.listaUpsAuxHis);
        });
    }

    showSucces() {
        this.messageService.add({
            severity: "success",
            summary: "HIS",
            detail: "Registros de HIS recuperado exitosamente",
        });
    }

    showInfo() {
        this.messageService.add({
            severity: "info",
            summary: "HIS",
            detail: "No hay registros de HIS",
        });
    }

    download() {
        let fecha = this.datePipe.transform(
            this.formHIS.value.fechaBusqueda,
            "yyyyMMdd"
        );
        let ups = this.formHIS.value.upsAux;
        this.reportesHisServicesService
            .reportHIS(fecha, ups, this.token)
            .subscribe((r: any) => {
                console.log(r);
            });
    }

    alert() {
        let fecha = this.formHIS.value.fechaBusqueda;
        let ups = this.formHIS.value.upsAux;
        //if (fecha == "" || ups == "") console.log("vacio");
        this.reportesHisServicesService
            .download(this.linkHis)
            .subscribe((blob) => {
                console.log("blob", blob);
                const a = document.createElement("a");
                const objectUrl = URL.createObjectURL(blob);
                a.href = objectUrl;
                a.download = "archive.zip";
                a.click();
                URL.revokeObjectURL(objectUrl);
            });
    }
    link(data) {
        /* let fecha = this.datePipe.transform(data.fechaRegistro, "yyyyMMdd");
        let ups = data.upsAux;
        let urlJasper =
            environment.base_urlTx +
            "/jasperserver/rest_v2/reports/Reports/HIS/anexo1.pdf?";
        this.linkHis =
            urlJasper +
            "fecha=" +
            fecha +
            "&upsAux=" +
            ups +
            "&token=Bearer " +
            this.token;
        console.log(this.linkHis); */
    }

    linkHIS() {
        /* let fecha = this.datePipe.transform(
            this.formHIS.value.fechaBusqueda,
            "yyyyMMdd"
        );
        let ups = this.formHIS.value.upsAux;
        let urlJasper =
            environment.base_urlTx +
            "/jasperserver/rest_v2/reports/Reports/HIS/anexo1.pdf?";
        this.linkHis =
            urlJasper +
            "fecha=" +
            fecha +
            "&upsAux=" +
            ups +
            "&token=Bearer " +
            this.token; */
            let fecha = this.datePipe.transform(
                this.formHIS.value.fechaBusqueda,
                "yyyyMMdd"
            );
            let ups = this.formHIS.value.upsAux;
            let urlJasper =
                environment.base_urlTx +
                "/jasperserver/rest_v2/reports/Reports/HIS/anexo1.pdf?";
            this.linkHis =
                urlJasper +
                "fecha=" +
                fecha +
                "&upsAux="
    }

    buscar() {
        let fecha = this.datePipe.transform(
            this.formHIS.value.fechaBusqueda,
            "yyyy-MM-dd"
        );
        let body = {
            fecha: fecha,
        };
        this.reportesHisServicesService
            .listHis(body)
            .subscribe((r: hisObject) => {
                this.listHIS = r.object;
            });
    }
}
