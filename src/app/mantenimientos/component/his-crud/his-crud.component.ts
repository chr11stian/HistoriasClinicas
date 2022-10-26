import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HIS } from '../../models/his.interface';
import { HisCrudServiceService } from '../../services/his/his-crud-service.service';
import { UbicacionService } from '../../services/ubicacion/ubicacion.service';

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
  hisData: HIS;

  constructor(
    private ubicacionService: UbicacionService,
    private hisCrudService: HisCrudServiceService,
  ) { }

  ngOnInit(): void {

  }

  initializeForm(): void {
    this.hisForm = new FormGroup({
      codigoItem: new FormControl({ value: '', disabled: false }, Validators.required),
      descripcionItem: new FormControl({ value: '', disabled: false }, Validators.required),
      tipoItem: new FormControl({ value: '', disabled: false }),
      descripcionTipoItem: new FormControl({ value: '', disabled: false }),
    })
  }

  pagination(event): void {
    let page: number = event.first / 20 + 1;
    this.ubicacionService.getUbicationPag(page).subscribe((res: any) => {
      this.hisTable = res.object;
      this.totalRecords = res.totalPages * 20;
    })
  }


  openHisDialog(): void {
    this.initializeForm();
    this.hisDialog = true;
  }

  recoverDataHIS(): void {
    this.hisData = {
      codigoItem: this.hisForm.value.codigoItem,
      descripcionItem: this.hisForm.value.descripcionItem,
      tipoItem: this.hisForm.value.tipoItem,
      descripcionTipoItem: this.hisForm.value.descripcionTipoItem
    }
  }

  save(): void {
    this.recoverDataHIS();
    this.hisCrudService.postCreateNewHis(this.hisData).then((res: any) => {
      if (res.code = "2125") {
        console.log('guardo con exito');
      }
      if (res.code = "2005") {
        console.log('ya se agrego ese his ');
      } else {
        console.log('courrio un error al intentar guardar');
      }
    })
  }

  closeDialog(): void {
    this.hisDialog = false;
  }
}
