module VcConnect5
  class SampleBot < AbstractBot
    MODS = [[0, 1], [1, 0], [1, 1], [-1, 1]]

    def pick_move
      x  = -1
      y  = -1
      sc = -1
      for i in (0..14)
        for j in (0..14)
          if board[i][j] == 0
            t_sc = longest_chain(i, j, 1)
            if t_sc > sc || (t_sc == sc && (sc==1 ? rand(40)==1 : rand(3)==1))
              x  = i
              y  = j
              sc = t_sc
            end
          end
        end
      end
      [x, y]
    end

    protected

    def longest_chain(x, y, c)
      max_l = 0
      MODS.each do |mod|
        l  = 1
        xx = x + mod[0]
        yy = y + mod[1]
        while xx>=0 && xx<BOARD_SIZE && yy>=0 && yy<BOARD_SIZE && board[xx][yy] == c
          l  += 1
          xx = xx + mod[0]
          yy = yy + mod[1]
        end

        xx = x - mod[0]
        yy = y - mod[1]
        while xx>=0 && xx<BOARD_SIZE && yy>=0 && yy<BOARD_SIZE && board[xx][yy] == c
          l  += 1
          xx = xx - mod[0]
          yy = yy - mod[1]
        end
        max_l = [l, max_l].max
      end
      max_l
    end
  end
end
