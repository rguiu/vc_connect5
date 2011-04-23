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
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooox|
        |oxxxxooooxoooo.|
    Then my move should be one of:
        | 14,14 |