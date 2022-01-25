import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core'
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms'
import {Subscription} from 'rxjs'

@Component({
    selector: 'select-btn',
    templateUrl: './select-btn.component.html',
    styleUrls: ['./select-btn.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectBtnComponent),
            multi: true
        }
    ]
})
export class SelectBtnComponent implements OnInit, OnDestroy {
    @Input() field: string
    @Input() alignment: string='text-center'
    formC$: Subscription

    onChange = (_: any) => {
    }
    onTouch = () => {
    }
    stateOptions = [
        {label: 'Si', value: true},
        {label: 'No', value: false}
    ]
    selectFC = new FormControl({value: null, disabled: false})
    isDisabled: boolean

    constructor() {
    }

    ngOnInit(): void {
        this.formC$ = this.selectFC.valueChanges.subscribe((v) => {
            console.log('v ',v)
            this.onChange(v)
        })
    }

    registerOnChange(fn: any): void {
        this.onChange = fn
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled
    }

    writeValue(obj: any): void {
        if (obj) {
            this.selectFC.setValue(obj)
        }
    }

    ngOnDestroy(): void {
        this.formC$.unsubscribe()
    }

}
