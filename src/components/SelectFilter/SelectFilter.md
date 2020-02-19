A react Select component that filter the result with the input's text.

```jsx
import SelectFilter from './SelectFilter';
import React, { useState } from 'react';

const ListComponent = React.memo(
  ({
    data: { name, id, disable }, // where data correspond to the object's info of this item
    current, // whether this item is currently “hovered”
    onMouseEnter,
    onClick,
    index
  }) => {
    // both function are necessary to handle mouse hover and
    // click effect on the item. Just put those functions in
    // your listComponent. Remember to destructure onMouseEnter,
    // onClick and index props as is done above.
    const handleMouseEnter = () => {
      onMouseEnter(index);
    };

    const handleOnClick = () => {
      onClick(index);
    };

    console.log('renderize', id);

    return (
      <li // we hardly suggest to wrap your item within a <li> tag
        className={current ? 'current' : null} //it's critical to add this line exactly like this
        onMouseEnter={handleMouseEnter} // this line too
        onClick={handleOnClick} // and also this one
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {/* You can build you components however you want!!
              There is not restrictions  */}
        <span>nombre: {name}</span>
        <span>id: {id}</span>
        <span>{disable ? 'desactivado' : 'activado'}</span>
      </li>
    );
  },
  (pp, np) => {
    let render = true;
    if (pp.current !== np.current) render = false;

    Object.keys(pp['data']).forEach(key => {
      if (pp['data'][key] !== np['data'][key]) {
        render = false;
        return;
      }
    });
    return render;
  }
);

const data = [
  { name: 'Jhoseph', id: 0 },
  { name: 'Emanuel', id: 1 },
  { name: 'Juan', id: 2 },
  { name: 'Alejandro', id: 3 },
  { name: 'Jhoseph', id: 4 },
  { name: 'Emanuel', id: 5 },
  { name: 'Juan', id: 6 },
  { name: 'Alejandro', id: 7 },
  { name: 'Jhoseph', id: 8 },
  { name: 'Emanuel', id: 9 },
  { name: 'Juan', id: 10 },
  { name: 'Juan', id: 12 },
  { name: 'Juan', id: 13 },
  { name: 'Juan', id: 14 },
  { name: 'Juan', id: 15 },
  { name: 'Juan', id: 16 },
  { name: 'Juan', id: 17 },
  { name: 'Juan', id: 18 },
  { name: 'Juan', id: 19 },
  { name: 'Juan', id: 20 },
  { name: 'Juan', id: 21 },
  { name: 'Juan', id: 22 },
  { name: 'Juan', id: 23 },
  { name: 'Juan', id: 24 },
  { name: 'Juan', id: 25 },
  { name: 'Juan', id: 26 },
  { name: 'Juan', id: 27 },
  { name: 'Juan', id: 29 },
  { name: 'Juan', id: 28 },
  { name: 'Juan', id: 30 },
  { name: 'Alejandro', id: 11 }
];

const handleClick = i => {
  console.log(i);
};

const handleChange = () => {
  console.log('i changed');
};

const disableFunc = item => item.id % 2 === 0;

<SelectFilter
  data={data}
  filter='name'
  ListComponent={ListComponent}
  onSelect={handleClick}
  onChange={handleChange}
  placeholder='Ingrese nombre'
  disableFunc={disableFunc}
  style={{ inputPlaceHolder: 'red' }}
/>;
```
