#!/usr/bin/env python

# 10 center
# 25 nodes per center

count = 0
nodes = ""
links = ""
for c in range(1,100):
    center = count
    nodes += '{{ "name": "center{}", "group": {}}},'.format(center, 1)
    count+=1
    for n in range(1,25):
        nodes += '{{ "name": "node{}", "group": {}}},'.format(count, 2)
        links += '{{"target": {}, "source": {}}},'.format(count, center)
        count+=1
# chop
nodes = nodes[:-1]
links = links[:-1]

print('{{ "nodes": [ {} ], "links": [ {} ]}}'.format(nodes, links))
