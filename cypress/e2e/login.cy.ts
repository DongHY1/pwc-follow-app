describe("Login Page", () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should("be.empty");
  });

  it("passes", () => {
    cy.visit("http://localhost:3000/login");
  });
  it("should fill login form and login user and redirect to home page", () => {
    // fill username
    cy.get("#email")
      .type("pwctest@qq.com")
      .should("have.value", "pwctest@qq.com");
    // fill password
    cy.get("#password").type("pwctest").should("have.value", "pwctest");
    // submit
    cy.get("button").contains("Logiin").click();
    // redirect to home
    cy.url().should("contain", "http://localhost:3000");
  });
});
export {};
