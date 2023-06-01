import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  tableData: {
    headers: Array<React.ReactNode>;
    rows: Array<{
      id: string;
      mark?: boolean;
      cells: Array<React.ReactNode>;
    }>;
  };
}

const Table: FC<Props> = ({ tableData }) => {
  return (
    <table className='w-full text-sm table-auto text-center text-skin-primary rounded-lg'>
      <thead className='text-xs text-skin-inverted uppercase bg-skin-primary dark:text-gray-400'>
        <tr>
          {tableData.headers.map((header, i) => (
            <th key={i} scope='col' className='px-4 py-2'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map(row => (
          <tr
            key={row.id}
            className={clsx(
              'border-b-4 text-base font-semibold',
              row.mark ? 'bg-red-200' : 'bg-green-100'
            )}
          >
            {row.cells.map((cell, i) => (
              <td key={i} scope='row' className='x-4 py-2'>
                <>{cell}</>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
