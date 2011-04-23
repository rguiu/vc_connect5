require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

module VcConnect5
  describe RandomBot do
    def set_board(board)
      @bot.instance_variable_set("@board", board)
    end

    let(:full_board) do
      Array.new(RandomBot::BOARD_SIZE) { Array.new(RandomBot::BOARD_SIZE, RandomBot::MY_COLOR) }
    end
    let(:empty_board) do
      Array.new(RandomBot::BOARD_SIZE) { Array.new(RandomBot::BOARD_SIZE, RandomBot::NO_COLOR) }
    end

    before(:each) do
      TCPSocket.stub!(:open)

      output = stub('Output', :puts => true)
      @bot = RandomBot.new('bot', 'localhost', 8123, output)
    end

    describe "#pick_move" do
      it "should make move with valid coords" do
        x, y = @bot.pick_move

        (0..14).should include(x)
        (0..14).should include(y)
      end

      it "should make random move" do
        moves = 10.times.map do
          set_board(empty_board)
          @bot.pick_move
        end

        moves.uniq.size.should > 1
      end

      context "with non-empty board" do
        before(:each) do
          set_board(full_board)
        end

        it "should not move to non-empty coords" do
          full_board[14][14] = RandomBot::NO_COLOR # leave one coord empty

          x, y = @bot.pick_move

          x.should == 14
          y.should == 14
        end

        it "should raise exception if board is full" do
          proc { @bot.pick_move }.should raise_error("Board is full.")
        end
      end
    end
  end
end
