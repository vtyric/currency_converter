import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorService {

    /**
     * Генерирует текст для серверной ошибки.
     * @param {HttpErrorResponse} error
     * @returns {string}
     */
    public getServerErrorMessage(error: HttpErrorResponse): string {
        if (error.message.includes('Login')) {
            return 'Неверный логин или пароль.';
        }
        if (error.message.includes('Register')) {
            return 'Пользователь с таким лоигном уже зарегистрирован.';
        }

        return 'Проблемы с сервером. Пожалуйста обратитесь в службу поддержки.';
    }

    /**
     * Генерирует текст для ошибки на клиенте.
     * @param {Error} error
     * @returns {string}
     */
    public getClientErrorMessage(error: Error): string {
        return error.message;
    }
}