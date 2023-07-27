import { Directive, HostListener, HostBinding,} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective { 
    @HostBinding('class.show') isOpen = false;

    @HostListener('click') mouseover(eventData: Event){
        console.log('Clicked!!!');
        this.isOpen = !this.isOpen;
    }
}