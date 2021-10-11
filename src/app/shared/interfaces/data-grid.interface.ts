export type LoadDataType = 'serverSide' | 'templateSide';

export interface DataGridColumn {

    /** Specifies the identifier of the column. */
    field: string;

    /** Specifies a CSS class to be applied to the column. */
    cssClass?: string;

    /** Specifies a header Caption for the column */
    header?: string;

    /** Specifies expression displayed for the column */
    displayExpr?: string;

    /** Specifies whether the column is visible, that is, occupies space in the table. */
    selected?: boolean;

    /** Specifies a custom template for column cells. */
    cellTemplate?: string;

}

export interface PTableInputs {

    autoLayout?: boolean;

    rowExpandMode?: string;

    scrollable?: boolean;

    scrollHeight?: string;

    virtualScroll?: boolean;

    virtualScrollDelay?: number;

    virtualRowHeight?: number;

    frozenWidth?: string;

    responsive?: boolean;

    contextMenu?: any;

    resizableColumns?: boolean;

    columnResizeMode?: string;

    reorderableColumns?: boolean;

    loading?: boolean;

    loadingIcon?: string;

    showLoader?: boolean;

    rowHover?: boolean;

    customSort?: boolean;

    exportFunction?: any;

    stateKey?: string;

    stateStorage?: string;

    editMode?: string;

    minBufferPx?: number;

    maxBufferPx?: number;

    paginator?: boolean;

}
