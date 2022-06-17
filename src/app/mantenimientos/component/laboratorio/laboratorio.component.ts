import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      console.log('se guardo correctamente ', res);
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
