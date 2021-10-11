import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';

import { HeaderComponent } from './components/header/header.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { DataGridComponent } from './components';
import { KeyedTemplateDirective } from './directives';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';


const declarations = [
  HeaderComponent,
  EnumToArrayPipe,
  DataGridComponent,
  KeyedTemplateDirective,
];

const modules = [
  TableModule,
  TableModule,
  DialogModule,
  ButtonModule,
  ToastModule,
  InputTextModule,
  HttpClientModule,
  ToolbarModule,
  FormsModule,
  ConfirmDialogModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...modules, TranslateModule],
  imports: [
    CommonModule,
    ...modules,
    TranslateModule.forChild({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      },
    }),
  ],
  providers: [EnumToArrayPipe, HttpClient, MessageService, ConfirmationService],
})
export class SharedModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
