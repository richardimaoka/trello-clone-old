package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/richardimaoka/trello-clone/gqlgen/graph/generated"
	"github.com/richardimaoka/trello-clone/gqlgen/graph/model"
)

// MoveCardToEmptyList is the resolver for the moveCardToEmptyList field.
func (r *mutationResolver) MoveCardToEmptyList(ctx context.Context, fromListID string, toListID string, cardID string) (*int, error) {
	panic(fmt.Errorf("not implemented: MoveCardToEmptyList - moveCardToEmptyList"))
}

// MoveCardToTailOfList is the resolver for the moveCardToTailOfList field.
func (r *mutationResolver) MoveCardToTailOfList(ctx context.Context, fromListID string, toListID string, cardID string) (*int, error) {
	panic(fmt.Errorf("not implemented: MoveCardToTailOfList - moveCardToTailOfList"))
}

// AddCardToList is the resolver for the addCardToList field.
func (r *mutationResolver) AddCardToList(ctx context.Context, listID string, card model.CardInput) (*int, error) {
	panic(fmt.Errorf("not implemented: AddCardToList - addCardToList"))
}

// SwapCardsWithinList is the resolver for the swapCardsWithinList field.
func (r *mutationResolver) SwapCardsWithinList(ctx context.Context, listID string, card1Id string, card2Id string) (*int, error) {
	panic(fmt.Errorf("not implemented: SwapCardsWithinList - swapCardsWithinList"))
}

// SwapCardsBetweenLists is the resolver for the swapCardsBetweenLists field.
func (r *mutationResolver) SwapCardsBetweenLists(ctx context.Context, list1Id string, list2Id string, card1Id string, card2Id string) (*int, error) {
	panic(fmt.Errorf("not implemented: SwapCardsBetweenLists - swapCardsBetweenLists"))
}

// SwapLists is the resolver for the swapLists field.
func (r *mutationResolver) SwapLists(ctx context.Context, list1Id string, list2Id string) (*int, error) {
	panic(fmt.Errorf("not implemented: SwapLists - swapLists"))
}

// Lists is the resolver for the lists field.
func (r *queryResolver) Lists(ctx context.Context) ([]*model.List, error) {
	return r.query.Lists, nil
}

// Card is the resolver for the card field.
func (r *queryResolver) Card(ctx context.Context, id string) (*model.Card, error) {
	panic(fmt.Errorf("not implemented: Card - card"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
