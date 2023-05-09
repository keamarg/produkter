// app_spec.js

describe("App e2e test", () => {
  beforeEach(() => {
    // Navigate to the home page before each test
    cy.visit("/");
  });

  it("loads the home page and checks if TopBar, SideBar, and CardGroup components are visible", () => {
    // Check if the TopBar component is visible
    cy.get("[data-cy=top-bar]").should("be.visible");

    // Check if the SideBar component is visible
    cy.get("[data-cy=side-bar]").should("be.visible");

    // Check if the CardGroup component is visible
    cy.get("[data-cy=card-group]").should("be.visible");
  });

  it("Clicks the logo in the TopBar component", () => {
    cy.get("#logo").click();
    // Verify that clicking the logo takes you to the home page or performs the desired action
    cy.url().should("include", "/");
  });

  it("Clicks the search button in the TopBar component", () => {
    cy.get(".btn-search").click();

    // Verify that clicking the search button opens the search bar or performs the desired action
    cy.get(".search-input").should("be.visible");
  });

  it("Clicks each icon in the SideBar component", () => {
    cy.get(".sidebar-icons")
      .children()
      .each(($icon, index) => {
        cy.wrap($icon).click();

        // Verify that clicking the icon navigates to the correct page or performs the desired action
        cy.url().should("include", `/page${index + 1}`);
      });
  });

  it("Clicks on a card in the CardGroup component", () => {
    cy.get(".card").first().click();

    // Verify that clicking the card navigates to the correct page or performs the desired action
    cy.url().should("include", "/card-details");
  });

  it("renders the correct number of carousel items", () => {
    cy.get(".carousel-item").should("have.length", 3);
  });
});
