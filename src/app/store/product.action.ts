import { createAction, props } from '@ngrx/store';
import { Items } from './product.reducer';

const action = 'product';

export const addProductAction = createAction(`[${action}] add`,
    props<{ input: Items }>()
);

export const deleteProductAction = createAction(`[${action}] delete`,
    props<{ id: number }>()
);

export const updateProductAction = createAction(`[${action}] update`,
    props<{ entry: Items }>()
);

// store.dispatch(addProductAction({
    // label: 'test',
    // quantity: 1
// }))