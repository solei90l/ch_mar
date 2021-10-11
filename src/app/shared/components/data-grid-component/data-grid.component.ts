// Angular Core Imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Third Part library Imports
import { Observable } from 'rxjs';

// Local Files Imports
import { BaseComponent } from '@components/base.component';
import { KeyedTemplateDirective } from '@directives/index';
import { DataGridColumn, PTableInputs } from '@interfaces/index';
import { DataGridOptions } from '@classes/index';

@Component({
  selector: 'betclic-data-grid',
  styleUrls: ['./data-grid.component.scss'],
  templateUrl: './data-grid.component.html',
})

export class DataGridComponent extends BaseComponent implements OnInit {

  /** Page Title */
  @Input() public pageTitle?: string;

  /** Local Storage Key to save State */
  @Input() public stateKeyInLocalStorage?: string;

  /** Load Page Data Type */
  // @Input() loadDataType?: LoadDataType = 'templateSide';

  /** Table Data */
  @Input() public dataSource?: any[];

  /** Column for DataGrid */
  @Input() public dataGridColumns?: DataGridColumn[];

  /** Global Filters for Columns DataGrid */
  @Input() public globalFilterFields?: string[];

  /** DataGrid Options */
  @Input() public pTableInputs?: PTableInputs;

  /** Loading Indicator */
  @Input() public loading$: Observable<boolean>;

  /** Page Grid options */
  @Input() public dataGridOptions?: DataGridOptions = new DataGridOptions();

  /**
   * Si on va ajouter un colonne des actions
   */
  // @Output() public readonly AddButtonHandled: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Output() public readonly DeleteButtonHandled: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Output() public readonly EditButtonHandled: EventEmitter<boolean> = new EventEmitter<boolean>();

  public templateDirectiveMap: Map<string, any>;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    //
  }

  public getTemplate(tplName: string) {
    return this.templateDirectiveMap && this.templateDirectiveMap.has(tplName) ?
    this.templateDirectiveMap.get(tplName).templateDirective.template : undefined;
  }

  public registerTemplate = function(key: string, templateDirective: KeyedTemplateDirective): void {
    if (!this.templateDirectiveMap) {
      this.templateDirectiveMap = new Map<string, any>();
    }

    const keyedTemplate = {
      [key]: key,
      templateDirective,
    };
    this.templateDirectiveMap.set(key, keyedTemplate);

  };

  /*
  public requestDeleteItem(event): void {
    this.DeleteButtonHandled.emit(event);
  }

  public requestEditItem(event): void {
    this.EditButtonHandled.emit(event);
  }

  public requestAddItem(): void {
    this.AddButtonHandled.emit(true);
  }
  */

}
