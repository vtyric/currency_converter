import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private render: Renderer2) {
  }

  @HostBinding('class.show')
  private isOpen = false;

  @HostListener('click')
  private toggleOpen(): void {
    this.isOpen = !this.isOpen;

    let part = this.el.nativeElement.querySelector('.dropdown-menu');

    if (this.isOpen) {
      this.render.addClass(part , 'show');
    } else {
      this.render.removeClass(part, 'show');
    }
  }

}
