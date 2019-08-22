import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {

    constructor(private snack: MatSnackBar) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error;
            switch (errorResponse.status) {
                case 400:
                    this.snack.open(message || 'Bad Request.', '', {duration: 4000} );
                    break;
                case 403:
                    this.snack.open(message || 'Não autorizado.', '', {duration: 4000} );
                    break;
                case 404:
                    this.snack.open(message || 'Recurso não encontrado.', '', {duration: 4000} );
                    break;
            }
        }
    }
}
