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
#      @server = TCPSocket.open(host, port)
      @server = TCPSocket.open(host, port)

      @board = Array.new(BOARD_SIZE) { Array.new(BOARD_SIZE, 0) }
    end

    def play
      while line = @server.gets
        if line.chomp == "You will need to set your nick ('nick nick_name')"
          submit_command "nick #{nick}"
        elsif line.match(/^Your turn/)
          # do move
          log "Let me think..."
          x, y = pick_move

          puts "I will move #{x} #{y}"
          board[x][y] = MY_COLOR

          submit_command "move #{x} #{y}"
        elsif line.match(/^opponent/)
          # record move
          opponent, x, y = line.chomp.split.map(&:to_i)
          log "Opponent - moved: #{x},#{y}"
          
          board[x][y] = OPPONENT_COLOR;
        elsif line.match(/You WON/)
          log "SWEET VICTORY...YUHUUUU"
          return 0
        elsif line.match(/You LOST/)
          log "CHEAAAAAAT This game is crap"
          return 0
        else
          log "I didnt understood: #{line.chomp}"
        end
      end
    end

    protected

    attr_reader :nick, :server, :log_output, :board

    def submit_command(command)
      server.puts(command)
    end

    def log(text)
      log_output.puts(text)
    end

    def pick_move
      raise "Implement this method in your bot subclass"
    end
  end
end
