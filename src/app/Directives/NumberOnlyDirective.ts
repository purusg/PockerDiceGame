import { Directive, HostListener } from '@angular/core'

@Directive({ selector: '[NumbersOnly]' })

export class NumberOnlyDirective {

    regexStr = '^[2-5]*$';

    @HostListener('keydown', ['$event'])
    onkeydown(event: KeyboardEvent) {
        event.stopPropagation();
        let regEx = new RegExp(this.regexStr);
        if (event.keyCode == 8 || event.keyCode == 46
            || event.keyCode == 37 || event.keyCode == 39) {
               return true;
           }
        if (regEx.test(event.key))
            return;
        else {
            event.preventDefault();
        }
    }
}
