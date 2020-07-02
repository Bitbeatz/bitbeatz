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

def fitness(p_class, ideal):
    fitness_score = 0
    for y in range (0,p_class.rows):
        print ('row:', y)
        if sum(p_class.chromesome[y]) == sum(ideal[y]):
            print ("same number of beats in ideal for row ", y)
           # fitness_score += 2
        for x in range(0,p_class.columns):
            print(p_class.chromesome[y][x],' ',  ideal [y][x])
            if p_class.chromesome[y][x] and ideal [y][x] == 1:
                print("MATCH!")
                fitness_score +=1*(1/(y+1))
    
            

    return (fitness_score/30)




ideal = [[1,0,0,1,0,1],[1,0,0,1,0,0],[0,0,0,1,0,0],[1,0,1,1,0,1],[1,0,1,1,0,1]]
### testing class capabilities            
bob = percussion_class("bruh", 9)
print("name:")
print(bob.name)
print("genes:")
print(bob.chromesome)
print("ideal:")
print(ideal)
x= fitness(bob,ideal)
print ("fitness score:")
print (x)