import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberOnlyDirective } from './Directives/NumberOnlyDirective';
import { GameService } from './Services/game-service';
import { PlayGameComponent } from './play-game.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberOnlyDirective,
    PlayGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
