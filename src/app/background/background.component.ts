import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundEnemies } from '../interfaces/background-enemies';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit, OnDestroy {

    shootStartPosY = 40;
    shootStopPosY = 250;
    currentShootPos: number[] = [0, this.shootStartPosY];
    shoot: any = {};

    // no data - only for generate proper count of cells
    columns = Array(100 * 50); // columns * rows

    enemies: BackgroundEnemies[] = [];

    private countOfEnemies = 10;
    private intervals: any[] = [];

    constructor() { }

    ngOnInit() {
        let offset = 0;
        let direction = 'right';
        this.generateEnemies(offset);

        // enemies movment
        const int = setInterval(() => {
            if (direction === 'right') {
                offset += 10;
                if (offset === 30) {
                    direction = 'left';
                }
            }
            if (direction === 'left') {
                offset -= 10;
                if (offset === 0) {
                    direction = 'right';
                }
            }
            this.generateEnemies(offset);
        }, 700);
        this.intervals.push(int);

        // generate shoots
        const int1 = setInterval(() => {
            if (this.currentShootPos[1] === this.shootStartPosY || this.currentShootPos[1] > this.shootStopPosY) {
                // choose random enemy
                const randIndex = Math.floor((Math.random() * this.countOfEnemies)); // 0..countOfEnemies
                this.shoot = {
                    posx: this.enemies[randIndex].posx + 10
                };
                console.log(this.shoot.posx);
            }
        }, 500);
        this.intervals.push(int1);
    }

    private generateEnemies(offset: number) {
        this.enemies = [];
        const startX = 30 + offset;
        for (let i = 0; i < this.countOfEnemies; i++) {
            this.enemies.push({
                posx: startX + (i * 40),
                posy: 10
            });
        }
    }

    ngOnDestroy() {
        this.intervals.forEach(interval => {
            clearInterval(interval);
        });
    }
}
