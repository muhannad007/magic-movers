# magic-movers  

## Introduction  
Welcome to Magic Transporters, the future of moving things easily. These super cool transporters, powered by virtual magic, are here to make shipping stuff a breeze.  

## Overview  
In the world of Magic Transporters, there are special people known as Magic Movers. They use nifty gadgets to move important things. Fueled by virtual magic, these Movers go on quick missions to carry items around.  
A Magic Mover has:  
• Weight limit (the most they can carry);  
• Energy (their total magic power);  
• Quest state (what they’re currently doing: resting, loading, on a mission, or done).  
Each Magic Item they carry has:  
• Name (what it’s called);  
• Weight (how much magic power it needs);  

## How to run this API  
- Download zip file
- Extract files in a folder
- Open cmd in that folder
- Run:  
  $ npm install
- Run:  
  $ npm run dev  
it will run on localhost port 3000 so the uri would be: "localhost:3000/"  

## Endpoints  
- To add magic movers you can send a post request to: "/add_mover"  the body would be a json containing: {first_name, last_name, email, password, weight_limit, energy, quest_state}
- To add magic items you can send a post request to: "/add_item"  the body would be a json containing: {item_name, item_weight}
- To load a magic mover with magic items you can send a post request to: "/add_load"  the body would be like: {items, mover_id, carry_weight, weight_limit}
- To start a mission you can send a post request to: "/add_mission"  with a body of: {title, state, mover_id}
