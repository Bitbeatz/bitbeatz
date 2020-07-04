import numpy
from random import seed
from random import randint

class percussion_class:
   
    def __init__(self, type ="blank", seed = 1):
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
            #checks to ensure we don't write over rahe same co-ordinate 
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
        for x in range(0,p_class.columns):
            if p_class.chromesome[y][x] ==  ideal [y][x]:
                fitness_score +=1*(1/(y+1))
    return (fitness_score/30)

def fornicate (p1, p2, mut = 10):
    new_c = [[0] * p1.columns for i in range(p1.rows)]
    print(new_c)
    seed (1)
    for y in range (0,p2.rows):
        for x in range(0,p2.columns):
           rand = randint(0,1)
           if rand == 0:
               new_c[y][x] = p1.chromesome [y][x]
           else:
               new_c[y][x] = p2.chromesome [y][x]
    mut_chance = randint(0,100)

    if mut_chance >= 100-mut:
         print("mutation occured")
         x = randint(0, p1.columns -1)
         y = randint(0, p1.rows -1)
         if new_c [y][x] != 1:
            new_c [y][x] = 1
         else:
            new_c [y][x] = 0    

    kid = percussion_class()
    kid.chromesome = new_c
    return kid
            



ideal = [[1,0,0,1,0,1],[1,0,0,1,0,0],[0,0,0,1,0,0],[1,0,0,0,0,0],[1,0,0,0,0,0]]
### testing class capabilities            
bob = percussion_class("bruh", 9)
bob2 = percussion_class("bruh2", 7)
print(bob2.chromesome)
print(bob.chromesome)
kid = fornicate(bob,bob2)
print(kid.chromesome)


exit()

print("name:")
print(bob.name)
print("genes:")
print(bob.chromesome)
print("ideal:")
print(ideal)
x= fitness(bob,ideal)
print ("fitness score:")
print (x)