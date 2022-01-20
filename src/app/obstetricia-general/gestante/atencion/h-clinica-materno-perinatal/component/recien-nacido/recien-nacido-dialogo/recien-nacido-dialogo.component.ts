import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { ObstetriciaGeneralService } from 'src/app/obstetricia-general/services/obstetricia-general.service';
import { CieService } from 'src/app/obstetricia-general/services/cie.service';

@Component({
    selector: 'app-recien-nacido-dialogo',
    templateUrl: './recien-nacido-dialogo.component.html',
    styleUrls: ['./recien-nacido-dialogo.component.css']
})
export class RecienNacidoDialogoComponent implements OnInit {
    form: FormGroup;
    formEgresoRN: FormGroup;
    formPatologias: FormGroup;
    stateOptions: any[];
    todosEgresosDelRN: any[] = [];
    patologiasRN: any[] = [];
    datosRecienNacido: any[] = [];
    RNDialog: boolean;
    egresoRNDialog: boolean;
    patologiaDialog: boolean;
    idObstetricia: string;
    datePipe = new DatePipe('en-US');
    estadoEditarRN: boolean = false;
    indexRNEditado: number = 0;
    estadoEditarPatologia: boolean = false;
    indexPatologiaEditado: number = 0;
    listaDeCIE: any;

    constructor(
        private formBuilder: FormBuilder,
        private ref: DynamicDialogRef,
        private obstetriciaGeneralService: ObstetriciaGeneralService,
        public config: DynamicDialogConfig,
        private CieService: CieService,
    ) {
        this.stateOptions = [{ label: 'Si', value: true }, { label: 'No', value: false }];
        this.buildForm();
        this.idObstetricia = this.obstetriciaGeneralService.idGestacion;
        console.log(config.data);
        if (config.data) {
            this.llenarCamposEdicionRN();
        }
    }

    buildForm() {
        this.form = this.formBuilder.group({
            autocompleteDiagnostico: [''],
            sexo: [''],
            peso: [''],
            perimetroCefalico: [''],
            temperatura: [''],
            pesoRN: [''],
            talla: [''],
            recienNacidoHcl: [''],
            nombreRecienNacido: [''],
            sinPatologias: [''],
            patologia1: [''],
            patologiaFecha1: [''],
            patologiaCIE1: [''],
            patologia2: [''],
            patologiaFecha2: [''],
            patologiaCIE2: [''],
            patologia3: [''],
            patologiaFecha3: [''],
            patologiaCIE3: [''],
            edadPorExamenFisico: [''],
            apgar1: [''],
            apgar2: [''],
            semanasRN: [''],
            detalleApgar1: [''],
            detalleApgar2: [''],
            pesoEdadGes: [''],
            reanimacion: [''],
            medicacionReanimacionRecienNacido: [''],
            vitaminaK: [''],
            profilaxisOcular: [''],
            controlPuerperioInmediato: [''],
            examenFisico: [''],
            examenVih: [''],
            hospitalizacion: [''],
            necropsia: [''],
            slueticaVdrlRpr: [''],
            alojamientoConjunto: [''],
            contactoPielaPielLmh: [''],
            lme: [''],
            deposiciones: [''],
            ictericiaPrecoz: [''],
            bcg: [''],
            hepatitisb: [''],
            fechaRN: [''],
            egresoRN: [''],
            dxFallecimiento: [''],
            dxFallecimientoNoAplica: [''],
            dxTraslado: [''],
            dxTrasladoNoAplica: [''],
            establecimientoTras: [''],
            estaNoAplica: [''],
            alimentoAlta: [''],
            tsh: [''],
            pesoEgreso: [''],
            fechaIngresoMaterno: [''],
            reIngreso: [''],
            egresoMaterno: [''],
            dxMaternoFallecimiento: [''],
            dxMfNoAplica: [''],
            dxMaternoTraslado: [''],
            dxMtNoAplica: [''],
            MaternoEstablecimientoTras: [''],
            MaternoEstaNoAplica: [''],
            anticonceptivos: [''],
            grupo: [''],
            rh: [''],
            cie10dxMf: [''],
            autocompletedxMf: [''],
            cie10dxMt: [''],
            autocompletedxMt: [''],
            cie10dxf: [''],
            autocompletedxf: [''],
            cie10dxt: [''],
            autocompletedxt: [''],
        })
        this.formEgresoRN = this.formBuilder.group({
            fechaRN: [''],
            diagnostico: [''],
            egresoRN: [''],
            fechaIngreso: [''],
            dxFallecimiento: [''],
            dxfNoAplica: [''],
            dxTraslado: [''],
            dxtNoAplica: [''],
            establecimientoTras: [''],
            estaNoAplica: [''],
            fechaContro: [''],
            controlRecienNacido: [''],
            reingreso: [''],
        })
        this.formPatologias = this.formBuilder.group({
            fecha: [''],
            cie10: [''],
            autocomplete: [''],
            patologia: [''],
        })
    }

    tituloEgresoRN() {
        return "Ingrese Nuevo Egreso de RN";
    }

    openNew() {
        //this.isUpdate = false;
        this.formEgresoRN.reset();
        this.egresoRNDialog = true;
    }

    closeDialogGuardar() {
        this.enviarRecienNacidos();
        this.ref.close(
            this.config.data ? {
                index: this.config.data.index,
                row: this.datosRecienNacido[0]
            } :
                this.datosRecienNacido[0]);
    }

    closeDialog() {
        this.ref.close();
    }

    enviarEgresosRecienNacido() {
        var recienNacidoEgreso = {
            reingreso: this.formEgresoRN.value.reingreso,
            fecha: this.datePipe.transform(this.formEgresoRN.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
            diagnostico: this.formEgresoRN.value.diagnostico,
            fechaIngreso: this.datePipe.transform(this.formEgresoRN.value.fechaIngreso, 'yyyy-MM-dd HH:mm:ss'),
            egreso: this.formEgresoRN.value.egresoRN,
            dxfNoAplica: this.formEgresoRN.value.dxfNoAplica[0] ? true : false,
            dxFallecimiento: this.formEgresoRN.value.dxFallecimiento,
            dxtNoAplica: this.formEgresoRN.value.dxtNoAplica[0] ? true : false,
            dxTraslado: this.formEgresoRN.value.dxTraslado,
            estaNoAplica: this.formEgresoRN.value.estaNoAplica[0] ? true : false,
            establecimientoTraslado: this.formEgresoRN.value.establecimientoTras,
            fechaContro: this.datePipe.transform(this.formEgresoRN.value.fechaContro, 'yyyy-MM-dd HH:mm:ss'),
            controlRecienNacido: this.formEgresoRN.value.controlRecienNacido
        }
        console.log(recienNacidoEgreso);
        this.todosEgresosDelRN.push(recienNacidoEgreso);
        this.egresoRNDialog = false;
    }

    enviarRecienNacidos() {
        console.log("Datos de los egresos ", this.todosEgresosDelRN)
        var recienNacido = {
            recienNacidoHcl: this.form.value.recienNacidoHcl,
            nombreRecienNacido: this.form.value.nombreRecienNacido,
            sexo: this.form.value.sexo,
            talla: parseFloat(this.form.value.talla),
            peso: parseFloat(this.form.value.peso),
            detallePeso: this.form.value.pesoRN,
            temperatura: parseFloat(this.form.value.temperatura),
            perimetroCefalico: parseFloat(this.form.value.perimetroCefalico),
            sinPatologias: this.form.value.sinPatologias ? true : false,
            patologiaRecienNacido: this.patologiasRN,
            edadPorExamenFisico: this.form.value.edadPorExamenFisico,
            sem: this.form.value.semanasRN,
            pesoPorEdadGestacional: this.form.value.pesoEdadGes,
            apgar1: this.form.value.apgar1,
            detalleApgar1: this.form.value.detalleApgar1 ? this.form.value.detalleApgar1[0] : "",
            apgar2: this.form.value.apgar2,
            detalleApgar2: this.form.value.detalleApgar2 ? this.form.value.detalleApgar2[0] : "",
            reanimacionRespiratoria: this.form.value.reanimacion !== "No" ? true : false,
            detallesReaminacion: this.form.value.reanimacion !== "No" ? [this.form.value.reanimacion] : [],
            medicacionReanimacionRecienNacido: this.form.value.medicacionReanimacionRecienNacido,
            vitaminaK: this.form.value.vitaminaK,
            profilaxisOcular: this.form.value.profilaxisOcular,
            controlPuerperioInmediato: this.form.value.controlPuerperioInmediato,
            examenFisico: this.form.value.examenFisico,
            examenVih: this.form.value.examenVih,
            hospitalizacion: this.form.value.hospitalizacion == "true" ? true : false,
            necropsia: this.form.value.necropsia,
            slueticaVdrlRpr: this.form.value.slueticaVdrlRpr,
            evolucionRecienNacido: {
                deposiciones: this.form.value.deposiciones,
                ictericiaPrecoz: this.form.value.ictericiaPrecoz
            },
            alojamientoConjunto: this.form.value.alojamientoConjunto,
            contactoPielaPielLmh: this.form.value.contactoPielaPielLmh,
            lme: this.form.value.lme,
            vacunaRecienNacido: [
                {
                    nombre: "BCG",
                    valor: this.form.value.bcg ? "Si" : "No"
                },
                {
                    nombre: "Hepatitis B",
                    valor: this.form.value.hepatitisb ? "Si" : "No"
                }
            ],
            egresoRecienNacido: {
                fecha: this.datePipe.transform(this.form.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
                egreso: this.form.value.egresoRN,
                dxFallecimiento: this.form.value.dxFallecimiento,
                dxfNoAplica: this.form.value.dxFallecimientoNoAplica[0] ? true : false,
                dxTraslado: this.form.value.dxTraslado,
                dxtNoAplica: this.form.value.dxTrasladoNoAplica[0] ? true : false,
                establecimientoTras: this.form.value.establecimientoTras,
                estaNoAplica: this.form.value.estaNoAplica[0] ? true : false,
                alimentoAlta: this.form.value.alimentoAlta,
                tsh: this.form.value.tsh,
                peso: parseFloat(this.form.value.pesoEgreso)
            },
            ingresoMaterno: {
                fecha: this.datePipe.transform(this.form.value.fechaIngresoMaterno, 'yyyy-MM-dd HH:mm:ss'),
                reIngreso: this.form.value.reIngreso ? true : false,
                egreso: this.form.value.egresoMaterno,
                dxFallecimiento: this.form.value.dxMaternoFallecimiento,
                dxfNoAplica: this.form.value.dxMfNoAplica[0] ? true : false,
                dxTraslado: this.form.value.dxMaternoTraslado,
                dxtNoAplica: this.form.value.dxMtNoAplica[0] ? true : false,
                establecimientoTras: this.form.value.MaternoEstablecimientoTras,
                estaNoAplica: this.form.value.MaternoEstaNoAplica[0] ? true : false,
                anticonceptivos: this.form.value.anticonceptivos
            },
            egresoRecienNacido2: this.todosEgresosDelRN,
            tipoSangre: {
                grupo: this.form.value.grupo,
                rh: this.form.value.rh
            },
        }
        console.log("Datos del recien nacido ", recienNacido);
        this.datosRecienNacido.push(recienNacido);
    }

    canceledEgreso() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.egresoRNDialog = false;
        this.estadoEditarRN = false;
    }

    llenarCamposEdicionRN() {
        let configuracion = this.config.data.row;
        this.form.get('sexo').setValue(configuracion.sexo);
        this.form.get('peso').setValue(configuracion.peso);
        this.form.get('perimetroCefalico').setValue(configuracion.perimetroCefalico);
        this.form.get('temperatura').setValue(configuracion.temperatura);
        this.form.get('pesoRN').setValue(configuracion.detallePeso);
        this.form.get('talla').setValue(configuracion.talla);
        this.form.get('recienNacidoHcl').setValue(configuracion.recienNacidoHcl);
        this.form.get('nombreRecienNacido').setValue(configuracion.nombreRecienNacido);
        this.form.get('sinPatologias').setValue(configuracion.patologiaRecienNacido.length === 0 ? ["Sin patologias"] : []);
        this.patologiasRN = configuracion.patologiaRecienNacido;
        this.form.get('edadPorExamenFisico').setValue(configuracion.edadPorExamenFisico);
        this.form.get('semanasRN').setValue(configuracion.sem);
        this.form.get('apgar1').setValue(configuracion.apgar1);
        this.form.get('apgar2').setValue(configuracion.apgar2);
        this.form.get('detalleApgar1').setValue([configuracion.detalleApgar1]);
        this.form.get('detalleApgar2').setValue([configuracion.detalleApgar2]);
        this.form.get('pesoEdadGes').setValue(configuracion.pesoPorEdadGestacional);
        this.form.get('reanimacion').setValue(configuracion.reanimacionRespiratoria ? configuracion.detallesReaminacion[0] : "No");
        this.form.get('medicacionReanimacionRecienNacido').setValue(configuracion.medicacionReanimacionRecienNacido);
        this.form.get('vitaminaK').setValue(configuracion.vitaminaK);
        this.form.get('profilaxisOcular').setValue(configuracion.profilaxisOcular);
        this.form.get('controlPuerperioInmediato').setValue(configuracion.controlPuerperioInmediato);
        this.form.get('examenFisico').setValue(configuracion.examenFisico);
        this.form.get('examenVih').setValue(configuracion.examenVih);
        this.form.get('hospitalizacion').setValue(configuracion.hospitalizacion ? "true" : "false");
        this.form.get('necropsia').setValue(configuracion.necropsia);
        this.form.get('slueticaVdrlRpr').setValue(configuracion.slueticaVdrlRpr);
        this.form.get('alojamientoConjunto').setValue(configuracion.alojamientoConjunto);
        this.form.get('contactoPielaPielLmh').setValue(configuracion.contactoPielaPielLmh);
        this.form.get('lme').setValue(configuracion.lme);
        this.form.get('deposiciones').setValue(configuracion.evolucionRecienNacido.deposiciones);
        this.form.get('ictericiaPrecoz').setValue(configuracion.evolucionRecienNacido.ictericiaPrecoz);
        this.form.get('bcg').setValue(configuracion.vacunaRecienNacido[0].valor = "Si" ? true : false);
        this.form.get('hepatitisb').setValue(configuracion.vacunaRecienNacido[1].valor = "Si" ? true : false);
        this.form.get('fechaRN').setValue(this.datePipe.transform(new Date(configuracion.egresoRecienNacido.fecha), 'yyyy-MM-ddTHH:mm'));
        this.form.get('egresoRN').setValue(configuracion.egresoRecienNacido.egreso);
        this.form.get('dxFallecimiento').setValue(configuracion.egresoRecienNacido.dxFallecimiento);
        this.form.get('dxFallecimientoNoAplica').setValue(configuracion.egresoRecienNacido.dxfNoAplica ? ["true"] : []);
        this.form.get('dxTraslado').setValue(configuracion.egresoRecienNacido.dxTraslado);
        this.form.get('dxTrasladoNoAplica').setValue(configuracion.egresoRecienNacido.dxtNoAplica? ["true"] : []);
        this.form.get('establecimientoTras').setValue(configuracion.egresoRecienNacido.establecimientoTras);
        this.form.get('estaNoAplica').setValue(configuracion.egresoRecienNacido.estaNoAplica ? ["true"] : []);
        this.form.get('alimentoAlta').setValue(configuracion.egresoRecienNacido.alimentoAlta);
        this.form.get('tsh').setValue(configuracion.egresoRecienNacido.tsh);
        this.form.get('pesoEgreso').setValue(configuracion.egresoRecienNacido.peso);
        this.form.get('fechaIngresoMaterno').setValue(this.datePipe.transform(new Date(configuracion.ingresoMaterno.fecha), 'yyyy-MM-ddTHH:mm'));
        this.form.get('reIngreso').setValue(configuracion.ingresoMaterno.reIngreso ? ["true"] : []);
        this.form.get('egresoMaterno').setValue(configuracion.ingresoMaterno.egreso);
        this.form.get('dxMaternoFallecimiento').setValue(configuracion.ingresoMaterno.dxFallecimiento);
        this.form.get('dxMfNoAplica').setValue(configuracion.ingresoMaterno.dxfNoAplica ? ["true"] : []);
        this.form.get('dxMaternoTraslado').setValue(configuracion.ingresoMaterno.dxTraslado);
        this.form.get('dxMtNoAplica').setValue(configuracion.ingresoMaterno.dxtNoAplica ? ["true"] : []);
        this.form.get('MaternoEstablecimientoTras').setValue(configuracion.ingresoMaterno.establecimientoTras);
        this.form.get('MaternoEstaNoAplica').setValue(configuracion.ingresoMaterno.estaNoAplica ? ["true"] : []);
        this.form.get('anticonceptivos').setValue(configuracion.ingresoMaterno.anticonceptivos);
        this.form.get('grupo').setValue(configuracion.tipoSangre.grupo);
        this.form.get('rh').setValue(configuracion.tipoSangre.rh);
        this.todosEgresosDelRN = configuracion.egresoRecienNacido2;
    }

    openDialogEditarRN(rowData, rowIndex) {
        this.estadoEditarRN = true;
        this.indexRNEditado = rowIndex;
        this.formEgresoRN.reset();
        this.formEgresoRN.get('reingreso').setValue(rowData.reingreso);
        this.formEgresoRN.get('fechaRN').setValue(this.datePipe.transform(new Date(rowData.fecha), 'yyyy-MM-ddTHH:mm'));
        this.formEgresoRN.get('diagnostico').setValue(rowData.diagnostico);
        this.formEgresoRN.get('fechaIngreso').setValue(this.datePipe.transform(new Date(rowData.fechaIngreso), 'yyyy-MM-ddTHH:mm'));
        this.formEgresoRN.get('egresoRN').setValue(rowData.egreso);
        this.formEgresoRN.get('dxfNoAplica').setValue(rowData.dxfNoAplica ? ["true"] : []);
        this.formEgresoRN.get('dxFallecimiento').setValue(rowData.dxFallecimiento);
        this.formEgresoRN.get('dxtNoAplica').setValue(rowData.dxtNoAplica ? ["true"] : []);
        this.formEgresoRN.get('dxTraslado').setValue(rowData.dxTraslado);
        this.formEgresoRN.get('estaNoAplica').setValue(rowData.estaNoAplica ? ["true"] : []);
        this.formEgresoRN.get('establecimientoTras').setValue(rowData.establecimientoTraslado);
        this.formEgresoRN.get('fechaContro').setValue(this.datePipe.transform(new Date(rowData.fechaContro), 'yyyy-MM-ddTHH:mm'));
        this.formEgresoRN.get('controlRecienNacido').setValue(rowData.controlRecienNacido);
        this.egresoRNDialog = true;
    }

    guardarEdicionEgresoRN() {
        var recienNacidoEgreso = {
            reingreso: this.formEgresoRN.value.reingreso,
            fecha: this.datePipe.transform(this.formEgresoRN.value.fechaRN, 'yyyy-MM-dd HH:mm:ss'),
            diagnostico: this.formEgresoRN.value.diagnostico,
            fechaIngreso: this.datePipe.transform(this.formEgresoRN.value.fechaIngreso, 'yyyy-MM-dd HH:mm:ss'),
            egreso: this.formEgresoRN.value.egresoRN,
            dxfNoAplica: this.formEgresoRN.value.dxfNoAplica[0] ? true : false,
            dxFallecimiento: this.formEgresoRN.value.dxFallecimiento,
            dxtNoAplica: this.formEgresoRN.value.dxtNoAplica[0] ? true : false,
            dxTraslado: this.formEgresoRN.value.dxTraslado,
            estaNoAplica: this.formEgresoRN.value.estaNoAplica[0] ? true : false,
            establecimientoTraslado: this.formEgresoRN.value.establecimientoTras,
            fechaContro: this.datePipe.transform(this.formEgresoRN.value.fechaContro, 'yyyy-MM-dd HH:mm:ss'),
            controlRecienNacido: this.formEgresoRN.value.controlRecienNacido
        }
        console.log(recienNacidoEgreso);
        this.todosEgresosDelRN.splice(this.indexRNEditado, 1, recienNacidoEgreso);
        this.egresoRNDialog = false;
        this.estadoEditarRN = false;
    }

    eliminarEgresoRN(rowIndex) {
        this.estadoEditarRN = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar egreso del RN',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.todosEgresosDelRN.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    openNewPatologia() {
        //this.isUpdate = false;
        this.formPatologias.reset();
        this.patologiaDialog = true;
    }
    enviarPatologias() {
        var patologia = {
            fecha: this.datePipe.transform(this.formPatologias.value.fecha, 'yyyy-MM-dd'),
            patologia: this.formPatologias.value.patologia,
            cie10: this.formPatologias.value.cie10 === '' ? '' : this.formPatologias.value.cie10.codigoItem,
        }
        console.log(patologia);
        this.patologiasRN.push(patologia);
        this.patologiaDialog = false;
    }
    openDialogEditarPatologia(rowData, rowIndex) {
        this.estadoEditarPatologia = true;
        this.indexPatologiaEditado = rowIndex;
        this.formPatologias.reset();
        this.formPatologias.get('fecha').setValue(rowData.fecha);
        this.formPatologias.get('patologia').setValue(rowData.patologia);
        this.CieService.getCIEByCod(rowData.cie10).subscribe((resCIE: any) => {
            this.formPatologias.get('cie10').setValue(resCIE.object);
        })

        this.patologiaDialog = true;
    }
    guardarEdicionPatologiaRN() {
        var patologia = {
            fecha: this.datePipe.transform(this.formPatologias.value.fecha, 'yyyy-MM-dd'),
            patologia: this.formPatologias.value.patologia,
            cie10: this.formPatologias.value.cie10 === '' ? '' : this.formPatologias.value.cie10.codigoItem,
        }
        console.log(patologia);
        this.patologiasRN.splice(this.indexPatologiaEditado, 1, patologia);
        this.patologiaDialog = false;
        this.estadoEditarPatologia = false;
    }

    eliminarPatologiaRN(rowIndex) {
        this.estadoEditarPatologia = false;
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            title: 'Estas seguro de eliminar egreso del RN',
            text: '',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.patologiasRN.splice(rowIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado correctamente',
                    text: '',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    canceledPatologia() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.patologiaDialog = false;
        this.estadoEditarPatologia = false;
    }

    filterCIE10(event) {
        this.CieService.getCIEByDescripcion(event.query).subscribe((res: any) => {
            this.listaDeCIE = res.object
        })
    }

    selectedOption(event, cieType) {
        if (cieType == 0) {
            this.formPatologias.patchValue({ patologia: event.descripcionItem });
        }
        if (cieType == 1) {
            this.form.patchValue({ dxFallecimiento: event.descripcionItem });
        }
        if (cieType == 2) {
            this.form.patchValue({ dxTraslado: event.descripcionItem });
        }
        if (cieType == 3) {
            this.form.patchValue({ dxMaternoFallecimiento: event.descripcionItem });
        }
        if (cieType == 4) {
            this.form.patchValue({ dxMaternoTraslado: event.descripcionItem });
        }
    }

    selectedOptionNameCIE(event, cieType) {
        console.log('lista de cie ', this.listaDeCIE);
        if (cieType == 0) {
            this.formPatologias.get("patologia").setValue(event.descripcionItem);
            this.formPatologias.get("autocomplete").setValue("");
            this.formPatologias.patchValue({ cie10: event }, { emitEvent: false });
        }
        if (cieType == 1) {
            this.form.get("dxFallecimiento").setValue(event.descripcionItem);
            this.form.get("autocompletedxf").setValue("");
            this.form.patchValue({ cie10dxf: event }, { emitEvent: false });
        }
        if (cieType == 2) {
            this.form.get("dxTraslado").setValue(event.descripcionItem);
            this.form.get("autocompletedxt").setValue("");
            this.form.patchValue({ cie10dxt: event }, { emitEvent: false });
        }
        if (cieType == 3) {
            this.form.get("dxMaternoFallecimiento").setValue(event.descripcionItem);
            this.form.get("autocompletedxMf").setValue("");
            this.form.patchValue({ cie10dxMf: event }, { emitEvent: false });
        }
        if (cieType == 4) {
            this.form.get("dxMaternoTraslado").setValue(event.descripcionItem);
            this.form.get("autocompletedxMt").setValue("");
            this.form.patchValue({ cie10dxMt: event }, { emitEvent: false });
        }
    }
    selectNoAplicaDFallecimiento(tipoEgreso) {
        console.log(this.form.value.dxFallecimientoNoAplica);
        console.log(this.form.value.dxMfNoAplica);
        if (tipoEgreso == 0) {
            if (this.form.value.dxFallecimientoNoAplica[0] == 'true') {
                this.form.get("dxFallecimiento").setValue("");
                this.form.get("autocompletedxf").setValue("");
                this.form.get("autocompletedxf").disable();
                this.form.patchValue({ cie10dxf: "" });
                this.form.get("cie10dxf").disable();
            }
            else {
                this.form.get("dxFallecimiento").setValue("");
                this.form.get("autocompletedxf").setValue("");
                this.form.get("cie10dxf").setValue("");
                this.form.get("autocompletedxf").enable();
                this.form.get("cie10dxf").enable();
            }
        }

        if (tipoEgreso == 1) {
            if (this.form.value.dxMfNoAplica[0] == 'true') {
                this.form.get("dxMaternoFallecimiento").setValue("");
                this.form.get("autocompletedxMf").setValue("");
                this.form.get("autocompletedxMf").disable();
                this.form.patchValue({ cie10dxMf: "" });
                this.form.get("cie10dxMf").disable();
            }
            else{
                this.form.get("dxMaternoFallecimiento").setValue("");
                this.form.get("autocompletedxMf").setValue("");
                this.form.get("cie10dxMf").setValue("");
                this.form.get("autocompletedxMf").enable();
                this.form.get("cie10dxMf").enable();
            }
        }
    }
    selectNoAplicaTraslado(tipoEgreso) {
        console.log(this.form.value.dxTrasladoNoAplica);
        console.log(this.form.value.dxMtNoAplica);
        if (tipoEgreso == 0) {
            if (this.form.value.dxTrasladoNoAplica[0] == 'true') {
                this.form.get("dxTraslado").setValue("");
                this.form.get("autocompletedxt").setValue("");
                this.form.get("autocompletedxt").disable();
                this.form.patchValue({ cie10dxt: "" });
                this.form.get("cie10dxt").disable();
            }
            else {
                this.form.get("dxTraslado").setValue("");
                this.form.get("autocompletedxt").setValue("");
                this.form.get("cie10dxt").setValue("");
                this.form.get("autocompletedxt").enable();
                this.form.get("cie10dxt").enable();
            }
        }

        if (tipoEgreso == 1) {
            if (this.form.value.dxMtNoAplica[0] == 'true') {
                this.form.get("dxMaternoTraslado").setValue("");
                this.form.get("autocompletedxMt").setValue("");
                this.form.get("autocompletedxMt").disable();
                this.form.patchValue({ cie10dxMt: "" });
                this.form.get("cie10dxMt").disable();
            }
            else{
                this.form.get("dxMaternoTraslado").setValue("");
                this.form.get("autocompletedxMt").setValue("");
                this.form.get("cie10dxMt").setValue("");
                this.form.get("autocompletedxMt").enable();
                this.form.get("cie10dxMt").enable();
            }
        }
    }

    ngOnInit(): void {
    }

}
