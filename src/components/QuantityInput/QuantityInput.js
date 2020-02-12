import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const QuantityInput = React.forwardRef(
  ({ maxNumber, minNumber, handleAccept, labelText, buttonText }, ref) => {
    // State
    const [relase, setRelase] = useState(false);
    const [value, setValue] = useState('');

    // Ref
    const buttonRef = useRef();

    // When enter is pressed focus the button
    const handleKeyUp = e => {
      if (e.keyCode === 13 && relase) {
        buttonRef.current.focus();
      } else if (!relase) setRelase(true);
    };

    // Validate the input's enter to be a number <= maxNumber existence
    const handleKeyDown = e => {
      const reg = /\d/;
      if (reg.test(e.key)) {
        if (
          // 10 is second paramater for radix rule
          parseInt(e.target.value + e.key, 10) <= maxNumber &&
          parseInt(e.target.value + e.key, 10) >= minNumber
        )
          setValue(e.target.value + e.key);
      } else if (e.keyCode === 8) {
        // KeyCode 8 = Delete button
        setValue(v => v.substr(0, v.length - 1));
      }
    };

    return (
      <div className='quantity-input'>
        <label htmlFor='quantity'>
          {labelText}
          <input
            type='text'
            onKeyUp={handleKeyUp}
            ref={ref}
            onKeyDown={handleKeyDown}
            value={value}
          />
        </label>

        <button
          type='button'
          onClick={() => handleAccept(parseInt(value))}
          ref={buttonRef}
          className='quantity-input_button'
          disabled={value === ''} // If value is empty disable the button
        >
          {buttonText}
        </button>
      </div>
    );
  }
);

QuantityInput.displayName = 'QuantityInput';
QuantityInput.defaultProps = {
  minNumber: 1,
  maxNumber: 100,
  labelText: 'Cantidad',
  buttonText: 'Añadir'
};
QuantityInput.propTypes = {
  minNumber: PropTypes.number,
  maxNumber: PropTypes.number,
  handleAccept: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  buttonText: PropTypes.string
};

export default QuantityInput;
