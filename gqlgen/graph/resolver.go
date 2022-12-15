package graph

import (
	"encoding/json"
	"os"

	"firebase.google.com/go/v4/auth"
	"github.com/richardimaoka/trello-clone/gqlgen/graph/model"
)

// This file will **NOT** be regenerated automatically.
// It serves as dependency injection for your app, add any dependencies you require here.
type Resolver struct {
	client *auth.Client
	query  struct {
		Lists []*model.List `json:"lists"`
	}
}

func NewResolver(client *auth.Client) *Resolver {
	filename := "data/Query.json"
	data, err := os.ReadFile(filename)
	if err != nil {
		panic("Failed to read: " + filename)
	}

	var resolver Resolver
	resolver.client = client
	err = json.Unmarshal(data, &resolver.query)

	return &resolver
}
