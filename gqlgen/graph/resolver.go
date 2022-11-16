package graph

import "os"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{}

func NewResolver() *Resolver {
	filename := "data/Query.json"
	_, err := os.ReadFile(filename)
	if err != nil {
		panic("Failed to read: " + filename)
	}

	return &Resolver{}
}
