Feature: Tuples are points and vectors
    Tuples represent points when the fourth column(w) is 1
    Tuplers represent vectors when the fourth column(w) is 0
    Tuples have four properties: x, y, z, w

    Scenario: A tuple with w = 1.0 is a point
        Given A tuple a = "<Value>"
        | TupleName | Value                 |
        | a         | [4.3, -4.2, 3.1, 1.0] |

        When When I access the properties of a
        Then a.x = 4.3
        And a.y = -4.2
        And a.z = 3.1
        And a.w = 1.0
        And a is a point
        And a is not a vector

    Scenario: vector() creates tuples with w=0
        Given v = vector(4, -4, 3)
        Then v is equal to tuple(4, -4, 3, 0)

    Scenario: point() creates tuples with w=1
        Given p = point(4, -4, 3)
        Then p is equal to tuple(4, -4, 3, 1)

    Scenario: Adding two tuples
        Given a = tuple(3, -2, 5, 1)
        And b = tuple(-2, 3, 1, 0)
        Then a plus b = tuple(1, 1, 6, 1)

    Scenario: Adding a Vector to a Vector
        Given a = vector(3, -2, 5)
        And b = vector(-2, 3, 1)
        Then a plus b = tuple(1, 1, 6, 0)

    Scenario: Subtracting two points
        Given p = point(3, 2, 1)
        And b = point(5, 6, 7)
        Then p - b = vector(-2, -4, -6)

    Scenario: Subtracting a vector from a point
        Given p = point(3, 2, 1)
        And v = vector(5, 6, 7)
        Then p - v = point(-2, -4, -6)

    Scenario: Subtracting two vectors
        Given v = vector(3, 2, 1)
        And k = vector(5, 6, 7)
        Then v - k = vector(-2, -4, -6)

    Scenario: Subtracting a vector from the zero vector
        Given zero = vector(0, 0, 0)
        And v = vector(1, -2, 3)
        Then zero - v = vector(-1, 2, -3)

    Scenario: Negating a tuple
        Given a = tuple(1, -2, 3, -4)
        Then -a = tuple(-1, 2, -3, 4)

    Scenario: Multiplying a tuple by a scalar
        Given a = tuple(1, -2, 3, -4)
        Then a * 3.5 = tuple(3.5, -7, 10.5, -14)

    Scenario: Multiplying a tuple by a fraction
        Given a = tuple(1, -2, 3, -4)
        Then a * 0.5 = tuple(0.5, -1, 1.5, -2)

    Scenario: Dividing a tuple by a scalar
        Given a = tuple(1, -2, 3, -4)
        Then a divided by 2 = tuple(0.5, -1, 1.5, -2)

    Scenario: Computing the magnitude of vector(1, 0, 0)
        Given v = vector(1, 0, 0)
        Then magnitude(v) = 1

    Scenario: Computing the magnitude of vector(0, 1, 0)
        Given v = vector(0, 1, 0)
        Then magnitude(v) = 1
    Scenario: Computing the magnitude of vector(0, 0, 1)
        Given v = vector(0, 0, 1)
        Then magnitude(v) = 1
    Scenario: Computing the magnitude of vector(1, 2, 3)
        Given v = vector(1, 2, 3)
        Then magnitude(v) = √14
    Scenario: Computing the magnitude of vector(-1, -2, -3)
        Given v = vector(-1, -2, -3)
        Then magnitude(v) = √14
