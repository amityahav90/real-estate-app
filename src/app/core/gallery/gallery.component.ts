import {Component, Input, OnInit} from '@angular/core';
import {Asset} from '../../assets/asset.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() first: Asset[];
  @Input() second: Asset[];
  // @Input() assets: Asset[];

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onImageClicked(assetId: string) {
    this.router.navigate(['assets/detail', assetId]);
  }
}
