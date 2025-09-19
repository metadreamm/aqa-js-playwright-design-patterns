import { test, expect } from '@playwright/test';

test.describe('@api API-тесты для Restful-booker', () => {

    const baseURL = 'https://restful-booker.herokuapp.com';

    // Глобальные переменные для хранения id бронирования и токена авторизации и пердачи их между тестами
    let bookingId;
    let token;

    // Данные бронирования для POST
    const bookingData = {
            firstname: "John",
            lastname: "Doe",
            totalprice: 120,
            depositpaid: false,
            bookingdates: {
                checkin: "2025-09-18",
                checkout: "2025-09-21"
            },
            additionalneeds: "Breakfast"
    };

    // Обновленные данные для PUT
    const updatedBookingData = {
        firstname: "George",
        lastname: "Doe",
            totalprice: 341,
            depositpaid: true,
            bookingdates: {
                checkin: "2025-09-18",
                checkout: "2025-09-23"
            },
            additionalneeds: "Lunch"
    };

    test('Создание бронирования (POST /booking)', async ({ request }) => {
        
        const response = await request.post(baseURL + '/booking', {
            data: bookingData
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');

        expect(responseBody).toHaveProperty('booking');

        // Проверяем, что данные бронирования в ответе совпадают с отправленными
        expect(responseBody.booking).toMatchObject(bookingData);

        bookingId = responseBody.bookingid;

        console.log('Response body:', responseBody);
    });

    test('Получение информации о бронировании (GET /booking/{id})', async ({ request }) => {
        const response = await request.get(baseURL + `/booking/${bookingId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toMatchObject(bookingData);
    });

    test('Обновление бронирования (Update - PUT /booking/{id})', async ({ request }) => {
        // Получаем токен
        const authResponse = await request.post(baseURL + '/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });
        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();
        expect(authBody).toHaveProperty('token');
        
        token = authBody.token;

        // Отправляем PUT запрос на обновление бронирования с заголовками авторизации и типом контента
        const response = await request.put(baseURL + `/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`,
                'Content-Type': 'application/json'
            },
            data: updatedBookingData
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toMatchObject(updatedBookingData);

        console.log('Response body:', responseBody);
    });

    test('Удаление бронирования (DELETE /booking/{id})', async ({ request }) => {
        const response = await request.delete(baseURL + `/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${token}`
            }
        });
        expect(response.status()).toBe(201);

        // Проверяем, что после удаления при запросе GET возвращается 404
        const getResponse = await request.get(baseURL + `/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404);
    });
});
