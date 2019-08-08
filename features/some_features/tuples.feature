Feature: Tuples are points and vectors
    Tuples represent points when the fourth column(w) is 1
    Tuplers represent vectors when the fourth column(w) is 0
    Tuples have four properties: x, y, z, w

    Scenario: A tuple with w=1.0 is a point
        Given A tuple a <- "<tupleA>"

        |tupleA|valueA              |
        |a    |[4.3, -4.2, 3.1, 1.0]|

        When When I access the properties of a
        Then a.x = 4.3
        And a.y = -4.2
        And a.z = 3.1
        And a.w = 1.0
        And a is a point
        And a is not a vector


    Scenario: A tuple with w=0 is a vector
        Given A tuple a <- "<tupleA>"

        |tupleA|valueA              |
        |a    |[4.3, -4.2, 3.1, 0.0]|

        When When I access the properties of a
        Then a.x = 4.3
        And a.y = -4.2
        And a.z = 3.1
        And a.w = 1.0
        And a is not a point
        And a is a vector

    Scenario: point() creates tuples with w=1
        Given p ← point(4, -4, 3)
        Then p is equal to tuple(4, -4, 3, 1)

    Scenario: vector() creates tuples with w=0
        Given v ← vector(4, -4, 3)
        Then v is equal to tuple(4, -4, 3, 0)
