import { browser, by, element } from 'protractor';
describe('Login test profe',()=>{

    beforeEach(()=>{
    browser.get('/home-teacher');
    });
    it('Profesor entra a lista de sus secciones por defecto',  ()=>{

  
 expect(element(by.css('ion-label')).getText()).toContain('Secciones');
    });


    
});
