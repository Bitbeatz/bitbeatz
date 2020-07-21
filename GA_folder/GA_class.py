import numpy
from random import seed
from random import randint
from random import shuffle
import matplotlib.pyplot as plt
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred=credentials.Certificate('./adminKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

projectId = u'test'
ideal = []

doc_ref = db.collection(u'projects').document(projectId)
project_doc = doc_ref.get()
if project_doc.exists:
    data = project_doc.to_dict()
    if 'ideal' in data:
        idealData = data['ideal']
        for i in idealData:
            ideal.append(i['0'])
        print(f'ideal: {ideal}')
else:
    exit()

# doc_ref.update({
#     u'ideal': [
#         { u'0': [1,0,0,1,0,1] },
#         { u'0': [1,0,0,1,0,0] },
#         { u'0': [0,0,0,1,0,0] },
#         { u'0': [1,0,0,0,0,0] },
#         { u'0': [1,0,0,0,0,0] },
#     ]
# })
# exit()

seed(1)
def Sort(sub_li): 
  
    # reverse = None (Sorts in Ascending order) 
    # key is set to sort using second element of  
    # sublist lambda has been used 
    sub_li.sort(key = lambda x: x[1]) 
    return sub_li 

class percussion_class:
   
    def __init__(self, type ="blank", seed = 1):
        self.name = type
        #columns_required
        self.columns = 6
        self.rows = 5
        #sets random seed for generation
      
         #intializes a blank array 
        self.chromesome = [[0] * self.columns for i in range(self.rows)]
        self.gen()

    def gen (self):
      
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
#possibly change the lower rungs, to have percentages
    fitness_score = 0
    for y in range (0,p_class.rows):
        for x in range(0,p_class.columns):
            if p_class.chromesome[y][x] ==  ideal [y][x]:
                fitness_score +=1*(1/(y+1))
    return (fitness_score/30)

def fornicate (p1, p2, mut = 10):
    new_c = [[0] * p1.columns for i in range(p1.rows)]
    for y in range (0,p2.rows):
        for x in range(0,p2.columns):
           rand = randint(0,1)
           if rand == 0:
               new_c[y][x] = p1.chromesome [y][x]
           else:
               new_c[y][x] = p2.chromesome [y][x]
    mut_chance = randint(0,100)
  
    if mut_chance >= 100-mut:
         x = randint(0, p1.columns -1)
         y = randint(0, p1.rows -1)
         if new_c [y][x] != 1:
            new_c [y][x] = 1
         else:
            new_c [y][x] = 0    

    kid = percussion_class()
    kid.chromesome = new_c
    return kid

def generate_population(num):
    pop = [ percussion_class(i) for i in range(num)] 
    return pop

def get_scores(pop, goal):
    scores = []
    for c, value in enumerate(pop, 0):
        scores.append([c,fitness(value, goal), value])
    return scores


def create_next_gen(pop, ideal):
    #add a variation variable 
    #gets the top fit of the population
    scores = get_scores(pop, ideal)
    scores = sorted(scores, key=lambda x: x[1])
    mates = scores[-int(len(scores)/2):]
    next_gen = []
    for i in range(4):
        #shuffles parents four times to make kids
        shuffle(mates)
        moms = mates [-int(len(mates)/2):]
        dads = mates [0:int(len(mates)/2)]
        for i in range(0,len(moms)):
            next_gen.append(fornicate(moms[i][2],dads[i][2]))
    
    return next_gen

       


# ideal = [[1,0,0,1,0,1],[1,0,0,1,0,0],[0,0,0,1,0,0],[1,0,0,0,0,0],[1,0,0,0,0,0]]
### testing class capabilities      
points =[]
generation = generate_population(100)
whole = get_scores(generation,ideal)
scores = [item[1] for item in whole]
score = sum(scores)/len(scores)
print(score)

for i in range(40):
    generation = create_next_gen(generation, ideal)
    print("Generation:", i)
    whole = get_scores(generation,ideal)
    scores = [item[1] for item in whole]
    score = sum(scores)/len(scores)
    points.append(score)

plt.plot(points)
plt.ylabel('Fitness Score')
plt.xlabel('Generation')
plt.show()

final_chromosome = generation[0].chromesome
output = []
for c in final_chromosome:
    output.append({ '0': c })

doc_ref.update({
    u'output': output
})
print("final generation, 0th lad: ", output)
exit()
    
    









  