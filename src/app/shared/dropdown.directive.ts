import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen
    }
}