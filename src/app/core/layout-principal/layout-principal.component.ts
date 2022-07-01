import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-layout-principal',
    templateUrl: './layout-principal.component.html',
    styleUrls: ['./layout-principal.component.css']
})
export class LayoutPrincipalComponent implements OnInit, DoCheck, OnDestroy {
    hidden: boolean = false;
    size: boolean = true
    someSubscription: any;

    anchoSidebart: number = 50
    ocultar: string = ''

    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router) {
    }

    reload() {
        console.log('reload')
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.someSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngDoCheck() {
        this.size_width()
    }

    ngOnDestroy() {
        if (this.someSubscription) {
            this.someSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
    }

    size_width() {
        this.breakpointObserver.observe(['(min-width: 600px)']).subscribe((result: BreakpointState) => {
            this.size = result.matches
        });
    }

    /*anchoSidebart() {
        if (this.hidden) {
            this.ocultar = 'hidden'
            return 0;
        } else {
            this.ocultar = ''
            return 2;
        }

    }*/

}
