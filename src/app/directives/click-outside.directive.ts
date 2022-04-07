import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private readonly elementRef: ElementRef) {
  }

  /**
   * Handle click outside
   * @param event
   */
  @HostListener('document:click', ['$event'])
  onCLickOutside(event: Event): void {
    !this.elementRef.nativeElement.contains(event.target) && this.clickOutside.emit();
  }

}
