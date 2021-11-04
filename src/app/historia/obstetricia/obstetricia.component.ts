import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-obstetricia',
    templateUrl: './obstetricia.component.html',
    styleUrls: ['./obstetricia.component.css']
})
export class ObstetriciaComponent implements OnInit {
    items: MenuItem[];
    subscription: Subscription;

    constructor(public messageService: MessageService) {
    }


    ngOnInit(): void {
        this.items = [{
            label: 'Personal',
            routerLink: 'personal'
        },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
