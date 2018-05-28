import { Component, OnInit, Input } from '@angular/core';
import { Enemies } from '../interfaces/enemies';

@Component({
    selector: 'app-enemy',
    template: `<div class="enemy" *ngIf="visible" [ngStyle]="{'top': posy + 'px', 'left': posx + 'px'}"></div>`,
    styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent implements OnInit, Enemies {

    @Input() posx = 0;
    @Input() posy = 0;
    @Input() visible = true;

    constructor() { }

    ngOnInit() {
    }

    setCurrentPosiotion(x, y) {
        this.posx = x;
        this.posy = y;
    }

    getCurrentPosition() {
        return [10, 10];
    }

}
