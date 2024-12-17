import React from 'react';

interface Button {
  text: string;
  link: string;
}

interface Row {
  id: number;
  buttons: Button[];
}

interface ButtonsProps {
  content: string;
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

export default function Buttons({ rows, setRows }: ButtonsProps) {
  const maxRows = 4;
  const maxButtonsPerRow = 3;

  const addRow = () => {
    if (rows.length < maxRows) {
      const id = rows.length;   
      setRows([...rows, { id, buttons: [] }]);
    }
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const addButton = (rowId: number) => {
    setRows(
      rows.map((row) =>
        row.id === rowId && row.buttons.length < maxButtonsPerRow
          ? { ...row, buttons: [...row.buttons, { text: '', link: '' }] }
          : row
      )
    );
  };

  const deleteButton = (rowId: number, index: number) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              buttons: row.buttons.filter((_, i) => i !== index),
            }
          : row
      )
    );
  };

  const handleChange = (
    rowId: number,
    index: number,
    field: keyof Button,
    value: string
  ) => {
    setRows(
      rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              buttons: row.buttons.map((button, i) =>
                i === index ? { ...button, [field]: value } : button
              ),
            }
          : row
      )
    );
  };

  return (
    <div className="buttonWindow">
      <h3>Кнопки</h3>
      {rows.map((row) => (
        <div key={row.id} className="row">
          <span>Строка {row.id + 1}</span> {/* Directly use row.id to show row index */}
          <button onClick={() => deleteRow(row.id)}>Удалить строку</button>
          {row.buttons.map((button, index) => (
            <div key={index} className="buttonGroup">
              <input
                type="text"
                placeholder="Текст"
                value={button.text}
                onChange={(e) => handleChange(row.id, index, 'text', e.target.value)}
              />
              <input
                type="text"
                placeholder="Ссылка"
                value={button.link}
                onChange={(e) => handleChange(row.id, index, 'link', e.target.value)}
              />
              <button onClick={() => deleteButton(row.id, index)}>X</button>
            </div>
          ))}
          {row.buttons.length < maxButtonsPerRow && (
            <button onClick={() => addButton(row.id)}>Добавить кнопку</button>
          )}
        </div>
      ))}
      {rows.length < maxRows && <button onClick={addRow}>Добавить строку</button>}
    </div>
  );
}
