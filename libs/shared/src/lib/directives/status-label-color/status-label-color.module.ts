import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusLabelColorDirective } from './status-label-color.directive';

@NgModule({
  declarations: [StatusLabelColorDirective],
  imports: [
    CommonModule
  ],
  exports: [StatusLabelColorDirective]
})
export class StatusLabelColorModule { }
