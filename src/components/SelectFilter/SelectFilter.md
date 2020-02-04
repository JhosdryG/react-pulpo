A react Select component that filter the result with the input's text.

```jsx
import SelectFilter from "./SelectFilter";
import React, { useState } from "react";

const ListComponent = ({
  data: { name, id }, // where data correspond to the object's info of this item
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

  return (
    <li // we hardly suggest to wrap your item within a <li> tag
      className={current ? "current" : null} //it's critical to add this line exactly like this
      onMouseEnter={handleMouseEnter} // this line too
      onClick={handleOnClick} // and also this one
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {/* You can build you components however you want!!
              There is not restrictions  */}
      <span>nombre: {name}</span>
      <span>id: {id}</span>
    </li>
  );
};

const data = [
  { name: "Jhoseph", id: 0 },
  { name: "Emanuel", id: 1 },
  { name: "Juan", id: 2 },
  { name: "Alejandro", id: 3 }
];

const handleClick = i => {
  console.log(i);
};

const handleChange = () => {
  console.log("i changed");
};

<SelectFilter
  data={data}
  filter="name"
  ListComponent={ListComponent}
  onSelect={handleClick}
  onChange={handleChange}
  placeholder="Ingrese nombre"
/>;
```
