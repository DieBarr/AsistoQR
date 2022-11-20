import { browser, by, element } from 'protractor';
describe('Login test',()=>{


    beforeEach(()=>{
    browser.get('/');
    });
    it('Login se muestra por defecto',()=>{
expect(element(by.css('ion-title')).getText()).toContain('Iniciar Sesión');
    });
});
