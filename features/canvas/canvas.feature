Feature: Creating a canvas

    A canvas is a rectangular grid of pixels
    Every pixel of the canvas has a colour

    Scenario: Creating a canvas
        Given c = canvas(5, 10)
        Then c.width = 5
        And c.height = 10
        And every pixel of c is color(0, 0, 0)

    Scenario: Writing pixels to a canvas
        Given c = canvas(10, 20)
        And red = color(1, 0, 0)
        When writePixel(c, 2, 3, red)
        Then pixelAt(c, 2, 3) = red
