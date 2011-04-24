Feature: random bot makes moves
  As a bot
  I want to make smart moves
  in order to win with other bots

  Background: playing "X"
    Given I am "RandomBot"
      And I am connected to a game
      And I play "x"


  Scenario: finish him
    When the board is:
        |.|012345678901234|
        |0|oxxxxooooxoooox|
        |1|oxxxxooooxoooox|
        |2|oxxxxooooxoooox|
        |3|oxxxxooooxoooox|
        |4|oxxxxooooxoooox|
        |5|oxxxxooooxoooox|
        |6|oxxxxooooxoooox|
        |7|oxxxxooooxoooox|
        |8|oxxxxooooxoooox|
        |9|oxxxxooooxoooox|
        |0|oxxxxooooxoooox|
        |1|oxxxxooooxoooox|
        |2|oxxxxooooxoooox|
        |3|oxxxxooooxoooox|
        |4|oxxxxooooxoooo.|
    Then my move should be one of:
        | 14,14 |