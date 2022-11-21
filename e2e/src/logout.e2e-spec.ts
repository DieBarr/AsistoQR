import { browser, by, element } from 'protractor';
describe('Logout test',()=>{

    beforeEach(()=>{
    browser.get('/home-teacher');
    });
    it('Profesor puede cerrar sesion', async ()=>{

   await element(by.id('opciones')).click();
        browser.driver.sleep(1000);
        await element(by.id('salir')).click();

        browser.driver.sleep(1000);
 expect(element(by.css('ion-button')).getText()).toContain('INGRESAR');
    });
});
