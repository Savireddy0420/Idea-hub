// import { ApplicationConfig } from '@angular/core';

// export const appConfig: ApplicationConfig = {
//   providers: []
// };

import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(FormsModule)
  ]
};