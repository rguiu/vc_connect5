require 'socket'

HOST = 'localhost'
PORT = 8123
NICK = "Super bot 1"

s = TCPSocket.open(HOST, PORT)

SIZE = 15
squares = Array.new(SIZE) {Array.new(SIZE) {0}}

while line = s.gets 
  if line.chomp == "You will need to set your nick ('nick nick_name')"
    s.puts("nick #{NICK}")
  else if line.chomp == "Your turn"
    # do move
  else if line.match(/^oponnent/) 
    # record move
    a = line.chomp.split
    squares[a[1].to_i][a[2].to_i] = 2;
  end
end

def pick_move
  x = -1
  y = -1
  sc = -1
  for(i in 0..14) 
    for(j in 0..14)
    end
  end  
end

def longest_chain()
  for(i in 0..14) 
    for(j in 0..14)
      if (squares[i][j]==1) 
        
      end
    end
  end  
end
