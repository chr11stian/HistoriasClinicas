import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
    someSubscription: any;

    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router) {
    }

    ngOnInit(): void {
    }
}
