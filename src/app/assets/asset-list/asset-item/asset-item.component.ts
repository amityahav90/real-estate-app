import {Component, Input} from '@angular/core';
import { Asset } from '../../asset.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.css']
})
export class AssetItemComponent {
  @Input() asset: Asset;

  constructor(private router: Router) {}

  onDetailsClicked() {
    this.router.navigate(['assets/detail', this.asset._id]);
  }
}
