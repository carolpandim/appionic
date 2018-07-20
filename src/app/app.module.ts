import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContatoPage } from '../pages/contato/contato'
import { ProdutoPage } from '../pages/produto/produto'
import { ModalContatoPage } from '../pages/modalcontato/modalcontato'
import { ModalCreateContatoPage } from '../pages/modalcreatecontato/modalcreatecontato'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoServiceProvider } from '../providers/produto-service/produto-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContatoPage,
    ProdutoPage,
    ModalContatoPage,
    ModalCreateContatoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContatoPage,
    ProdutoPage,
    ModalContatoPage,
    ModalCreateContatoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    ProdutoServiceProvider
  ]
})
export class AppModule {}
