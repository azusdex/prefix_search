## **HomeWork**
#### Konstantin Khotski

I have written two methods to find the longest prefix.

1. **Simple.ts** - Enumerating all prefixes. The simple but inefficient. The time complexity is **O(n)**, where **n** is the number of prefixes.
2. **Tree.ts** - Tree-based approach. Need more memory to insert all prefixes to tree. The time complexity is **O(m)**, where m is the length of the input string.


    Structure Tree for example: ['one', 'only', 'two']
    - o
      - n
        - e
        - l
          - y
    - t
      - w
        - o


I have not written any comments, but I tried to give clear names to functions and variables.
    
    Project structure
    - src 
        - app.ts            # server listener and routes
        - search.ts         # preload prefixes and search 
        - simple.ts         # enumerating all prefixes
        - tree.ts           # preload tree, search
    - tests
        - simple.spec.ts    
        - tree.spec.ts
    - uploads
        - sample_prefixes.txt


#### Install: 
``npm install``

#### Run:
``npm run start``

Server listening on  http://localhost:3000

I implemented 3 routes:
###### Search by tree - value :inputString
```GET http://localhost:3000/search-tree/:inputString```

###### Simple search - value :inputString
```GET http://localhost:3000/search-simple/:inputString```

###### Upload prefixes file
```POST http://localhost:3000/upload```
provided file "sample_prefixes.txt" included in project, the only to upload new file

#### Test (jest)
``npm run test``