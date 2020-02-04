A react Data table to display with a button to execute a function to delete passed throuhgt props.

```jsx
import DataTable from "./DataTable";

const data = [
  { name: "Jhoseph", lastName: "asd", age: 20, id: 0 },
  { name: "Emanuel", lastName: "asd", age: 20, id: 1 },
  { name: "Juan", lastName: "asd", age: 20, id: 2 },
  { name: "Alejandro", lastName: "asd", age: 20, id: 3 }
];

const handleDelete = id => {
  console.log(id);
};

const handleUpdate = id => {
  console.log(id);
};

<DataTable
  data={data}
  properties={["name", "lastName", "age"]}
  deleteRow={handleDelete}
  updateRow={handleUpdate}
/>;
```
