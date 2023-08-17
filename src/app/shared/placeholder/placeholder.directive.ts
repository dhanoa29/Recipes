import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // Can be used as an attribute because of square brakcets
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
