import classes from './dataGrid.css';
import React  from 'react';
import { Column, useTable } from 'react-table';
import { Table, TableHeader, TableBody, TableCell, Button } from 'semantic-ui-react';

type TButton = {
    type: string,
    onClick: any,
    isSubmitting: boolean,
    label: string
}
interface IGridProps {
    columns: Column<any>[],
    items: any[],
    title: string,
    buttons?: TButton[],
    isSubmitting? : boolean
}



const DataGrid = (props: IGridProps) => {
    const {  items, columns, title, buttons, isSubmitting } = props;
    const tableProps = useTable({ columns, data: items });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableProps;

    return (
        <div className={classes.root}>
            <div className={classes.headerActions}>
                <div className={classes.info}>
                    <div className={classes.titleField}>
                        <h1 className={classes.title}>{title}</h1>
                    </div>
                </div>
                <div className={classes.actions}>
                    {
                        buttons.map((e, i) => {
                            return  <Button
                                        key={i}
                                        primary
                                        onClick={e.onClick}
                                        disabled={e.isSubmitting}
                                    >
                                        {e.label}
                                    </Button>
                        })
                    }
                </div>
            </div>
            <Table {...getTableProps()}>
                <TableHeader >
                        {
                            headerGroups.map(headerGroup => (
                                <Table.Row {...headerGroup.getHeaderGroupProps()} className={classes.header}>
                                    {
                                        headerGroup.headers.map(header => (
                                            <TableCell {...header.getHeaderProps()}>
                                                {header.render('Header')}
                                            </TableCell>
                                        ))
                                    }
                                </Table.Row>
                            ))
                        }
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <Table.Row  {...row.getRowProps()} className={classes.rowItem}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </Table.Row>
                            )
                            
                        })
                    }
                </TableBody>
            </Table>
        </div>
        
    )
}

export default DataGrid;