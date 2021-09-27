import {Component, OnDestroy, OnInit} from '@angular/core';
import {Personal} from "../../core/models/personal.models";
import {PersonalService} from '../../core/services/personal-services/personal.service';


import Swal from "sweetalert2";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Router} from "@angular/router";

import {Subscription} from "rxjs";
import {TipoPersonalModalComponent} from "../../mantenimientos/component/tipo-personal-modal/tipo-personal-modal.component";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-personal-salud',
    providers: [DynamicDialogRef, DynamicDialogConfig, DialogService],
    templateUrl: './personal-salud.component.html',
    styleUrls: ['./personal-salud.component.css'],
})
export class PersonalSaludComponent implements OnInit, OnDestroy {
    personals: Personal[];
    personal: Personal;
    selectedPersonal: Personal[];
    personalDialog: boolean;
    subscription: Subscription;
    submitted: boolean;
    loading = true;

    data: any;


    constructor(
        private personalService: PersonalService,
        public dialogService: DialogService,
        private messageService: MessageService,
        public config: DynamicDialogConfig,
        private router: Router,
    ) {
        this.getpersonal();
    }

    ngOnInit() {
        this.subscription = this.personalService.refresh.subscribe(() => {
            this.personalService.getPersonal().subscribe(personals => this.personals = personals);
        })
    }

    getpersonal() {
        this.personalService.getPersonal().subscribe((resp: any) => {
            this.data = resp.object;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        console.log('Observable Cerraro')
    }

    openNew() {
        this.personal = {};
        this.submitted = false;
        this.personalDialog = true;
    }


    canceled() {
        Swal.fire({
            icon: 'warning',
            title: 'Cancelado...',
            text: '',
            showConfirmButton: false,
            timer: 1000
        })
        this.personalDialog = false;
        this.submitted = false;
    }

    agregar() {
        const ref = this.dialogService.open(TipoPersonalModalComponent, {
            header: "Ingrese Personal",
            width: "60%",
        });
        ref.onClose.subscribe(() => {
            this.messageService.add({severity: "info", summary: "Car Selected"});
        });
    }


    editPersonal(personal: Personal) {
        this.personal = {...personal};
        this.personalDialog = true;
    }


    save() {
        if (this.personal.nro_doc.trim().length == 0) {
            return;
        }
        if (this.personal.id == null) {
            this.personalService.agregarPersonal(this.personal)
                .subscribe(personal =>
                    Swal.fire({
                        icon: 'success',
                        title: 'Agregado',
                        text: 'Personal de Salud',
                        showConfirmButton: false,
                        timer: 2000
                    })
                );
        } else {
            this.personalService.actualizarPersonal(this.personal)
                .subscribe(personal => Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                        text: 'Personal de Salud',
                        showConfirmButton: false,
                        timer: 2000
                    })
                );
        }
        this.personals = [...this.personals];
        this.personalDialog = false;
        this.personal = {};
    }
}
