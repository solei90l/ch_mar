
export class DataGridOptions {

    public header: {
        showHeaderBloc: boolean;
        showTitle: boolean;
        enableHeaderTemplate: boolean;
    };

    public toolBarGrid: {
        enabletoolBarTemplate: boolean;
        search: {
            showSearchField: boolean;
            placeholder: string;
            filterGlobal: string;
        }
    };

    public rows: {
        showIndexRow: boolean,
    };

    public actionRow: {
        showActionRow: boolean;
    };

    constructor() {

        this.header = {
            enableHeaderTemplate: false,
            showHeaderBloc: true,
            showTitle: true,
        };

        this.toolBarGrid = {
            enabletoolBarTemplate: false,
            search: {
                filterGlobal: 'contains',
                placeholder: 'hints.search',
                showSearchField: true,

            },
        };
        this.rows = {
            showIndexRow: false,
        };

        this.actionRow = {
            showActionRow: true,
        };
    }
}
