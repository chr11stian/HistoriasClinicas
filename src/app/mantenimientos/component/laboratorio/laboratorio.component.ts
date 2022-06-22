import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LaboratorioService } from '../../services/laboratorio/laboratorio.service';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {

  data: any;
  addExam: boolean = false;
  isUpdate: boolean = false;
  formLaboratorio: FormGroup;
  stateOptions = ['ACTIVADO', 'DESACTIVADO'];
  dataLabo: DataLabo;
  laboExamList: any;
  listaSubTipos: string[] = ['HEMATOLOGIA', 'BIOQUIMICA', 'MICROBIOLOGIA', 'INMUNOLOGIA', 'UROANALISIS', 'PARASITOLOGIA', 'OTROS EXAMENES'];
  idLabo: string;

  constructor(
    private laboratorioService: LaboratorioService
  ) {
    this.buildForm();
    this.listarExamName();
    // this.formLaboratorio.patchValue({ estado: 'DESACTIVADO' })
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.formLaboratorio = new FormGroup({
      subTipo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    })
  }

  recuperarData() {
    this.dataLabo = {
      tipoLaboratorio: 'EXAMEN_LABORATORIO',
      subTipo: this.formLaboratorio.value.subTipo,
      nombreExamen: this.formLaboratorio.value.nombre,
      estado: this.formLaboratorio.value.estado,
      // codigoHIS: null,
      // codigoSIS: null
    }
  }
  listarExamName() {
    this.laboratorioService.getLaboratorioList().then((res => {
      console.log('listar labs exam ', res.object);
      this.laboExamList = res.object;
    }))
  }

  addExamDialog() {
    this.addExam = true;
    this.formLaboratorio.reset();
    this.isUpdate = false;
  }
  canceled() {
    this.addExam = false;
  }
  saveForm() {
    this.recuperarData();
    console.log('data to save ', this.dataLabo);
    this.laboratorioService.postSaveLaboratorio(this.dataLabo).then((res => {
      if (res.cod == "2010") {
        Swal.fire({
          title: 'Ya se agrego ese examen.',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        })
        this.canceled();
        return
      }
      Swal.fire({
        title: 'Se agrego el examen correctamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      this.listarExamName();
      this.canceled();
    }))
  }
  editarDatos(rowData) {
    this.isUpdate = true;
    console.log('data to edit ', rowData);
    this.addExam = true;
    this.formLaboratorio.patchValue({ subTipo: rowData.subTipo });
    this.formLaboratorio.patchValue({ nombre: rowData.nombreExamen });
    this.formLaboratorio.patchValue({ estado: rowData.estado });
    this.idLabo = rowData.id;
  }
  saveEditExams() {
    this.dataLabo = {
      tipoLaboratorio: 'EXAMEN_LABORATORIO',
      subTipo: this.formLaboratorio.value.subTipo,
      nombreExamen: this.formLaboratorio.value.nombre,
      estado: this.formLaboratorio.value.estado,
    }
    console.log('data to edit ', this.dataLabo, ' id ', this.idLabo);
    this.laboratorioService.putLaboratorio(this.idLabo, this.dataLabo).then(res => {
      console.log('se edito correctamente');
      this.listarExamName();
      this.canceled();
      Swal.fire({
        title: 'Se edito correctamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  eliminar(rowData) {
    // console.log('data to delete ', rowData);
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.laboratorioService.deleteLaboratorio(rowData.id).then(res => {
          Swal.fire({
            title: 'Se elimino correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    })

  }
}

interface DataLabo {
  tipoLaboratorio: string,
  subTipo: string,
  nombreExamen: string,
  codigoHIS?: string,
  codigoSIS?: string,
  estado: string,
}
