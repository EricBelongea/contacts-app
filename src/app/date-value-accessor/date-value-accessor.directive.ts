import { Directive, ElementRef, HostListener, Provider, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const DATE_VALUE_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateValueAccessorDirective),
    multi: true,
}

@Directive ({
    selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
    providers: [DATE_VALUE_PROVIDER]
})

export class DateValueAccessorDirective implements ControlValueAccessor {

    constructor(private element: ElementRef) {}
    registerOnTouched(fn: any): void {
        throw new Error("Method not implemented.");
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }

    @HostListener('input', ['$event.target.valueAsDate'])
    private onChange!: Function;

    @HostListener('blur')
    private OnTouched!: Function;

    registerOnChange(fn: Function) {
        this.onChange = (valueAsDate: Date) => { fn(valueAsDate); };
    }

    registerOnTouch(fn: Function) {
        this.OnTouched = fn;
    }

    writeValue(newValue: any) {
        if (newValue instanceof Date) {
            this.element.nativeElement.value = newValue.toISOString().split('T')[0];
        }
    }
}