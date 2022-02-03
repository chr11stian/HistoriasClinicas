import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpressService } from 'src/app/core/services/ipress/ipress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ipress-horarios',
  templateUrl: './ipress-horarios.component.html',
  styleUrls: ['./ipress-horarios.component.css']
})
export class IpressHorariosComponent implements OnInit {
  formHorario: FormGroup;
  isUpdateHorario: boolean = false;
  horarios: any[];
  idIpress: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private ipressservice: IpressService
  ) {
    this.idIpress = "616de45e0273042236434b51";
    this.buildForm();
    this.getIpressId();
  }

  buildForm() {
    this.formHorario = this.formBuilder.group({
      lunesInicioManiana: ['', [Validators.required]],
      lunesFinManiana: ['', [Validators.required]],
      lunesInicioTarde: ['', [Validators.required]],
      lunesFinTarde: ['', [Validators.required]],
      martesInicioManiana: ['', [Validators.required]],
      martesFinManiana: ['', [Validators.required]],
      martesInicioTarde: ['', [Validators.required]],
      martesFinTarde: ['', [Validators.required]],
      miercolesInicioManiana: ['', [Validators.required]],
      miercolesFinManiana: ['', [Validators.required]],
      miercolesInicioTarde: ['', [Validators.required]],
      miercolesFinTarde: ['', [Validators.required]],
      juevesInicioManiana: ['', [Validators.required]],
      juevesFinManiana: ['', [Validators.required]],
      juevesInicioTarde: ['', [Validators.required]],
      juevesFinTarde: ['', [Validators.required]],
      viernesInicioManiana: ['', [Validators.required]],
      viernesFinManiana: ['', [Validators.required]],
      viernesInicioTarde: ['', [Validators.required]],
      viernesFinTarde: ['', [Validators.required]],
      sabadoInicioManiana: ['', [Validators.required]],
      sabadoFinManiana: ['', [Validators.required]],
      sabadoInicioTarde: ['', [Validators.required]],
      sabadoFinTarde: ['', [Validators.required]],
      domingoInicioManiana: ['', [Validators.required]],
      domingoFinManiana: ['', [Validators.required]],
      domingoInicioTarde: ['', [Validators.required]],
      domingoFinTarde: ['', [Validators.required]],
    })
  }
  getIpressId() {
    this.ipressservice.getIpressID(this.idIpress).subscribe((res: any) => {
      this.horarios = res.object.horario;
      this.openHorario(this.horarios, this.idIpress);
    });
  }
  openHorario(rowData, id) {
    this.horarios = rowData;
    this.idIpress = id;
    this.formHorario.reset();
    this.isUpdateHorario = false;
    console.log(rowData);
    if (rowData !== null) {
      this.formHorario.get('lunesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[0].horas[0].horaInicio}`));
      this.formHorario.get('lunesFinManiana').setValue(new Date(`2021-01-01 ${rowData[0].horas[0].horaFin}`));
      this.formHorario.get('lunesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[0].horas[1].horaInicio}`));
      this.formHorario.get('lunesFinTarde').setValue(new Date(`2021-01-01 ${rowData[0].horas[1].horaFin}`));
      this.formHorario.get('martesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[1].horas[0].horaInicio}`));
      this.formHorario.get('martesFinManiana').setValue(new Date(`2021-01-01 ${rowData[1].horas[0].horaFin}`));
      this.formHorario.get('martesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[1].horas[1].horaInicio}`));
      this.formHorario.get('martesFinTarde').setValue(new Date(`2021-01-01 ${rowData[1].horas[1].horaFin}`));
      this.formHorario.get('miercolesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[2].horas[0].horaInicio}`));
      this.formHorario.get('miercolesFinManiana').setValue(new Date(`2021-01-01 ${rowData[2].horas[0].horaFin}`));
      this.formHorario.get('miercolesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[2].horas[1].horaInicio}`));
      this.formHorario.get('miercolesFinTarde').setValue(new Date(`2021-01-01 ${rowData[2].horas[1].horaFin}`));
      this.formHorario.get('juevesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[3].horas[0].horaInicio}`));
      this.formHorario.get('juevesFinManiana').setValue(new Date(`2021-01-01 ${rowData[3].horas[0].horaFin}`));
      this.formHorario.get('juevesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[3].horas[1].horaInicio}`));
      this.formHorario.get('juevesFinTarde').setValue(new Date(`2021-01-01 ${rowData[3].horas[1].horaFin}`));
      this.formHorario.get('viernesInicioManiana').setValue(new Date(`2021-01-01 ${rowData[4].horas[0].horaInicio}`));
      this.formHorario.get('viernesFinManiana').setValue(new Date(`2021-01-01 ${rowData[4].horas[0].horaFin}`));
      this.formHorario.get('viernesInicioTarde').setValue(new Date(`2021-01-01 ${rowData[4].horas[1].horaInicio}`));
      this.formHorario.get('viernesFinTarde').setValue(new Date(`2021-01-01 ${rowData[4].horas[1].horaFin}`));
      this.formHorario.get('sabadoInicioManiana').setValue(new Date(`2021-01-01 ${rowData[5].horas[0].horaInicio}`));
      this.formHorario.get('sabadoFinManiana').setValue(new Date(`2021-01-01 ${rowData[5].horas[0].horaFin}`));
      this.formHorario.get('sabadoInicioTarde').setValue(new Date(`2021-01-01 ${rowData[5].horas[1].horaInicio}`));
      this.formHorario.get('sabadoFinTarde').setValue(new Date(`2021-01-01 ${rowData[5].horas[1].horaFin}`));
      this.formHorario.get('domingoInicioManiana').setValue(new Date(`2021-01-01 ${rowData[6].horas[0].horaInicio}`));
      this.formHorario.get('domingoFinManiana').setValue(new Date(`2021-01-01 ${rowData[6].horas[0].horaFin}`));
      this.formHorario.get('domingoInicioTarde').setValue(new Date(`2021-01-01 ${rowData[6].horas[1].horaInicio}`));
      this.formHorario.get('domingoFinTarde').setValue(new Date(`2021-01-01 ${rowData[6].horas[1].horaFin}`));
    }
    else {
      this.formHorario.get('lunesInicioManiana').setValue("");
      this.formHorario.get('lunesFinManiana').setValue("");
      this.formHorario.get('lunesInicioTarde').setValue("");
      this.formHorario.get('lunesFinTarde').setValue("");
      this.formHorario.get('martesInicioManiana').setValue("");
      this.formHorario.get('martesFinManiana').setValue("");
      this.formHorario.get('martesInicioTarde').setValue("");
      this.formHorario.get('martesFinTarde').setValue("");
      this.formHorario.get('miercolesInicioManiana').setValue("");
      this.formHorario.get('miercolesFinManiana').setValue("");
      this.formHorario.get('miercolesInicioTarde').setValue("");
      this.formHorario.get('miercolesFinTarde').setValue("");
      this.formHorario.get('juevesInicioManiana').setValue("");
      this.formHorario.get('juevesFinManiana').setValue("");
      this.formHorario.get('juevesInicioTarde').setValue("");
      this.formHorario.get('juevesFinTarde').setValue("");
      this.formHorario.get('viernesInicioManiana').setValue("");
      this.formHorario.get('viernesFinManiana').setValue("");
      this.formHorario.get('viernesInicioTarde').setValue("");
      this.formHorario.get('viernesFinTarde').setValue("");
      this.formHorario.get('sabadoInicioManiana').setValue("");
      this.formHorario.get('sabadoFinManiana').setValue("");
      this.formHorario.get('sabadoInicioTarde').setValue("");
      this.formHorario.get('sabadoFinTarde').setValue("");
      this.formHorario.get('domingoInicioManiana').setValue("");
      this.formHorario.get('domingoFinManiana').setValue("");
      this.formHorario.get('domingoInicioTarde').setValue("");
      this.formHorario.get('domingoFinTarde').setValue("");
    }
    this.clickDisableHorarios();
  }

  clickEditarHorarios() {
    this.isUpdateHorario = true;
    this.formHorario.get('lunesInicioManiana').enable();
    this.formHorario.get('lunesFinManiana').enable();
    this.formHorario.get('lunesInicioTarde').enable();
    this.formHorario.get('lunesFinTarde').enable();
    this.formHorario.get('martesInicioManiana').enable();
    this.formHorario.get('martesFinManiana').enable();
    this.formHorario.get('martesInicioTarde').enable();
    this.formHorario.get('martesFinTarde').enable();
    this.formHorario.get('miercolesInicioManiana').enable();
    this.formHorario.get('miercolesFinManiana').enable();
    this.formHorario.get('miercolesInicioTarde').enable();
    this.formHorario.get('miercolesFinTarde').enable();
    this.formHorario.get('juevesInicioManiana').enable();
    this.formHorario.get('juevesFinManiana').enable();
    this.formHorario.get('juevesInicioTarde').enable();
    this.formHorario.get('juevesFinTarde').enable();
    this.formHorario.get('viernesInicioManiana').enable();
    this.formHorario.get('viernesFinManiana').enable();
    this.formHorario.get('viernesInicioTarde').enable();
    this.formHorario.get('viernesFinTarde').enable();
    this.formHorario.get('sabadoInicioManiana').enable();
    this.formHorario.get('sabadoFinManiana').enable();
    this.formHorario.get('sabadoInicioTarde').enable();
    this.formHorario.get('sabadoFinTarde').enable();
    this.formHorario.get('domingoInicioManiana').enable();
    this.formHorario.get('domingoFinManiana').enable();
    this.formHorario.get('domingoInicioTarde').enable();
    this.formHorario.get('domingoFinTarde').enable();
  }

  clickDisableHorarios() {
    this.formHorario.get('lunesInicioManiana').disable();
    this.formHorario.get('lunesFinManiana').disable();
    this.formHorario.get('lunesInicioTarde').disable();
    this.formHorario.get('lunesFinTarde').disable();
    this.formHorario.get('martesInicioManiana').disable();
    this.formHorario.get('martesFinManiana').disable();
    this.formHorario.get('martesInicioTarde').disable();
    this.formHorario.get('martesFinTarde').disable();
    this.formHorario.get('miercolesInicioManiana').disable();
    this.formHorario.get('miercolesFinManiana').disable();
    this.formHorario.get('miercolesInicioTarde').disable();
    this.formHorario.get('miercolesFinTarde').disable();
    this.formHorario.get('juevesInicioManiana').disable();
    this.formHorario.get('juevesFinManiana').disable();
    this.formHorario.get('juevesInicioTarde').disable();
    this.formHorario.get('juevesFinTarde').disable();
    this.formHorario.get('viernesInicioManiana').disable();
    this.formHorario.get('viernesFinManiana').disable();
    this.formHorario.get('viernesInicioTarde').disable();
    this.formHorario.get('viernesFinTarde').disable();
    this.formHorario.get('sabadoInicioManiana').disable();
    this.formHorario.get('sabadoFinManiana').disable();
    this.formHorario.get('sabadoInicioTarde').disable();
    this.formHorario.get('sabadoFinTarde').disable();
    this.formHorario.get('domingoInicioManiana').disable();
    this.formHorario.get('domingoFinManiana').disable();
    this.formHorario.get('domingoInicioTarde').disable();
    this.formHorario.get('domingoFinTarde').disable();
  }

  funcionReturnMinutos(minutos) {
    if (minutos >= 10)
      return minutos;
    else return ("0" + minutos.toString());
  }
  clickGuardarHorarios() {
    let LunesInicioManiana = new Date(this.formHorario.value.lunesInicioManiana);
    let LunesFinManiana = new Date(this.formHorario.value.lunesFinManiana);
    let LunesInicioTarde = new Date(this.formHorario.value.lunesInicioTarde);
    let LunesFinTarde = new Date(this.formHorario.value.lunesFinTarde);
    let MartesInicioManiana = new Date(this.formHorario.value.martesInicioManiana);
    let MartesFinManiana = new Date(this.formHorario.value.martesFinManiana);
    let MartesInicioTarde = new Date(this.formHorario.value.martesInicioTarde);
    let MartesFinTarde = new Date(this.formHorario.value.martesFinTarde);
    let MiercolesInicioManiana = new Date(this.formHorario.value.miercolesInicioManiana);
    let MiercolesFinManiana = new Date(this.formHorario.value.miercolesFinManiana);
    let MiercolesInicioTarde = new Date(this.formHorario.value.miercolesInicioTarde);
    let MiercolesFinTarde = new Date(this.formHorario.value.miercolesFinTarde);
    let JuevesInicioManiana = new Date(this.formHorario.value.juevesInicioManiana);
    let JuevesFinManiana = new Date(this.formHorario.value.juevesFinManiana);
    let JuevesInicioTarde = new Date(this.formHorario.value.juevesInicioTarde);
    let JuevesFinTarde = new Date(this.formHorario.value.juevesFinTarde);
    let ViernesInicioManiana = new Date(this.formHorario.value.viernesInicioManiana);
    let ViernesFinManiana = new Date(this.formHorario.value.viernesFinManiana);
    let ViernesInicioTarde = new Date(this.formHorario.value.viernesInicioTarde);
    let ViernesFinTarde = new Date(this.formHorario.value.viernesFinTarde);
    let SabadoInicioManiana = new Date(this.formHorario.value.sabadoInicioManiana);
    let SabadoFinManiana = new Date(this.formHorario.value.sabadoFinManiana);
    let SabadoInicioTarde = new Date(this.formHorario.value.sabadoInicioTarde);
    let SabadoFinTarde = new Date(this.formHorario.value.sabadoFinTarde);
    let DomingoInicioManiana = new Date(this.formHorario.value.domingoInicioManiana);
    let DomingoFinManiana = new Date(this.formHorario.value.domingoFinManiana);
    let DomingoInicioTarde = new Date(this.formHorario.value.domingoInicioTarde);
    let DomingoFinTarde = new Date(this.formHorario.value.domingoFinTarde);
    let data = {
      horarios: [
        {
          dia: "lunes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(LunesInicioManiana.getHours())}:${this.funcionReturnMinutos(LunesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(LunesFinManiana.getHours())}:${this.funcionReturnMinutos(LunesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(LunesInicioTarde.getHours())}:${this.funcionReturnMinutos(LunesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(LunesFinTarde.getHours())}:${this.funcionReturnMinutos(LunesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "martes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(MartesInicioManiana.getHours())}:${this.funcionReturnMinutos(MartesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MartesFinManiana.getHours())}:${this.funcionReturnMinutos(MartesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(MartesInicioTarde.getHours())}:${this.funcionReturnMinutos(MartesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MartesFinTarde.getHours())}:${this.funcionReturnMinutos(MartesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "miercoles",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(MiercolesInicioManiana.getHours())}:${this.funcionReturnMinutos(MiercolesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MiercolesFinManiana.getHours())}:${this.funcionReturnMinutos(MiercolesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(MiercolesInicioTarde.getHours())}:${this.funcionReturnMinutos(MiercolesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(MiercolesFinTarde.getHours())}:${this.funcionReturnMinutos(MiercolesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "jueves",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(JuevesInicioManiana.getHours())}:${this.funcionReturnMinutos(JuevesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(JuevesFinManiana.getHours())}:${this.funcionReturnMinutos(JuevesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(JuevesInicioTarde.getHours())}:${this.funcionReturnMinutos(JuevesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(JuevesFinTarde.getHours())}:${this.funcionReturnMinutos(JuevesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "viernes",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(ViernesInicioManiana.getHours())}:${this.funcionReturnMinutos(ViernesInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(ViernesFinManiana.getHours())}:${this.funcionReturnMinutos(ViernesFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(ViernesInicioTarde.getHours())}:${this.funcionReturnMinutos(ViernesInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(ViernesFinTarde.getHours())}:${this.funcionReturnMinutos(ViernesFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "sabado",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(SabadoInicioManiana.getHours())}:${this.funcionReturnMinutos(SabadoInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(SabadoFinManiana.getHours())}:${this.funcionReturnMinutos(SabadoFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(SabadoInicioTarde.getHours())}:${this.funcionReturnMinutos(SabadoInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(SabadoFinTarde.getHours())}:${this.funcionReturnMinutos(SabadoFinTarde.getMinutes())}:00`,
            }
          ]
        },
        {
          dia: "domingo",
          horas: [
            {
              horaInicio: `${this.funcionReturnMinutos(DomingoInicioManiana.getHours())}:${this.funcionReturnMinutos(DomingoInicioManiana.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(DomingoFinManiana.getHours())}:${this.funcionReturnMinutos(DomingoFinManiana.getMinutes())}:00`,
            },
            {
              horaInicio: `${this.funcionReturnMinutos(DomingoInicioTarde.getHours())}:${this.funcionReturnMinutos(DomingoInicioTarde.getMinutes())}:00`,
              horaFin: `${this.funcionReturnMinutos(DomingoFinTarde.getHours())}:${this.funcionReturnMinutos(DomingoFinTarde.getMinutes())}:00`,
            }
          ]
        }
      ]
    }

    this.ipressservice.updateHorariosIpress(this.idIpress, data).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: '',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getIpressId();
        this.isUpdateHorario = false;
        this.clickDisableHorarios();
      }
    )
  }

  clickCancelarEdicion() {
    this.getIpressId();
    this.isUpdateHorario = false;
    this.clickDisableHorarios();
  }

  ngOnInit(): void {
  }

}
