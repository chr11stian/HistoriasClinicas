import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {ListaConsultaService} from "../../../cred/citas/services/lista-consulta.service";
import {dato} from "../../../cred/citas/models/data";
import {
  FiliancionService
} from "../../../obstetricia-general/gestante/atencion/h-clinica-materno-perinatal/services/filiancion-atenciones/filiancion.service";
import Swal from 'sweetalert2';
import { Documento } from '../../interfaces/consulta-generica.interface';

@Component({
  selector: 'app-lista-consulta',
  templateUrl: './lista-consulta.component.html',
  styleUrls: ['./lista-consulta.component.css']
})
export class ListaConsultaComponent implements OnInit {

  consultaList: any[];
  dataFromLocal: any
  attributeLocalS = 'documento'
  dataPaciente:any
  constructor(private form: FormBuilder,
              private filiancionService: FiliancionService,
              private listaConsultaService: ListaConsultaService,
              private router: Router) {
    this.dataFromLocal = <dato>JSON.parse(localStorage.getItem(this.attributeLocalS))            
  }
  get apellidosNombres(){
    // //console.log({data:this.dataPaciente});
    return this.dataPaciente?this.dataPaciente.apePaterno + ' ' + this.dataPaciente.apeMaterno + ' ' + this.dataPaciente.primerNombre + ' ' + this.dataPaciente.otrosNombres:'';
  }
  ngOnInit(): void {
    this.getPaciente();
    this.getConsultaList(this.dataFromLocal.tipoDoc, this.dataFromLocal.nroDocumento,this.dataFromLocal.tipoConsulta);
  }
  getPaciente() {
    this.filiancionService.getPacienteNroDocFiliacion(this.dataFromLocal.tipoDoc, this.dataFromLocal.nroDocumento).subscribe((res: any) => {
        this.dataPaciente = res.object
    });
  }
  getConsultaList(tipoDoc,nroDoc,servicio) {
    this.listaConsultaService.getListaConsultaXtipo(tipoDoc,nroDoc,servicio).subscribe((r: any) => {
      this.consultaList = r.object;
    })
  }

  oldConsulta(rowData) {
      const data: Documento = {
        idCupo: this.dataFromLocal.idCupo,
        idConsulta: rowData.id,
        tipoDoc: this.dataFromLocal.tipoDoc,
        nroDocumento: this.dataFromLocal.nroDocumento,
        anio:this.dataFromLocal.anio,
        mes: this.dataFromLocal.mes,
        dia: this.dataFromLocal.dia,
        sexo: this.dataPaciente.sexo,
        ups:this.dataFromLocal.ups,
        tipoConsulta:this.dataFromLocal.tipoConsulta,
        // fechaConsulta:this.dataFromLocal.fechaConsulta,
        fechaNacimiento: this.dataPaciente.nacimiento.fechaNacimiento,
        estadoAtencion:rowData.estadoAtencion
      }
      localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
      this.router.navigate(['/dashboard/consulta-generica/consulta'])
  }

  newConsulta() {
    const data: Documento = {
      idCupo: this.dataFromLocal.idCupo,
      idConsulta: '',
      tipoDoc: this.dataFromLocal.tipoDoc,
      nroDocumento: this.dataFromLocal.nroDocumento,
      anio:this.dataFromLocal.anio,
      mes: this.dataFromLocal.mes,
      dia: this.dataFromLocal.dia,
      sexo: this.dataPaciente.sexo,
      ups:this.dataFromLocal.ups,
      tipoConsulta:this.dataFromLocal.tipoConsulta,
      fechaNacimiento: this.dataPaciente.nacimiento.fechaNacimiento,
      estadoAtencion:"1"
      // fechaConsulta:this.dataFromLocal.fechaConsulta,
    }
    localStorage.setItem(this.attributeLocalS, JSON.stringify(data));
    this.router.navigate(['/dashboard/consulta-generica/consulta'])
  }
  irFUA(rowData) {
    //console.log('data', rowData);
    let message1 = "Esta Seguro de Generar FUA?, se dara como finalizado la consulta"
    let message2 = "Esta Seguro de Generar FUA?, Debe revisar el tipo de Seguro"
    if (rowData.estadoAtencion == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Consulta en Interconsulta, no es posible hacer FUA',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (rowData.estadoAtencion == 2) {
      this.router.navigate(['dashboard/fua/listar-fua'], rowData)
    }
    if (rowData.estadoAtencion == 1 || rowData.estadoAtencion == 0) {
      Swal.fire({
        title: rowData.tipoConsulta != 'CRED' ? message1 : message2,
        showDenyButton: true,
        confirmButtonText: 'Crear FUA',
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['dashboard/fua/listar-fua'], rowData)
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'warning',
            title: 'No se creo FUA',
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
    }
  }
  irHIS(rowData) {
    let message1 = "Esta Seguro de Generar HIS?, se dara como finalizado la consulta"
    if (rowData.estadoAtencion == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Consulta en Interconsulta, no es posible hacer HIS',
        showConfirmButton: false,
        timer: 2000
      });
    }
    if (rowData.estadoAtencion == 2) {
      this.router.navigate(['dashboard/his/listar-his'], {
        queryParams: {
          'idConsulta':rowData.id,
          'tipoConsulta':rowData.tipoConsulta
        }
      })
    }
    if (rowData.estadoAtencion == 1) {
      Swal.fire({
        title: message1,
        showDenyButton: true,
        confirmButtonText: 'Crear HIS',
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['dashboard/his/listar-his'], {
            queryParams: {
              'idConsulta':rowData.id,
              'tipoConsulta':rowData.tipoConsulta
            }
          })
        } else if (result.isDenied) {
          Swal.fire({
            icon: 'warning',
            title: 'No se creo HIS',
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
    }
  }

}
