import { Directive, HostListener, Input } from "@angular/core";

@Directive({selector: '[tooltip]'})
export class TooltipDirective {

  @Input()
  public tooltipText!: string;

  constructor() {
  }

  @HostListener('mouseenter')
  public show(): void {
    console.log('enter', this.tooltipText);
  }

  @HostListener('mouseout')
  public hide(): void {
    console.log('hide', this.tooltipText);
  }

}
