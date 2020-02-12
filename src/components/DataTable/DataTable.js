import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const DataTable = ({ data, properties, deleteRow, updateRow, onClickRow }) => {
  return (
    <div className='div-data-table'>
      <table className='data-table'>
        {/* Head */}
        <thead>
          <tr>
            {/* Create Header of the table and skip the id property */}
            {properties.map(property => {
              if (property === 'id') return null;
              return <th key={property}>{property}</th>;
            })}

            {/* An header spacer if update option is available */}
            {updateRow && <td></td>}

            {/* An header spacer if delete option is available */}
            {deleteRow && <td></td>}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {/* Will create a ROW for every object in data */}
          {data.map(row => (
            <TableData
              key={row.id}
              row={row}
              deleteRow={deleteRow || null}
              updateRow={updateRow || null}
              onClickRow={onClickRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.displayName = 'DataTable';
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  properties: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteRow: PropTypes.func,
  updateRow: PropTypes.func,
  onClickRow: PropTypes.func
};

const TableData = React.memo(
  ({ row, deleteRow, updateRow, onClickRow }) => {
    return (
      <tr onClick={() => onClickRow(row.id)}>
        {/* Will create a COLUMN for every property of the row */}
        {Object.keys(row).map((property, i) => {
          if (property === 'id') return null;
          return <td key={i}>{row[property]}</td>;
        })}

        {/* Create delete button of the row if optios is available. returns id */}
        {updateRow && (
          <td onClick={() => updateRow(row.id)}>
            <FontAwesomeIcon icon={faEdit} className='update-icon' />
          </td>
        )}

        {/* Create update button of the row if optios is available. returns id*/}
        {deleteRow && (
          <td onClick={() => deleteRow(row.id)}>
            <FontAwesomeIcon icon={faTimesCircle} className='delete-icon' />
          </td>
        )}
      </tr>
    );
  },
  (pp, np) => {
    let render = true;
    Object.keys(pp['row']).forEach(key => {
      //console.log(np[key]);

      if (pp['row'][key] !== np['row'][key]) {
        render = false;
        return;
      }
    });
    return render;
  }
);

export default DataTable;
