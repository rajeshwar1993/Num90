import { Prize } from '../../../data_models';
import { FC, useMemo, useState } from 'react';
import { Button, Table, TextInput } from '../../../components';
import { TrashIcon } from '@radix-ui/react-icons';

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
    const data = {
      headers: ['Description', 'Prize Item', '', 'Quantity', ''],
      rows: []
    };

    prizes.forEach(p => {
      let row = {
        id: p.id,
        cells: [
          <TextInput
            id={`${p.id}_desc`}
            name='desc[]'
            defaultValue={p.desc}
            styleClasses='min-w-[200px] md:min-w-[350px]'
            onChange={e => handleUpdate(e.target.value, p.id, 'desc')}
          />,
          <TextInput
            id={`${p.id}_item`}
            name='item[]'
            defaultValue={p.item}
            styleClasses='min-w-[100px]'
            onChange={e => handleUpdate(e.target.value, p.id, 'item')}
          />,
          'x',
          <TextInput
            id={`${p.id}_quantity`}
            name='quantity[]'
            type={'number'}
            defaultValue={p.quantity}
            styleClasses='w-16'
            onChange={e => handleUpdate(e.target.value, p.id, 'quantity')}
          />,
          <Button
            onlyIcon={true}
            solid={true}
            color='error'
            onClick={() => deleteRow(p)}
          >
            <TrashIcon />
          </Button>
        ]
      };
      data.rows.push(row);
    });

    data.rows.push({
      id: 'add',
      cells: [
        <Button solid={true} color='accent' onClick={addNewRow}>
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
      <Table tableData={tableData} />
    </div>
  );
};

export default PrizeEditor;
