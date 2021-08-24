import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotepageComponent } from './notepage/notepage.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./loginsignup/loginsignup.module').then(
        (m) => m.LoginsignupModule
      ),
  },
  { path: 'notes/:name', component: NotepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
