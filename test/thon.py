class ChessBoard:
    def __init__(self):
        self.board = self.create_board()

    def create_board(self):
        board = []
        for _ in range(8):
            row = [' '] * 8
            board.append(row)
        # Placing initial pieces
        board[0] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
        board[1] = ['p'] * 8
        board[6] = ['P'] * 8
        board[7] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        return board

    def print_board(self):
        for row in self.board:
            print(" ".join(row))

    def move_piece(self, start, end):
        x1, y1 = start
        x2, y2 = end
        piece = self.board[x1][y1]
        self.board[x1][y1] = ' '
        self.board[x2][y2] = piece

    def is_valid_move(self, start, end):
        # Implement validation logic here
        return True  # For simplicity, all moves are considered valid in this basic version


class ChessGame:
    def __init__(self):
        self.board = ChessBoard()
        self.current_player = 'white'

    def play(self):
        while True:
            self.board.print_board()
            print(f"It's {self.current_player}'s turn.")
            move = input("Enter your move (e.g., 'e2 e4'): ")
            start, end = move.split()
            start = (8 - int(start[1]), ord(start[0]) - ord('a'))
            end = (8 - int(end[1]), ord(end[0]) - ord('a'))
            if self.board.is_valid_move(start, end):
                self.board.move_piece(start, end)
                self.current_player = 'black' if self.current_player == 'white' else 'white'
            else:
                print("Invalid move. Try again.")


if __name__ == "__main__":
    game = ChessGame()
    game.play()