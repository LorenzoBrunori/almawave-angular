import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { COMPONENTS } from "@models/constants/components";
import { CardComponent } from "@shared/card/card.component";

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      CardComponent
    ],
    exports: [...COMPONENTS],
  })
  export class ComponentsModule {}
  