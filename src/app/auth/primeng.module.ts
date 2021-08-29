import { NgModule } from '@angular/core';

import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const modules = [
  PasswordModule,
  DividerModule,
  CardModule,
  InputTextModule,
  ButtonModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class PrimengModule {}
