Feature: sample bot makes smart moves
  As a bot
  I want to make smart moves
  in order to win with other bots

  Background: playing "X"
    Given I am "SampleBot"
      And I am connected to a game
      And I play "x"

  Scenario: finish him
    When the board is:
        |.|012345678901234|
        |0|.xxxx..........|
        |1|...............|
        |2|...............|
        |3|...............|
        |4|...............|
        |5|...............|
        |6|...............|
        |7|...............|
        |8|...............|
        |9|...............|
        |0|...............|
        |1|...............|
        |2|...............|
        |3|...............|
        |4|...............|
    Then my move should be one of:
        | 0,0 | 0,5 |

  Scenario: one winning move possible
    When the board is:
        |.|012345678901234|
        |0|xxxx...........|
        |1|...............|
        |2|...............|
        |3|...............|
        |4|...............|
        |5|...............|
        |6|...............|
        |7|...............|
        |8|...............|
        |9|...............|
        |0|...............|
        |1|...............|
        |2|...............|
        |3|...............|
        |4|...............|
    Then my move should be one of:
        | 0,4 |
