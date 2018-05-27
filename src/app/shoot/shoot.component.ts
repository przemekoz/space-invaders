import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-shoot',
    template: `<div class="shoot" [ngStyle]="{'top': posy + 'px', 'left': posx + 'px', 'display': display}"></div>`,
    styleUrls: ['./shoot.component.scss']
})
export class ShootComponent implements OnInit, OnDestroy {

    posy = 0;
    display = 'none';
    private interval: any;

    @Input() posx = 0;
    @Input() startPosY = 0;
    @Input() stopPosY = 0;
    @Output() currentPos = new EventEmitter<number[]>();

    constructor() { }

    ngOnInit() {
        this.posy = this.startPosY;
        this.interval = setInterval(() => {
            console.log(this.posx)
            this.display = 'block';
            this.posy += 10;
            this.currentPos.emit([this.posx, this.posy]);
            if (this.posy > this.stopPosY) {
                this.display = 'none';
                this.posy = this.startPosY;
            }
        }, 150);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
