import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { ENTERPRISE_EVENT_RECORD_TYPE } from '@libera/models/enterprise';

const STATUS = {
  success: [
    ENTERPRISE_EVENT_RECORD_TYPE.DOCUMENT_APPROVED,
    ENTERPRISE_EVENT_RECORD_TYPE.MODULE_APPROVED,
    ENTERPRISE_EVENT_RECORD_TYPE.PROFILE_UPDATED,
    ENTERPRISE_EVENT_RECORD_TYPE.DOCUMENT_REJECTED,
    ENTERPRISE_EVENT_RECORD_TYPE.DOCUMENT_REQUESTED,
    ENTERPRISE_EVENT_RECORD_TYPE.MODULE_REJECTED,
    ENTERPRISE_EVENT_RECORD_TYPE.MODULE_REQUESTED,

  ],
  warning: [
    ENTERPRISE_EVENT_RECORD_TYPE.CREATION,
    ENTERPRISE_EVENT_RECORD_TYPE.RESEND_INVITE,
    ENTERPRISE_EVENT_RECORD_TYPE.ENTERPRISE_REJECTED,
    ENTERPRISE_EVENT_RECORD_TYPE.ENTERPRISE_APPROVED,
  ]
}

@Directive({
  selector: '[statusLabelColor]'
})
export class StatusLabelColorDirective implements OnInit {

  @Input('statusLabelColor') status: string;

  @HostBinding('class.status-label') statusLabel = true;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    const cssClass = this.getEntries(STATUS)
      .filter(this.hasStatus(this.status))
      .map(this.getClass).shift();

    this.renderer.addClass(this.elementRef.nativeElement, cssClass);

  }

  private getEntries(obj: any) {
    return Object.entries(obj);
  }

  private hasStatus(status: string) {
    return ([x, a]: [string, string[]]) => a.includes(status);
  }

  private getClass([cssClass, x]: [string, string[]]) {
    return cssClass;
  }

}
