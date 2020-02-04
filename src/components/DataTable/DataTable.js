import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const DataTable = ({ data, properties, deleteRow, updateRow }) => {
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
          {data.map((row, i) => (
            <tr key={i}>
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
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className='delete-icon'
                  />
                </td>
              )}
            </tr> //------ End of the row.
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
  updateRow: PropTypes.func
};

export default DataTable;
