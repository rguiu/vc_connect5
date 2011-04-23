Feature: bot makes smart moves
  As a bot
  I want to make smart moves
  in order to win with other bots

  Background: playing "X"
    Given I am connected to a game
      And I play "x"


  Scenario: finish him
    When the board is:
        |.xxxx..........|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
    Then my move should be one of:
        | 0,0 | 0,5 |

  Scenario: one winning move possible
    When the board is:
        |xxxx...........|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
        |...............|
    Then my move should be one of:
        | 0,4 |
