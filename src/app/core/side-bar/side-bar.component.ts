import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MenuItem} from 'primeng/api'
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Router} from '@angular/router';
import {FilterService} from 'primeng/api';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css'],
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden',
                opacity: 0,
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        ])
    ]
})
export class SideBarComponent implements OnInit {
    items: MenuItem[]
    filteredRoutes: any[];
    selectedRoute: any;
    @Input() active: boolean;

    activeSubmenus: { [key: string]: boolean } = {};

    constructor(private filterService: FilterService, private router: Router) {
    }

    ngOnInit(): void {
        this.items = [
            {
                label: 'ROL',
                icon: 'pi pi-home',
                routerLink: 'rol',
                items: [
                ]
            },
            {
                label: 'Historia Clinica',
                icon: 'pi pi-file',

                items: [{
                    label: 'Personal de Salud',routerLink: 'historia/personal-salud'
                }]
            },
        ]
    }

    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.items) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    url: optgroup.url,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        this.selectedRoute = null;
        this.router.navigate([event.url]);
    }
}
