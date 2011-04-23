module VcConnect5
  class RandomBot < AbstractBot
    def pick_move
      moves = find_possible_moves

      moves[rand(moves.size)]
    end

    protected

    def find_possible_moves
      moves = []
      board.each_with_index do |row, row_idx|
        row.each_with_index do |val, col_idx|
          moves << [row_idx, col_idx] if val == NO_COLOR
        end
      end

      raise("Board is full.") if moves.empty?

      moves
    end
  end
end