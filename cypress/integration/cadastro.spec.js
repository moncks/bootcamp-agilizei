/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
  it('Cadastro de usuário no site', () => {
    //rotas
    // POST (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // POST (aborted) /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/api/1/databases/userdetails/collections/newtable?**',
      status: 200,
      response: {},
    }).as('postNewtable');

    cy.route({
      method: 'POST',
      url: '**/api/1/databases/userdetails/collections/usertable?**',
      status: 200,
      response: {},
    }).as('postUsertable');

    cy.route({
      method: 'GET',
      url: '**/api/1/databases/userdetails/collections/newtable?**',
      status: 200,
      response: {},
    }).as('getNewtable');

    cy.route({
      method: 'GET',
      url: '**/api/1/databases/userdetails/collections/usertable?**',
      status: 200,
      response: {},
    }).as('getUsertable');

    // baseUrl
    cy.visit('Register.html');

    // type = digitar texto em algum campo
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));

    //check -> radio's e checkboxes'
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    // select -> select e select 2
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('Australia', { force: true });
    cy.get('select#yearbox').select('1990');
    cy.get('select[ng-model^=month]').select('October');
    cy.get('select#daybox').select('13');
    cy.get('input#firstpassword').type('Agilizei@2021');
    cy.get('input#secondpassword').type('Agilizei@2021');

    // attachFile -> input file
    cy.get('input#imagesrc').attachFile('imagem-foto.PNG');

    // clic
    cy.get('button#submitbtn').click();

    // rotas
    cy.wait('@postNewtable').then((resNewTable) => {
      // chai
      expect(resNewTable.status).to.eq(200);
    });

    cy.wait('@postUsertable').then((resUserTable) => {
      expect(resUserTable.status).to.eq(200);
    });

    cy.wait('@getNewtable').then((resNewTable) => {
      expect(resNewTable.status).to.eq(200);
    });

    cy.wait('@getUsertable').then((resUserTable) => {
      expect(resUserTable.status).to.eq(200);
    });

    cy.url().should('contain', 'WebTable');
  });
});

//elementos
// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input#firstpassword
// input#secondpassword
// input#imagesrc
// button#submitbtn
