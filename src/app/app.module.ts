import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
// provider used to create fake backend
import { AlertService } from './services/alert.service';
import { LayoutModule } from '@angular/cdk/layout';
import { EnemyComponent } from './enemy/enemy.component';
import { ShootComponent } from './shoot/shoot.component';
import { CoordinateurComponent } from './coordinateur/coordinateur.component';
import { MyShipComponent } from './my-ship/my-ship.component';


@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        CoordinateurComponent,
        EnemyComponent,
        ShootComponent,
        MyShipComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        HttpClientModule,
        AppRoutingModule,
        LayoutModule
    ],
    providers: [
        AlertService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
