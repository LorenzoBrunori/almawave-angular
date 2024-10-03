import { LoginComponent, RegisterComponent, RubricaComponent, RubricaDetailComponent, RubricaFormComponent } from "@features/index";
import { AlertComponent, BreadcrumbComponent, HeaderComponent, IconComponent, SpinnerComponent } from "@shared/index";

const SHARED_COMPONENTS = [
    SpinnerComponent,
    BreadcrumbComponent,
    HeaderComponent,
    IconComponent,
    AlertComponent
]

const FEATURES_COMPONENTS = [
    LoginComponent,
    RegisterComponent,
    RubricaComponent,
    RubricaDetailComponent,
    RubricaFormComponent
]

export const COMPONENTS = [
    ...SHARED_COMPONENTS,
    ...FEATURES_COMPONENTS
]

