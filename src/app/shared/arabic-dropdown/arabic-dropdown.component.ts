import {
  NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked,
  DoCheck, OnDestroy, Input, Output, Renderer, EventEmitter, ContentChildren, QueryList, ViewChild,
  TemplateRef, IterableDiffers, forwardRef, trigger, state, style, transition, animate, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/components/common/shared';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/ObjectUtils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ArabicLabel, DisplayType } from '../model';
export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArabicDropdownComponent),
  multi: true
};

@Component({
  selector: 'app-arabic-dropdown',
  templateUrl: './arabic-dropdown.component.html',
  styleUrls: ['./arabic-dropdown.component.css'],
  animations: [
    trigger('panelState', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out'))
    ])
  ],
  providers: [DomHandler, ObjectUtils, DROPDOWN_VALUE_ACCESSOR]
})
export class ArabicDropdownComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked,
  DoCheck, OnDestroy, ControlValueAccessor {

  @Input() options: ArabicLabel[];

  @Input() initialItem: ArabicLabel;

  @Input() scrollHeight = '400px';

  @Input() filter: boolean;

  @Input() style: any;

  @Input() panelStyle: any;

  @Input() styleClass: string;

  @Input() panelStyleClass: string;

  @Input() disabled: boolean;

  @Input() readonly: boolean;

  @Input() autoWidth = false;

  @Input() required: boolean;

  @Input() editable: boolean;

  @Input() appendTo: any;

  @Input() tabindex: number;

  @Input() placeholder: string;

  @Input() displayType: DisplayType = DisplayType.LABEL_AND_CODE;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') containerViewChild: ElementRef;

  @ViewChild('panel') panelViewChild: ElementRef;

  @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;

  @ViewChild('filter') filterViewChild: ElementRef;

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;

  public panelVisible = false;

  public documentClickListener: any;

  public optionsChanged: boolean;

  public panel: HTMLDivElement;

  public container: HTMLDivElement;

  public itemsWrapper: HTMLDivElement;

  public initialized: boolean;

  public selfClick: boolean;

  public itemClick: boolean;

  public hoveredItem: any;

  public selectedOptionUpdated: boolean;

  selectedOption: ArabicLabel;

  value: any;

  optionsToDisplay: ArabicLabel[];

  hover: boolean;

  focus: boolean;

  showCode: boolean;

  differ: any;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer, differs: IterableDiffers,
    private cd: ChangeDetectorRef, public objectUtils: ObjectUtils) {
    this.differ = differs.find([]).create(null);
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  ngOnInit() {
    this.showCode = (DisplayType.LABEL_AND_CODE === this.displayType) || (DisplayType.CODE_ONLY === this.displayType);
    this.optionsToDisplay = this.options;
    const currentItem: ArabicLabel = this.initialItem === null ? null : this.initialItem;
    this.updateSelectedOption(currentItem);
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.options);

    if (changes && this.initialized) {
      this.optionsToDisplay = this.options;
      this.updateSelectedOption(this.value);
      this.optionsChanged = true;
    }
  }

  ngAfterViewInit() {
    this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
    this.panel = <HTMLDivElement>this.panelViewChild.nativeElement;
    this.itemsWrapper = <HTMLDivElement>this.itemsWrapperViewChild.nativeElement;

    this.updateDimensions();
    this.initialized = true;

    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.panel);
      } else {
        this.domHandler.appendChild(this.panel, this.appendTo);
      }
    }
  }

  get code(): string {
    return (this.selectedOption ? this.selectedOption.code : this.placeholder);
  }

  get label(): string {
    return (this.selectedOption ? this.selectedOption.label : this.placeholder);
  }

  get editableLabel(): string {
    return this.value || (this.selectedOption ? this.selectedOption.label : null);
  }

  onItemClick(event, option) {
    this.itemClick = true;
    this.selectItem(event, option);
    this.hide();
  }

  selectItem(event, option) {
    this.selectedOption = option;
    this.value = option.value;

    this.onModelChange(option);
    this.onChange.emit({
      originalEvent: event,
      value: option
    });
  }

  ngAfterViewChecked() {
    if (this.optionsChanged) {
      if (this.appendTo) {
        this.domHandler.absolutePosition(this.panel, this.container);
      } else {
        this.domHandler.relativePosition(this.panel, this.container);
      }
      this.optionsChanged = false;
    }

    if (this.selectedOptionUpdated && this.itemsWrapper) {
      const selectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
      if (selectedItem) {
        this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ui-state-highlight'));
      }
      this.selectedOptionUpdated = false;
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOption(value);
    this.cd.markForCheck();
  }

  updateSelectedOption(val: any): void {
    this.selectedOption = this.findOption(val, this.optionsToDisplay);
    if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
      this.selectedOption = this.optionsToDisplay[0];
    }
    this.selectedOptionUpdated = true;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  updateDimensions() {
    if (this.autoWidth) {
      const select = this.domHandler.findSingle(this.el.nativeElement, 'select');
      if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
        this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
      }
    }
  }

  onMouseclick(event, input) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.selfClick = true;

    if (!this.itemClick) {
      input.focus();

      if (this.panelVisible) {
        this.hide();
      } else {
        this.show(this.panel, this.container);

        if (this.filterViewChild !== undefined) {
          setTimeout(() => {
            this.filterViewChild.nativeElement.focus();
          }, 200);
        }
      }
    }
  }

  onEditableInputClick(event) {
    this.itemClick = true;
    this.bindDocumentClickListener();
  }

  onEditableInputFocus(event) {
    this.focus = true;
    this.hide();
  }

  onEditableInputChange(event) {
    this.value = event.target.value;
    this.updateSelectedOption(this.value);
    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }

  show(panel, container) {
    if (this.options && this.options.length) {
      this.panelVisible = true;
      panel.style.zIndex = ++DomHandler.zindex;

      if (this.appendTo) {
        this.domHandler.absolutePosition(panel, container);
      } else {
        this.domHandler.relativePosition(panel, container);
      }
      this.bindDocumentClickListener();
    }
  }

  hide() {
    this.panelVisible = false;
  }

  onInputFocus(event) {
    this.focus = true;
    this.onFocus.emit(event);
  }

  onInputBlur(event) {
    this.focus = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  onKeydown(event) {
    if (this.readonly) {
      return;
    }

    const selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption, this.optionsToDisplay) : -1;

    switch (event.which) {
      // down
      case 40:
        if (!this.panelVisible && event.altKey) {
          this.show(this.panel, this.container);
        } else {
          if (selectedItemIndex !== -1) {
            const nextItemIndex = selectedItemIndex + 1;
            if (nextItemIndex !== (this.optionsToDisplay.length)) {
              this.selectedOption = this.optionsToDisplay[nextItemIndex];
              this.selectedOptionUpdated = true;
              this.selectItem(event, this.selectedOption);
            }
          } else if (this.optionsToDisplay) {
            this.selectedOption = this.optionsToDisplay[0];
          }
        }

        event.preventDefault();

        break;

      // up
      case 38:
        if (selectedItemIndex > 0) {
          const prevItemIndex = selectedItemIndex - 1;
          this.selectedOption = this.optionsToDisplay[prevItemIndex];
          this.selectedOptionUpdated = true;
          this.selectItem(event, this.selectedOption);
        }

        event.preventDefault();
        break;

      // space
      case 32:
        this.panelVisible = !this.panelVisible;

        event.preventDefault();
        break;

      // enter
      case 13:
        this.hide();

        event.preventDefault();
        break;

      // escape and tab
      case 27:
      case 9:
        this.panelVisible = false;
        break;
    }
  }

  findListItem(element) {
    if (element.nodeName === 'LI') {
      return element;
    } else {
      let parent = element.parentElement;
      while (parent.nodeName !== 'LI') {
        parent = parent.parentElement;
      }
      return parent;
    }
  }

  findOptionIndex(val: ArabicLabel, opts: ArabicLabel[]): number {
    const name = (val) ? val.name : null;
    let index: number = -1;
    if (opts) {
      for (let i = 0; i < opts.length; i++) {
        if ((val == null && opts[i].name == null) || this.objectUtils.equals(name, opts[i].name)) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  findOption(val: any, opts: ArabicLabel[]): ArabicLabel {
    const index: number = this.findOptionIndex(val, opts);
    return (index !== -1) ? opts[index] : null;
  }

  onFilter(event): void {
    if (this.options && this.options.length) {
      const val = event.target.value.toLowerCase();
      this.optionsToDisplay = [];
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        if (option.label.toLowerCase().indexOf(val) > -1) {
          this.optionsToDisplay.push(option);
        }
      }
      this.optionsChanged = true;
    }

  }

  applyFocus(): void {
    if (this.editable) {
      this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
    } else {
      this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.panelVisible = false;
          this.unbindDocumentClickListener();
        }

        this.selfClick = false;
        this.itemClick = false;
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  ngOnDestroy() {
    this.initialized = false;

    this.unbindDocumentClickListener();

    if (this.appendTo) {
      this.el.nativeElement.appendChild(this.panel);
    }
  }
}
