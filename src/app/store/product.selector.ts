import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";
import * as fromReducer from './product.reducer';

const getRouteState = createFeatureSelector<ProductState>("products");

export const selectProductState = createSelector(
  getRouteState,
  (state) => state
);

// export const selectProductItems = createSelector(
//   selectProductState,
//   (state) => state.items
// );

export const selectProductItems = createSelector(
    selectProductState,
    fromReducer.selectAll
    // (state) => fromReducer.selectAll(state)
);