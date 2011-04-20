require 'socket'

HOST = 'localhost'
PORT = 8123
NICK = "Super bot 1"

s = TCPSocket.open(HOST, PORT)

SIZE = 15
@squares = Array.new(SIZE) {Array.new(SIZE) {0}}

def pick_move
  x = -1
  y = -1
  sc = -1
  for i in (0..14) 
    for j in (0..14)
      if @squares[i][j] == 0
        t_sc = longest_chain(i,j,1)
        if t_sc > sc || (t_sc == sc && rand(20)==1) 
          x = i
          y = j
          sc = t_sc
        end
      end
    end
  end  
  [x,y]
end

@@mods = [[0,1],[1,0],[1,1],[-1,1]]
def longest_chain(x,y,c)
  max_l = 0
  @@mods.each do |mod|
    l = 1
    xx = x + mod[0]
    yy = y + mod[1]
    while xx>=0 && xx<SIZE && yy>=0 && yy<SIZE && @squares[xx][yy] == c
      l += 1
      xx = xx + mod[0]
      yy = yy + mod[1]
    end
    
    xx = x - mod[0]
    yy = y - mod[1]
    while xx>=0 && xx<SIZE && yy>=0 && yy<SIZE && @squares[xx][yy] == c
      l += 1
      xx = xx - mod[0]
      yy = yy - mod[1]
    end
    max_l = [l,max_l].max
  end
  max_l
end

while line = s.gets 
  if line.chomp == "You will need to set your nick ('nick nick_name')"
    s.puts("nick #{NICK}")
  elsif line.match(/^Your turn/) 
    # do move
    puts "Let me think..."
    co = pick_move()
    puts "I will move #{co[0]} #{co[1]}"
    @squares[co[0]][co[1]] = 1
    s.puts("move #{co[0]} #{co[1]}")
  elsif line.match(/^opponnent/)
    # record move
    a = line.chomp.split
    puts "Opponent - moved: #{a[1]},#{a[2]}"
    @squares[a[1].to_i][a[2].to_i] = 2;
  else
    puts "I didnt understood: #{line.chomp}"
  end
end


