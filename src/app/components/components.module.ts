import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { COMPONENTS } from "@models/constants/components";
import { CardComponent } from "@shared/card/card.component";

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
      CommonModule,
      FormsModule,
      CardComponent
    ],
    exports: [...COMPONENTS],
  })
  export class ComponentsModule {}
  