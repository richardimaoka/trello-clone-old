#!/bin/sh

tmux new-session -s trello-clone -d
tmux split-window -v -t trello-clone # for client generate
tmux split-window -v -t trello-clone # for client start
tmux split-window -v -t trello-clone # for server generate
tmux split-window -v -t trello-clone # for server start
tmux send-keys -t trello-clone:0.1 '(cd client && npm run generate)' C-m
tmux send-keys -t trello-clone:0.2 '(cd client && npm start)' C-m
tmux send-keys -t trello-clone:0.3 '(cd server && npm run generate)' C-m
tmux send-keys -t trello-clone:0.4 '(cd server && npm start)' C-m