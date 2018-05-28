import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CONF } from '../conf/conf.const';

@Component({
    selector: 'app-shoot',
    template: `<div class="shoot"
        [ngStyle]="{'left': pos.x + 'px', 'top': pos.y + 'px', 'display': display, 'width': width + 'px', 'height': height + 'px'}">
        </div>`,
    styleUrls: ['./shoot.component.scss']
})
export class ShootComponent implements OnInit, OnDestroy {

    height = 0;
    width = 0;
    display = 'none';
    private interval: any;

    @Input() startPosY = 0;
    @Input() stopPosY = 0;
    @Input() mode = 'increment';
    @Input() pos: any = { x: 0, y: 0 };
    @Output() currentPos = new EventEmitter<number[]>();

    constructor() {
        this.width = CONF.shoot.width;
        this.height = CONF.shoot.height;
    }

    ngOnInit() {
        this.interval = setInterval(() => {
            this.display = 'block';
            if (this.mode === 'increment') {
                this.pos.y += CONF.frame.height;
                if (this.pos.y > this.stopPosY) {
                    this.pos.y = this.startPosY;
                    this.display = 'none';
                }
            } else {
                this.pos.y -= CONF.frame.height;
                if (this.pos.y < this.stopPosY) {
                    this.pos.y = this.startPosY;
                    this.display = 'none';
                }
            }
            this.currentPos.emit(this.pos);
        }, CONF.shoot.moveInterval);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
