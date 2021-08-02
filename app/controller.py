
from app import model as m
import pickle

def save_board_data(data,board_name):

    cols = []

    for item in data:
        
        cards = []

        for card in item['cards']:

            cards.append(m.Card(text=card['text'],status=card['status']))

        cols.append(m.Col(name=item['header'],cards=cards))

    board = m.Board(board_name,cols=cols)

    pickle.dump(board, open( board_name + ".pkl", "wb" ) )

def load_board_data(board_name: str):

    return pickle.load( open(board_name + ".pkl", "rb" ) )