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
  editarDatos() {

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
