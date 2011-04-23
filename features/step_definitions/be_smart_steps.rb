def mark(sign)
  case sign.downcase
    when "." then 0
    when "x" then 1
    when "o" then 2
    else raise("Unrecognized symbol in board spec")
  end
end

def internal_board(spec)
  spec.map do |row|
    row.first.split(//).map { |s| mark(s) }
  end
end

def expected_moves(moves_spec)
  moves_spec.raw.first.map { |m| m.split(',').map(&:to_i) }
end

# Not supposed to stub in acceptance tests? Who said that?
Given /^I am connected to a game$/ do
  TCPSocket.stub!(:open)
  output = stub("Output", :puts => true)
  @bot = VcConnect5::SampleBot.new("sample_bot", "localhost", 0, output)
end

Given /^I play "([^"]*)"$/ do |color|
  # nothing here (assume always X in scenarios, it is mirror symmetry after all)
end

When /^the board is:$/ do |board|
  @bot.instance_variable_set("@board", internal_board(board.raw))
end

Then /^my move should be one of:$/ do |moves_spec|
  expected_moves(moves_spec).should include(@bot.pick_move)
end
