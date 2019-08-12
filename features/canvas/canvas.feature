Feature: Creating a canvas

    A canvas is a rectangular grid of pixels
    Every pixel of the canvas has a colour

    Scenario: Creating a canvas
        Given c = canvas(5, 10)
        Then c.width = 5
        And c.height = 10
        And every pixel of c is color(0, 0, 0)


