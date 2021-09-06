import {Component, OnInit} from '@angular/core';
import {Personal} from "../../core/models/personal.models";
import {PersonalService} from '../../core/services/persona0-services/personal.service';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    selector: 'app-personal-salud',
    templateUrl: './personal-salud.component.html',
    styleUrls: ['./personal-salud.component.css']
})
export class PersonalSaludComponent implements OnInit {
    personals: Personal[];
    personal: Personal;
    selectedPersonal: Personal[];
    personalDialog: boolean;

    submitted: boolean;


    constructor(private personalService: PersonalService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {

    }

    ngOnInit() {
        this.personalService.getPersonal()
            .subscribe(personals => this.personals = personals);
    }


    openNew() {
        this.personal = {
            apellidos: "",
            dni: "",
            id: 0,
            nombres: "",
            profesion: "",
            sexo: "",
            tipo_contrato: ""
        }
        this.submitted = false;
        this.personalDialog = true;
    }

    hideDialog() {
        this.personalDialog = false;
        this.submitted = false;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.personals.length; i++) {
            if (this.personals[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    savePersonal() {
        this.submitted = true;

        if (this.personal.dni.trim()) {
            if (this.personal.id) {
                this.personals[this.findIndexById(this.personal.id)] = this.personal;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.personal.id = this.createId();
                // this.personal.image = 'product-placeholder.svg';
                this.personals.push(this.personal);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }

            this.personals = [...this.personals];
            this.personalDialog = false;
            this.personal = {
                apellidos: "",
                dni: "",
                id: 0,
                nombres: "",
                profesion: "",
                sexo: "",
                tipo_contrato: ""
            };
        }
    }

    deleteSelectedPersonal() {
        this.confirmationService.confirm({
            message: '¿Estás segura que quieres eliminar?',
            header: 'Confirma',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.personals = this.personals.filter(val => !this.selectedPersonal.includes(val));
                this.selectedPersonal = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Personal de Salud Eliminado',
                    life: 3000
                });
            }
        });
    }

    editPersonal(personal: Personal) {
        this.personal = {...personal};
        this.personalDialog = true;
    }

    deletePersonal(personal: Personal) {
        this.confirmationService.confirm({
            message: '¿Estás segura que quieres eliminar? ' + personal.id + '?',
            header: 'Confirma',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.personals = this.personals.filter(val => val.id !== personal.id);
                // this.personal = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Personal de Salud Eliminado\'',
                    life: 3000
                });
            }
        });
    }

    createId(): number {
        let id = null;
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
