import { Prize } from '../../../data_models';
import { FC, useMemo } from 'react';
import { TableView } from '../../../components';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { TableRow } from '@/components/Table';
import { Input } from '@/components/ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
  prizes: Prize[];
  addNewRow: () => void;
  deleteRow: (delP: Prize) => void;
  handleUpdate: (
    value: any,
    id: string,
    key: 'desc' | 'item' | 'quantity'
  ) => void;
}

const PrizeEditor: FC<Props> = ({
  prizes,
  addNewRow,
  deleteRow,
  handleUpdate
}) => {
  const tableData = useMemo(() => {
    const data: { headers: string[]; rows: TableRow[] } = {
      headers: ['Description', 'Prize Item', '', 'Quantity', ''],
      rows: []
    };

    prizes.forEach(p => {
      let row = {
        id: p.id,
        cells: [
          <Input
            required
            id={`${p.id}_desc`}
            key={`${p.id}_desc`}
            name='desc[]'
            defaultValue={p.desc}
            className='min-w-[200px] md:min-w-[350px]'
            onChange={e => handleUpdate(e.target.value, p.id, 'desc')}
          />,
          <Input
            required
            id={`${p.id}_item`}
            key={`${p.id}_item`}
            name='item[]'
            defaultValue={p.item}
            className='min-w-[100px]'
            onChange={e => handleUpdate(e.target.value, p.id, 'item')}
          />,
          <Cross2Icon key={`${p.id}_cross`} height={20} width={20} />,
          <Input
            required
            id={`${p.id}_quantity`}
            key={`${p.id}_quantity`}
            name='quantity[]'
            defaultValue={p.quantity}
            className='w-16'
            onChange={e => handleUpdate(e.target.value, p.id, 'quantity')}
          />,
          <Button key={`${p.id}_del`} onClick={() => deleteRow(p)}>
            <TrashIcon />
          </Button>
        ]
      };
      data.rows.push(row);
    });

    data.rows.push({
      id: 'add',
      cells: [
        <Button key={`add`} onClick={addNewRow}>
          Add New Row
        </Button>,
        '',
        '',
        '',
        ''
      ]
    });

    return data;
  }, [prizes]);

  return (
    <div className='overflow-x-auto'>
      <TableView tableData={tableData} />
    </div>
  );
};

export default PrizeEditor;
