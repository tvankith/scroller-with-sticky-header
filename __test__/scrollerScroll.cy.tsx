import React from "react";
import { Scroll } from "../components";

describe("<Scroll />", () => {
  beforeEach(() => {
    const firstBlockStyle = {
      width: "200px",
      height: "100px",
      backgroundColor: "coral",
    };
    const secondBlockStyle = {
      width: "200px",
      height: "100px",
      backgroundColor: "cornflowerblue",
    };
    const thirdBlockStyle = {
      width: "200px",
      height: "100px",
      backgroundColor: "darkcyan",
    };
    cy.mount(
      <div className="container">
        <Scroll gap="10px" data-test="container">
          <Scroll.Group data-test="first-group">
            <Scroll.Title data-test="first-header">Utrhoncus</Scroll.Title>
            <Scroll.Item>
              <div style={firstBlockStyle}></div>
            </Scroll.Item>
          </Scroll.Group>

          <Scroll.Group>
            <Scroll.Title data-test="second-header">Nam feugiat</Scroll.Title>
            <Scroll.Item>
              <div style={secondBlockStyle}></div>
            </Scroll.Item>
            <Scroll.Item>
              <div style={secondBlockStyle}></div>
            </Scroll.Item>
          </Scroll.Group>

          <Scroll.Group>
            <Scroll.Title data-test="third-header">
              Maecenas at purus
            </Scroll.Title>
            <Scroll.Item>
              <div style={thirdBlockStyle}></div>
            </Scroll.Item>
            <Scroll.Item>
              <div style={thirdBlockStyle}></div>
            </Scroll.Item>
            <Scroll.Item>
              <div style={thirdBlockStyle}></div>
            </Scroll.Item>
          </Scroll.Group>
        </Scroll>
      </div>,
    );
  });

  it("should fix the first header after scrolling the container horizontally", () => {
    const scrollLeft = 100;
    cy.get('[data-test="first-header"]').as("first-header");
    cy.get("@first-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("initial-client-rect");
    cy.get('[data-test="container"]').scrollTo(scrollLeft, 0).as("scroll");
    cy.get("@first-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("final-client-rect");

    cy.wait(50);
    cy.get("@first-header").then(($element) => {
      const computedStyle = window.getComputedStyle($element[0]);
      expect(computedStyle.getPropertyValue("position")).to.equal("fixed");
    });

    cy.get("@initial-client-rect").then((initial: any) => {
      cy.get("@final-client-rect").then((final: any) => {
        expect(initial.left).to.be.eq(final.left + scrollLeft);
        expect(initial.left).to.be.eq(final.left + scrollLeft);
      });
    });
  });

  it("should fix the second header after scrolling the container horizontally", () => {
    const scrollLeft = 250;
    cy.get('[data-test="second-header"]').as("second-header");
    cy.get("@second-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("initial-client-rect");
    cy.get('[data-test="container"]').scrollTo(scrollLeft, 0);
    cy.get("@second-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("final-client-rect");

    cy.wait(50);
    cy.get("@second-header").then(($element) => {
      const computedStyle = window.getComputedStyle($element[0]);
      expect(computedStyle.getPropertyValue("position")).to.equal("fixed");
    });

    cy.get("@initial-client-rect").then((initial: any) => {
      cy.get("@final-client-rect").then((final: any) => {
        expect(initial.left).to.be.eq(final.left + scrollLeft);
      });
    });
  });

  it("should first header fully hidden after scrolling fully first group", () => {
    const scrollLeft = 250;
    cy.get('[data-test="first-header"]').as("first-header");
    cy.get("@first-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("initial-client-rect");
    cy.get('[data-test="container"]').scrollTo(scrollLeft, 0);
    cy.get("@first-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("final-client-rect");

    cy.wait(50);
    cy.get("@first-header").then(($element) => {
      const computedStyle = window.getComputedStyle($element[0]);
      expect(computedStyle.getPropertyValue("position")).to.equal("absolute");
    });

    cy.get("@initial-client-rect").then((initial: any) => {
      cy.get("@final-client-rect").then((final: any) => {
        expect(final.left).to.be.eq(initial.left - scrollLeft);
      });
    });
  });

  it("should fix header to right of the group if text's width greater than visible portion of group", () => {
    const scrollLeft = 180;
    cy.get('[data-test="container"]').scrollTo(scrollLeft, 0);
    cy.get('[data-test="first-header"]').as("first-header");
    cy.get("@first-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("first-header-client-rect");
    cy.get('[data-test="first-group"]')
      .then(($element) => $element[0].getBoundingClientRect())
      .as("first-group-client-rect");

    cy.wait(50);
    cy.get("@first-header").then(($element) => {
      const computedStyle = window.getComputedStyle($element[0]);
      expect(computedStyle.getPropertyValue("position")).to.equal("absolute");
    });
    cy.get("@first-group-client-rect").then((groupClientRect: any) => {
      cy.get("@first-header-client-rect").then((headerClientRect: any) => {
        expect(groupClientRect.left).to.be.eq(headerClientRect.left);
      });
    });
  });

  it("should render title at right position after scrolling fully left and back", () => {
    cy.get('[data-test="third-header"]').as("third-header");
    cy.get("@third-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("third-header-initial-client-rect");
    cy.get('[data-test="container"]').scrollTo("right");
    cy.wait(50);
    cy.get('[data-test="container"]').scrollTo("left");
    cy.wait(50);
    cy.get("@third-header")
      .then(($element) => $element[0].getBoundingClientRect())
      .as("third-header-final-client-rect");

    cy.get("@third-header-initial-client-rect").then(
      (initialClientRect: any) => {
        cy.get("@third-header-final-client-rect").then(
          (finalClientRect: any) => {
            expect(initialClientRect.left).to.be.eq(finalClientRect.left);
          },
        );
      },
    );
    cy.get("@third-header").then(($element) => {
      const computedStyle = window.getComputedStyle($element[0]);
      expect(computedStyle.getPropertyValue("position")).to.equal("absolute");
    });
  });
});
