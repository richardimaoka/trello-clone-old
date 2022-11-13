#!/bin/sh

PWD=$(pwd)
SESSION=$(basename "$PWD")

tmux new-session -s "$SESSION" -d

# tmux split-window -v -t "$SESSION" # for client generate
# tmux select-layout even-vertical   # to avoid 'no space for new pane' 
tmux split-window -v -t "$SESSION" # for client start
tmux select-layout even-vertical   # to avoid 'no space for new pane' 
tmux split-window -v -t "$SESSION" # for server generate
tmux select-layout even-vertical   # to avoid 'no space for new pane' 
tmux split-window -v -t "$SESSION" # for server start
tmux select-layout even-vertical   # to avoid 'no space for new pane' 

tmux send-keys -t "$SESSION:0.0" '(cd client && npm run generate)' C-m
tmux send-keys -t "$SESSION:0.1" '(cd client && npm start)' C-m
tmux send-keys -t "$SESSION:0.2" '(cd server && npm run generate)' C-m
tmux send-keys -t "$SESSION:0.3" '(cd server && npm start)' C-m

tmux attach -t "$SESSION"
