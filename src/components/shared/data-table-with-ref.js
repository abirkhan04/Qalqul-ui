import React from 'react';
import { DataTable } from './data-table';

export const DataTableWithRef = React.forwardRef((props, ref) => {
    return <DataTable {...props} forwardedRef={ref} />;
});
