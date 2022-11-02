import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HIS } from '../../models/his.interface';
import { HisCrudServiceService } from '../../services/his/his-crud-service.service';

@Component({
  selector: 'app-his-crud',
  templateUrl: './his-crud.component.html',
  styleUrls: ['./his-crud.component.css']
})
export class HisCrudComponent implements OnInit {

  hisTable: any[];
  first: number = 0;
  rows: number = 20;
  totalRecords: number;
  hisDialog: boolean;
  hisForm: FormGroup;
  searchForm: FormGroup;
  hisData: HIS;
  toEdit: boolean = false;
  idHIS: string;
  arrayTipoItem: string[] = ['CP', 'CX', 'PL', 'EX'];
  arrayDescTipoItem: string[] = ['PROCEDIMIENTO (CPT)', 'DIAGNÓSTICO (CIEX)', 'PRUEBA DE LABORATORIO', 'PROCEDIMIENTO DE IMAGENES']

  constructor(
    private hisCrudService: HisCrudServiceService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.hisForm = new FormGroup({
      codigoItem: new FormControl({ value: '', disabled: false }, Validators.required),
      descripcionItem: new FormControl({ value: '', disabled: false }, Validators.required),
      tipoItem: new FormControl({ value: '', disabled: false }),
      descripcionTipoItem: new FormControl({ value: '', disabled: false }),
    })
    this.searchForm = new FormGroup({
      buscar: new FormControl({ value: '', disabled: false })
    })
  }

  pagination(event): void {
    let page: number = event.first / 20 + 1;
    this.hisCrudService.getPaginateHIS(page).then((res: any) => {
      this.hisTable = res.object;
      this.totalRecords = res.totalPages * 20;
    })
  }


  openHisDialog(): void {
    this.initializeForm();
    this.hisDialog = true;
    this.toEdit = false;
  }

  recoverDataHIS(): void {
    this.hisData = {
      codigoItem: this.hisForm.value.codigoItem,
      descripcionItem: this.hisForm.value.descripcionItem,
      tipoItem: this.hisForm.value.tipoItem,
      descripcionTipoItem: this.hisForm.value.descripcionTipoItem
    }
  }

  openUpdateHIS(rowData): void {
    console.log('data de row ', rowData);
    this.toEdit = true;
    this.hisDialog = true;
    this.idHIS = rowData.id;
    this.hisForm.patchValue({
      codigoItem: rowData.codigoItem,
      descripcionItem: rowData.descripcionItem,
      tipoItem: rowData.tipoItem,
      descripcionTipoItem: rowData.descripcionTipoItem
    });
  }

  async save(): Promise<void> {
    this.recoverDataHIS();
    if (!this.toEdit) {
      this.hisCrudService.postCreateNewHis(this.hisData).then((res: any) => {
        if (res.cod == "2125") {
          Swal.fire({
            icon: 'success',
            title: 'Se creo el HIS correctamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.hisDialog = false;
          this.loadData(1);
          return;
        }
        if (res.cod == "2005") {
          Swal.fire({
            icon: 'warning',
            title: 'Ya se agrego ese HIS',
            showConfirmButton: false,
            timer: 2000
          })
          this.initializeForm();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo registrar HIS',
            showConfirmButton: false,
            timer: 2000
          });
          this.hisDialog = false;
        }
      });
    } else {
      await this.hisCrudService.putUpdateHis(this.idHIS, this.hisData).then((res: any) => {
        if (res.cod == "2126") {
          Swal.fire({
            icon: 'success',
            title: 'Se actualizo el HIS correctamente',
            showConfirmButton: false,
            timer: 2000
          });
          this.loadData(1);
          this.hisDialog = false;
          return;
        }
        if (res.cod == "2005") {
          Swal.fire({
            icon: 'warning',
            title: 'Ya existe un registro con ese codigo HIS',
            showConfirmButton: false,
            timer: 2000
          });
          this.initializeForm();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar HIS',
            showConfirmButton: false,
            timer: 2000
          });
          this.hisDialog = false;
        }
      });
    }
  }

  deleteHIS(rowData): void {
    let id: string = rowData.id;
    this.hisCrudService.deleteHISbyid(id).then((res: any) => {
      if (res.cod == "2127") {
        Swal.fire({
          icon: 'success',
          title: 'Se elimino el HIS correctamente',
          showConfirmButton: false,
          timer: 2000
        });
        this.hisDialog = false;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo eliminar el HIS',
          showConfirmButton: false,
          timer: 2000
        });
        this.hisDialog = false;
      }
    })
  }

  async loadData(page: number): Promise<void> {
    await this.hisCrudService.getPaginateHIS(page).then((res: any) => {
      this.hisTable = res.object;
      this.totalRecords = res.totalPages * 20;
    })
  }

  closeDialog(): void {
    this.hisDialog = false;
  }

  msjSaveRight(): void {
    Swal.fire({
      icon: 'success',
      title: 'Se elimino el HIS correctamente',
      showConfirmButton: false,
      timer: 2000
    });
  }

  searchHIS(): void {
    let word: string = this.searchForm.value.buscar;
    console.log('object', word);
    this.hisCrudService.getSearchHISpag(word, 1).then((res: any) => {
      this.totalRecords = 20;
      this.hisTable = res.object;
    });
  }
}
