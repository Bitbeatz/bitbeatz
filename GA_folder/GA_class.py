import numpy
from random import seed
from random import randint

class percussion_class:
   
    def __init__(self, type, seed = 1):
        self.name = type
        #columns_required
        self.columns = 6
        self.rows = 5
        #sets random seed for generation
        self.seed = seed
         #intializes a blank array 
        self.chromesome = [[0] * self.columns for i in range(self.rows)]
        self.gen()

    def gen (self):
        seed(self.seed)
        for i in range (8):
            cont = False
            #checks to ensure we don't write over the same co-ordinate 
            while cont == False:
                x = randint(0, self.columns -1)
                y = randint(0, self.rows -1)
                if  self.chromesome [y][x] != 1:
                    self.chromesome [y][x] = 1
                    cont = True 
                else:
                    pass

### testing class capabilities            
bob = percussion_class("bruh", 9)
print(bob.name)
print(bob.chromesome)