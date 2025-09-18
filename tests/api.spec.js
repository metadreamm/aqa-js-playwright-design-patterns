import { test, expect } from '@playwright/test';

test.describe.only('API-тесты для Restful-booker', () => {

    const baseURL = 'https://restful-booker.herokuapp.com';

    let bookingId;

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


    test('Создание бронирования (POST /booking)', async ({ request }) => {
        
        const response = await request.post(baseURL + '/booking', {
            data: bookingData
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking');

        expect(responseBody.booking).toMatchObject(bookingData);

        bookingId = responseBody.bookingid;

        console.log('Response body:', responseBody);
    });

    test('Получение информации о бронировании (GET /booking/{id})', async ({ request }) => {
        const response = await request.get(baseURL + `/booking/${bookingId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toMatchObject(bookingData);

        console.log('Response body:', responseBody);
    });

});