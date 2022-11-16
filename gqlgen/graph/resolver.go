package graph

import (
	"encoding/json"
	"os"

	"github.com/richardimaoka/trello-clone/gqlgen/graph/model"
)

// This file will not be regenerated automatically.
// It serves as dependency injection for your app, add any dependencies you require here.
type Resolver struct {
	query struct {
		Cards []*model.List `json:"lists"`
	}
}

func NewResolver() *Resolver {
	filename := "data/Query.json"
	data, err := os.ReadFile(filename)
	if err != nil {
		panic("Failed to read: " + filename)
	}

	var resolver Resolver
	err = json.Unmarshal(data, &resolver.query)

	return &resolver
}
