import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {

    private config: MatSnackBarConfig = {
        duration: 2500,
        verticalPosition: 'top'
    };

    constructor(
        private snackBar: MatSnackBar
    ) { }

    error(message: string) {
        this.snackBar.open(`[Error]: ${message}`, 'Close', this.config);
    }

    success(message: string) {
        this.snackBar.open(`[Success]: ${message}`, 'close', this.config);
    }

}
