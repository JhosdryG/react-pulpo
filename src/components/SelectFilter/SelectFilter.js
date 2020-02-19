import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* Styling main div */
const StyleSelectFilter = styled.div.attrs(props => {
  const style = { ...props.style };

  let styles = {
    divMargin: style.divMargin || '10px 10px 0 10px',
    divWidth: style.divWidth || '300px',
    divFont: style.divFont || "'Arial', Sans-Serif",
    divOthers: style.divOthers || '',

    /*Input Styles*/
    inputPadding: style.inputPadding || '8px',
    inputFontSize: style.inputFontSize || '1rem',
    inputColor: style.inputColor || 'rgb(60,60,60)',
    inputBorderTop: style.inputBorderTop || 'none',
    inputBorderLeft: style.inputBorderLeft || 'none',
    inputBorderBot: style.inputBorderBot || '3px solid #66d0dd',
    inputBorderRight: style.inputBorderRight || 'none',
    inputOutline: style.inputOutline || '#66d0dd auto 3px',
    inputBackground: style.inputBackground || 'fff',
    inputShadow: style.inputShadow || '0 0 5px rgba(0,0,0,.3)',
    inputPlaceHolder: style.inputPlaceHolder || 'auto',
    inputOthers: style.inputOthers || '',

    /*List Styles*/
    listBorder: style.listBorder || '2px solid #66d0dd',
    listBorderRound: style.listBorderRound ? '0 0 8px 8px' : '0 0 0 0',
    listOthers: style.listOthers || '',

    /*Items Styles*/
    itemPadding: style.itemPadding || '10px',
    itemBackground: style.itemBackground || '#fff',
    itemColor: style.itemColor || 'rgb(60,60,60)',
    itemOthers: style.itemOthers || '',

    /*Current Item styles*/
    currentBackground: style.currentBackground || '#66d0dd',
    currentColor: style.currentColor || '#fff',
    currentFontWeight: style.currentFontWeight || 'bold',
    currentFontSize: style.currentFontSize || '1.1rem',
    currentOthers: style.currentOthers || '',

    /*No match*/
    noMatchColor: style.noMatchColor || 'rgb(180,180,180)',
    noMatchOthers: style.noMatchOthers || ''
  };

  return { style: { ...styles } };
})`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${p => p.style.divMargin};
  width: ${p => p.style.divWidth};
  font-family: ${p => p.style.divFont};

  & > [type='text'] {
    box-sizing: border-box;
    padding: ${p => p.style.inputPadding};
    font-size: ${p => p.style.inputFontSize};
    color: ${p => p.style.inputColor};
    width: 100%;
    border: none;
    border-top: ${p => p.style.inputBorderTop};
    border-left: ${p => p.style.inputBorderLeft};
    border-bottom: ${p => p.style.inputBorderBot};
    border-right: ${p => p.style.inputBorderRight};
    outline: ${p => p.style.inputOutline};
    background-color: ${p => p.style.inputBackground};
    box-shadow: ${p => p.style.inputShadow};
    z-index: 2;
    ${p => p.style.inputOthers};

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${p => p.style.inputPlaceHolder};
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${p => p.style.inputPlaceHolder};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${p => p.style.inputPlaceHolder};
    }
  }

  & .filter {
    position: relative;
    width: 100%;
    box-sizing: border-box;

    & > ul {
      box-sizing: border-box;
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 200px;
      border: ${p => p.style.listBorder};
      border-top: none;
      border-radius: ${p => p.style.listBorderRound};
      box-shadow: ${p => p.style.inputShadow};
      overflow: auto;
      z-index: 1;
      ${p => p.style.listOthers};

      & > li {
        box-sizing: border-box;
        cursor: pointer;
        padding: ${p => p.style.itemPadding};
        background-color: ${p => p.style.itemBackground};
        color: ${p => p.style.itemColor};
        width: 100%;
        ${p => p.style.itemOthers}

        &:first-child {
          padding-top: ${p =>
            parseInt(p.style.itemPadding.replace('px', '')) + 20}px;
        }

        &:last-child {
          border-radius: ${p => p.style.listBorderRound};
        }

        &.current {
          background-color: ${p => p.style.currentBackground};
          color: ${p => p.style.currentColor};
          font-weight: ${p => p.style.currentFontWeight};
          font-size: ${p => p.style.currentFontSize};
          ${p => p.style.currentOthers}
        }
      }

      & > .no-match {
        box-sizing: border-box;
        width: 100%;
        color: ${p => p.style.noMatchColor};
        ${p => p.style.noMatchOthers}
      }
    }
  }
`;

const SelectFilter = React.forwardRef(
  (
    {
      data,
      filter,
      ListComponent,
      onSelect,
      onChange,
      showAtOnce,
      placeholder,
      noMatchMessage,
      style,
      setOptions,
      disableFunc
    },
    ref
  ) => {
    // State
    const [list, setList] = useState(data);
    const [currentItem, setCurrentItem] = useState(0);
    const [value, setValue] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);

    //Ref of the <ul> tag
    const listRef = useRef(null);

    useEffect(() => {
      if (disableFunc) {
        const newData = data.map(item => ({
          ...item,
          disable: disableFunc(item)
        }));
        setList(newData);
      } else {
        setList(data);
      }
    }, [data, disableFunc]);

    useEffect(() => {
      if (setOptions) {
        setOptions({
          clean() {
            setValue('');
            setCurrentItem(0);
            setHasSelected(false);
          }
        });
      }
    }, [setOptions]);

    // this function filters the list each time the value changes.
    useEffect(() => {
      if (!hasSelected) {
        // Aditional validation to avoid white spaces
        if (value.length === 1 && value.charAt(0) === ' ') {
          setValue('');
          return;
        }

        let newFilteredList = [];

        // if showAtOnce is true it will display all the list
        // even if the input is empty
        if ((value === '' && showAtOnce) || value !== '') {
          const specialCharactersReg = /\W/gi; // Will match all special characters
          let regexString = `^${value.toLowerCase().trim()}`; // Create a string with "value" to be use to filter the list
          let matchArray; //Will contain each special character´s match
          let replacedValues = []; //Will save the special characters that have been replaced

          // Puts a "\" char before a special character in regexString to make them literal
          while ((matchArray = specialCharactersReg.exec(value)) !== null) {
            if (!replacedValues.includes(matchArray[0])) {
              regexString = regexString.replace(
                RegExp(`\\${matchArray[0]}`, 'gi'), // replace the current special character in all the text
                `\\${matchArray[0]}`
              );
              replacedValues.push(matchArray[0]);
            }
          }

          //Filter the list with the items that match
          newFilteredList = list.filter(item => {
            const regex = new RegExp(regexString);
            return regex.test(item[filter].toLowerCase().trim());
          });
        }
        setFilteredList(newFilteredList);
        if (listRef.current) listRef.current.scroll(0, 0);
      }
    }, [value, list, showAtOnce, filter, hasSelected]);

    // KeyDown events
    const handleKeyDown = e => {
      if (e.keyCode === 38) {
        //Key Up
        e.preventDefault();
        if (currentItem > 0) {
          setCurrentItem(p => p - 1);
          // Moves scroll up with keyboard
          document
            .querySelector('.filter > ul > .current')
            .scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
      } else if (
        e.keyCode === 40 &&
        currentItem < filteredList.length - 1 &&
        (value !== '' || showAtOnce) &&
        !hasSelected
      ) {
        //Key down
        e.preventDefault();
        setCurrentItem(p => p + 1);
        // Moves scroll down with keyboard
        document
          .querySelector('.filter > ul > .current')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      } else if (e.keyCode === 32) {
        //Prevent white spaces at the begining of the text or doublw white spaces
        if (value.length === 0 || value.endsWith(' ')) {
          e.preventDefault();
        }
      } else if (e.keyCode === 13) {
        //On select an item
        //if no item is selected it will do nothing
        handleOnSelect(currentItem);
      }
    };

    //Runs whenever the input value changes
    const handleOnChange = e => {
      setValue(e.target.value);
      setCurrentItem(0);
      setHasSelected(false);
      if (onChange) onChange();
    };

    // Display a hover effect on the list's items
    const handleOnMouseEnter = e => {
      setCurrentItem(e);
    };

    // Selects the item when is clicked
    const handleOnClickItem = e => {
      handleOnSelect(currentItem);
    };

    // This func runs when a item is selected, it sends the item object to its parent
    const handleOnSelect = i => {
      if (filteredList[i]) {
        if (!filteredList[i].disable) {
          onSelect(filteredList[i]);
          setValue(filteredList[i][filter]);
          setFilteredList([]);
          setCurrentItem(0);
          setHasSelected(true);
        }
      }
    };

    return (
      <StyleSelectFilter style={style}>
        <input
          type='text'
          spellCheck='false'
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          value={value}
          ref={ref}
        />
        {(value.length > 0 || showAtOnce) && !hasSelected && (
          <div className='filter'>
            <ul ref={listRef}>
              {!hasSelected &&
                filteredList.map((item, i) => (
                  <ListComponent
                    key={i}
                    index={i}
                    current={currentItem === i}
                    data={item}
                    onMouseEnter={handleOnMouseEnter}
                    onClick={handleOnClickItem}
                  />
                ))}
              {filteredList.length === 0 &&
                value.length > 0 &&
                !hasSelected && <li className='no-match'>{noMatchMessage}</li>}
            </ul>
          </div>
        )}
      </StyleSelectFilter>
    );
  }
);

SelectFilter.displayName = 'SelectFilter';

SelectFilter.defaultProps = {
  showAtOnce: false,
  placeholder: '',
  noMatchMessage: 'No se han encontrado resultados'
};

SelectFilter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  ListComponent: PropTypes.any.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  showAtOnce: PropTypes.bool,
  placeholder: PropTypes.string,
  noMatchMessage: PropTypes.string,
  style: PropTypes.object,
  setOptions: PropTypes.func,
  disableFunc: PropTypes.func
};

export default SelectFilter;
