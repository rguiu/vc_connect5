require 'socket'

module VcConnect5
  class AbstractBot
    BOARD_SIZE     = 15
    MY_COLOR       = 1
    OPPONENT_COLOR = 2

    def initialize(nick, host, port = 8123, log = $stdout)
      @nick       = nick
      @log_output = log

      log "connecting to #{host}:#{port} as #{nick}"
      @server = TCPSocket.open(host, port)

      @board = Array.new(BOARD_SIZE) { Array.new(BOARD_SIZE, 0) }
    end

    def play
      while line = @server.gets
        if line.chomp == "You will need to set your nick ('nick nick_name')"
          submit_command "nick #{nick}"
        elsif line.match(/^Your turn/)
          before_move

          x, y = pick_move
          board[x][y] = MY_COLOR
          submit_command "move #{x} #{y}"

          after_bots_move(x, y)

        elsif line.match(/^opponent/)
          opponent, x, y = line.chomp.split.map(&:to_i)
          board[x][y] = OPPONENT_COLOR

          after_opponents_move(x, y)
        elsif line.match(/You WON/)
          after_victory
          return 0
        elsif line.match(/You LOST/)
          after_defeat
          return 0
        else
          after_unknown_response(line)
        end
      end
    end

    protected

    attr_reader :nick, :server, :log_output, :board

    def pick_move
      raise "Implement this method in your bot subclass"
    end

    def submit_command(command)
      server.puts(command)
    end

    def before_move
      log "Let me think..."
    end

    def after_bots_move(x, y)
      log "My move: #{x} #{y}"
    end

    def after_opponents_move(x, y)
      log "Opponent's move: #{x},#{y}"
    end

    def after_victory
      log "SWEET VICTORY...YUHUUUU"
    end

    def after_defeat
      log "CHEAAAAAAT This game is crap"
    end

    def after_unknown_response(line)
      log "I don't understand: #{line.chomp}"
    end

    def log(text)
      log_output.puts(text)
    end
  end
end
