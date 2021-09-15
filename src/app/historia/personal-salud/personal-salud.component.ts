import {Component, OnInit} from '@angular/core';
import {Personal} from "../../core/models/personal.models";
import {PersonalService} from '../../core/services/personal-services/personal.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {NotificationService} from "../../core/services/notification-services/notification.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

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
    idPersonal = '';
    patternEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'
    personalFG: FormGroup;


    /** Get form controls*/
    getFC(control: string): AbstractControl {
        return this.personalFG.get(control)
    }

    /** Get value form control */
    value(control: string): any {
        return this.getFC(control).value
    }

    constructor(
        private personalService: PersonalService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private config: DynamicDialogConfig,
    ) {
        this.buildForm()
    }

    ngOnInit() {
        this.personalService.getPersonal().subscribe(personals => this.personals = personals);
    }

    openNew() {
        this.personal = {
            apellidos: "",
            nro_doc: "",
            id: 0,
            nombres: "",
            profesion: "",
            sexo: "",
            tipo_contrato: "",
            colegio_profesional: "",
            fecha_nacimiento: "",
        }
        this.submitted = false;
        this.personalDialog = true;
    }


    buildForm() {
        let isDisabled = false
        if (this.config.data.id) {
            isDisabled = true
        }
        this.personalFG = new FormGroup({
            lastName: new FormControl({value: '', disabled: false}, Validators.required),
            email: new FormControl({
                value: '',
                disabled: false
            }, [Validators.required, Validators.pattern(this.patternEmail)]),
            nro_doc: new FormControl({value: '', disabled: isDisabled}, Validators.required),
            nombres: new FormControl({value: '', disabled: false}, Validators.required),
            apellidos: new FormControl({value: '', disabled: false}, [Validators.required]),
            fecha_nacimiento: new FormControl({value: null, disabled: isDisabled}, Validators.required),
            sexo: new FormControl({value: null, disabled: isDisabled}, Validators.required),
            tipo_contrato: new FormControl({value: null, disabled: isDisabled}, Validators.required),
            profesion: new FormControl({value: null, disabled: isDisabled}, Validators.required),
            colegio_profesional: new FormControl({value: null, disabled: isDisabled}),
        })
    }

    hideDialog() {
        this.personalDialog = false;
        this.submitted = false;
    }


    editPersonal(personal: Personal) {
        this.personal = {...personal};
        this.personalDialog = true;
    }


    createId(): number {
        let id = null;
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    save(): void {
        let userInput: Personal
        if (this.personal) {
            userInput = {
                nro_doc: this.personal.nro_doc,
                nombres: this.personal.nombres,
                apellidos: this.personal.apellidos,
                fecha_nacimiento: this.personal.fecha_nacimiento,
                sexo: this.personal.sexo,
                tipo_contrato: this.personal.tipo_contrato,
                profesion: this.personal.profesion,
                colegio_profesional: this.personal.colegio_profesional,
            }
        } else {
            userInput = {
                nro_doc: this.getFC('nro_doc').value,
                nombres: this.getFC('name').value,
                apellidos: this.getFC('surname').value,
                fecha_nacimiento: this.getFC('fecha_naciemiento').value,
                sexo: this.getFC('sexo').value,
                tipo_contrato: this.getFC('tipo_contrato').value,
                profesion: this.getFC('profesion').value,
                colegio_profesional: this.getFC('colegio_profesional').value,
            }
        }
        if (this.idPersonal) {
            this.updatePersonal(userInput)
        } else {
            this.addPersonall(userInput)
        }
    }


    addPersonall(personal): void {
        this.personalService.agregarPersonal(personal).subscribe(
            res => {
                if (res['error']) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Product Created',
                        life: 3000
                    });

                } else {
                    console.log('added')
                }
            },
            err => {
                console.log('addPersonal', err)
            }
        )
    }

    updatePersonal(personal): void {
        this.personalService.actualizarPersonal(personal).subscribe(
            res => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Actualizado',
                    life: 3000
                });
            },
            err => {
                console.log(err)
            }
        )
    }
}
