import clsx from 'clsx';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

export interface TableRow {
  id: string;
  mark?: boolean;
  cells: Array<React.ReactNode>;
}

interface Props {
  tableData: {
    headers: Array<React.ReactNode>;
    rows: Array<TableRow>;
  };
}

const TableView: FC<Props> = ({ tableData }) => {
  return (
    <Table className='border'>
      <TableCaption>* disclaimer on the prizes</TableCaption>
      <TableHeader>
        <TableRow>
          {tableData.headers.map((header, i) => (
            <TableHead key={i} scope='col' className='px-4 py-2'>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.rows.map(row => (
          <TableRow
            key={row.id}
            className={clsx('font-semibold', row.mark && 'bg-red-200')}
          >
            {row.cells.map((cell, i) => (
              <TableCell key={i} scope='row' className='x-4 py-2'>
                <>{cell}</>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
