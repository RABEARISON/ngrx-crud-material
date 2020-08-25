import { createReducer, on } from "@ngrx/store";
import {
  addProductAction,
  deleteProductAction,
  updateProductAction,
} from "./product.action";

import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import * as _ from "lodash";

// export const initialState: ProductState = {
//   items: [],
// };

const adapter: EntityAdapter<Items> = createEntityAdapter<Items>({
    selectId: (entry) => entry.id
})

export const initialState: ProductState = adapter.getInitialState({});

export interface Items {
  label: string;
  quantity: number;
  id: number;
}

export interface ProductState extends EntityState<Items>{}

// export const ProductReducer = createReducer(
//   initialState,
//   on(
//     addProductAction,
//     (state, { input }): ProductState => {
//       const items = state.items;
//       return {
//         ...state,
//         items: [...items, input],
//       };
//     }
//   ),
//   on(
//     deleteProductAction,
//     (state, { id }): ProductState => {
//       const items = state.items;
//       return {
//         ...state,
//         items: items.filter((data) => data.id !== id),
//       };
//     }
//   ),
//   on(
//     updateProductAction,
//     (state, { entry }): ProductState => {
//       const items = _.cloneDeep(state.items);
//       const updatedItems = items.map((data) => {
//         if (data.id === entry.id) {
//           return entry;
//         }
//         return data;
//       });

//       return {
//         ...state,
//         items: updatedItems,
//       };
//     }
//   )
// );

export const ProductReducer = createReducer(
    initialState,
    on(
      addProductAction,
      (state, { input }): ProductState => adapter.addOne(input, { ...state })
    ),
    on(
      deleteProductAction,
      (state, { id }): ProductState => adapter.removeOne(id, { ...state })
    ),
    on(
      updateProductAction,
      (state, { entry }): ProductState => adapter.updateOne({ id: entry.id, changes: entry}, { ...state })
    )
);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = adapter.getSelectors(); 