import '@testing-library/jest-dom';

describe("Canary Test.", () => {

    test("Deve retornar True para True.", () => {
        const verdade = true;

        const isVerdade = verdade == true;

        expect(isVerdade).toBe(true);
    });
});