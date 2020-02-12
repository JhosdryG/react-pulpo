A react Data table to display with a button to execute a function to delete passed throuhgt props.

```jsx
import DataTable from './DataTable';
import { useState } from 'react';

const [data, setData] = useState([
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 0 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 1 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 2 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 3 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 4 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 5 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 6 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 7 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 8 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 9 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 10 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 11 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 12 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 13 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 14 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 15 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 16 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 17 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 18 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 319 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 20 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 21 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 22 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 23 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 24 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 25 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 26 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 27 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 28 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 29 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 30 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 31 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 32 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 33 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 34 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 35 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 36 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 37 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 38 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 39 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 40 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 41 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 42 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 43 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 44 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 45 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 46 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 47 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 48 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 49 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 50 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 51 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 52 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 53 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 54 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 55 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 56 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 57 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 58 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 59 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 60 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 61 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 62 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 63 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 64 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 65 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 66 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 67 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 68 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 69 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 70 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 71 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 72 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 73 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 74 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 75 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 76 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 77 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 78 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 79 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 80 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 81 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 82 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 83 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 84 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 85 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 86 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 87 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 88 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 89 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 90 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 91 },
  { name: 'Jhoseph', lastName: 'asd', age: 20, id: 92 },
  { name: 'Emanuel', lastName: 'asd', age: 20, id: 93 },
  { name: 'Juan', lastName: 'asd', age: 21, id: 94 },
  { name: 'Alejandro', lastName: 'asd', age: 20, id: 95 }
]);

const handleDelete = id => {
  console.log(id);
};

const handleUpdate = id => {
  console.log(id);
};

const jhoseph = () => {
  const asd = data.map(person => {
    //console.log({ ...person, age: person.age + 1 });
    if (person.id === 0) return { ...person, age: person.age + 1 };
    else return person;
  });
  setData(asd);
};

const add = () => {
  setData(e => [
    ...e,
    { name: 'Gerson', lastName: 'asd', age: 20, id: Date.now() }
  ]);
};

const onClickRow = id => {
  console.log(id);
};

<>
  <DataTable
    data={data}
    properties={['name', 'lastName', 'age']}
    deleteRow={handleDelete}
    updateRow={handleUpdate}
    onClickRow={onClickRow}
  />
  <button onClick={jhoseph}>Jhoseph</button>
  <button onClick={add}>Add</button>
  <button>Juan</button>
  <button>Alejandro</button>
</>;
```
