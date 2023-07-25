import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentFeature = 'recipe';

  onNavigate(featureData: string){
    this.currentFeature = featureData;
  }

}
