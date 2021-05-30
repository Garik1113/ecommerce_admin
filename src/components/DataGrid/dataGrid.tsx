import classes from './dataGrid.css';
import React, { useCallback, useMemo }  from 'react';
import { Column, useTable } from 'react-table';
import { Table, TableHeader, TableBody, TableCell, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { useConfig } from 'src/talons/Config/useConfig';

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
    isSubmitting? : boolean,
    totals?: any,
    queryParams?: any
}



const DataGrid = (props: IGridProps) => {
    const {  items, columns, title, buttons, isSubmitting, totals, queryParams } = props;
    const tableProps = useTable({ columns, data: items });
    const { getConfigValue } = useConfig();

    const pageSize = useMemo(() => {
        const productsPerPage = getConfigValue("productsPerPage");
        if (typeof productsPerPage !== "number") {
            return 8
        } else {
            return productsPerPage || 8
        }
        
    }, [getConfigValue]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableProps;
    const pages = Math.ceil(Number(totals || 0) / pageSize);
    const pagination = new Array(pages);
    const history = useHistory();
    const updateQueryStringParameter = useCallback((uri:string, key:string, value:string):string => {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
          return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
          return uri + separator + key + "=" + value;
        }
    }, []);
    const addQueryString = useCallback((key:string, value: string) => {
        if(key == "date") {
            const withoutPage = updateQueryStringParameter(history.location.search, "page", "0");
            const newUrl =  updateQueryStringParameter(withoutPage, "date", value);
            history.push(newUrl)
        } else {
            const url: string = updateQueryStringParameter(history.location.search, key, value);
            history.push(url)
        }
        
    }, [history]);
    
    return (
        <div className={classes.root}>
             <div className={classes.pagination}>
                        {
                            pagination.fill(0).map((e, i) => {
                                return (
                                    <div 
                                        className={`${classes.paginationItem} ${queryParams && queryParams["?page"] == i && classes.selected }`} 
                                        onClick={() => addQueryString("page", String(i))}>
                                        {i}
                                    </div>
                                )
                            })
                        }
                </div> 
            <div className={classes.headerActions}>
                {/* <div className={classes.header}> */}
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
                {/* </div> */}
               
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