class Card:

    def __init__(self, text, status):
        self.text = text
        self.status = status

    def get_text(self):
        return self.text

    def get_status(self):
        return self.status

    def set_text(self,text):
        self.text = text

    def set_status(self,status):
        self.status = status
       
class Col:

    def __init__(self, name, cards: list = None):
        self.name = name
        self.cards = cards

    def get_cards(self):
        return self.cards

    def get_name(self):
        return self.name

    def set_cards(self,cards):
        self.cards = cards

    def set_name(self,name):
        self.name = name

    def add_card(self,card):
        self.cards.append(card)

class Board:

    def __init__(self, name, cols:list = None):
        self.name = name

        if cols == None:
            self.cols = []
        else:
            self.cols = cols

    def get_cols(self):
        return self.cols

    def get_name(self):
        return self.name

    def set_cols(self,cols):
        self.cols = cols

    def set_name(self,name):
        self.name = name
