import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundEnemies } from '../interfaces/background-enemies';
import { CONF } from '../conf/conf.const';

@Component({
    selector: 'app-coordinateur',
    templateUrl: './coordinateur.component.html',
    styleUrls: ['./coordinateur.component.scss']
})
export class CoordinateurComponent implements OnInit, OnDestroy {

    private countOfEnemies: number;
    private intervals: any[] = [];
    private killedIndex: number[] = [];

    my: any = {};
    enemy: any = {};

    // no data - only for generate proper count of cells
    columns = Array(100 * 25); // columns * rows

    enemies: BackgroundEnemies[] = [];

    constructor() {
        this.countOfEnemies = CONF.enemy.count;
        this.my = {
            shoot: {
                stopY: CONF.main.topY,
                startY: CONF.main.bottomY,
                pos: {
                    x: 0,
                    y: 0
                }
            }
        };
        this.enemy = {
            shoot: {
                stopY: CONF.main.bottomY,
                startY: CONF.main.topY,
                pos: {
                    x: 0,
                    y: 0
                }
            }
        };
        this.initMyShoot();
        this.initEnemyShoot();
    }

    ngOnInit() {
        let offset = 0;
        let direction = 'right';
        this.generateEnemies(offset);

        // enemies movment
        const int = setInterval(() => {
            if (direction === 'right') {
                offset += CONF.frame.width;
                if (offset === CONF.frame.width * 3) {
                    direction = 'left';
                }
            }
            if (direction === 'left') {
                offset -= CONF.frame.width;
                if (offset === 0) {
                    direction = 'right';
                }
            }
            this.generateEnemies(offset);
        }, CONF.enemy.moveInterval);
        this.intervals.push(int);

        // main loop - checking situation, generate enemies shoots, etc.
        const int1 = setInterval(() => {

            // generate enemy shoots
            if (this.enemy.shoot.pos.y === CONF.main.topY || this.enemy.shoot.pos.y > CONF.main.bottomY) {
                // choose random enemy
                const randIndex = Math.floor((Math.random() * this.countOfEnemies)); // 0..countOfEnemies
                this.enemy.shoot.pos.x = this.enemies[randIndex].posx + 10;
            }

            // if enemy shoot "meet" my shoot
            if (this.enemy.shoot.pos.x === this.my.shoot.pos.x &&
                this.enemy.shoot.pos.y + CONF.shoot.height >= this.my.shoot.pos.y) {
                // remove the shoots
                this.initMyShoot();
                this.initEnemyShoot();
            }

            if (this.my.shoot.pos.y === CONF.main.topY) {
                console.log(this.my.shoot.pos.y)
                // on target !
                const foundedEnemyIndex = this.enemies.findIndex(enemy => {
                    console.log(enemy, enemy.posx, this.my.shoot.pos.x, enemy.posx - this.my.shoot.pos.x, CONF.enemy.width)
                    return enemy.posx - this.my.shoot.pos.x >= 0 && enemy.posx - this.my.shoot.pos.x <= CONF.enemy.width;
                });
                if (foundedEnemyIndex > -1) {
                    this.enemies[foundedEnemyIndex].visible = false;
                    this.killedIndex.push(foundedEnemyIndex);
                    console.log('enemy killed!');
                }

                // if my shoot was "blind"
                this.initMyShoot();
            }
        }, CONF.main.checkingInterval);
        this.intervals.push(int1);
    }

    private generateEnemies(offset: number) {
        this.enemies = [];
        const startX = 30 + offset;
        for (let i = 0; i < this.countOfEnemies; i++) {
            this.enemies.push({
                posx: startX + (i * 50),
                posy: 10,
                visible: this.killedIndex.includes(i) === false
            });
        }
    }

    private initMyShoot() {
        this.my.shoot.pos.x = 0;
        this.my.shoot.pos.y = CONF.main.bottomY;
    }
    private initEnemyShoot() {
        this.enemy.shoot.pos.x = 0;
        this.enemy.shoot.pos.y = CONF.main.topY;
    }

    makeShoot() {
        this.my.shoot.pos.x = 150;
    }

    left() {
        this.my.shoot.pos.x -= CONF.frame.width;
    }

    right() {
        this.my.shoot.pos.x += CONF.frame.width;
    }

    ngOnDestroy() {
        this.intervals.forEach(interval => {
            clearInterval(interval);
        });
    }
}
