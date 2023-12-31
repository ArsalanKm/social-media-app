import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};


export default function TagMultiSelect({ tags, onclick }) {
   const [personName, setPersonName] = React.useState([]);

   const handleChange = (event) => {
      const {
         target: { value },
      } = event;
      setPersonName(typeof value === 'string' ? value.split(',') : value);
   };

   return (
      <div>
         <FormControl sx={{ m: 1, width: 150 }}>
            <InputLabel id='demo-multiple-name-label'>دسته بندی</InputLabel>
            <Select
               labelId='demo-multiple-name-label'
               id='demo-multiple-name'
               multiple
               value={personName}
               onChange={handleChange}
               input={<OutlinedInput label='تگ' />}
               MenuProps={MenuProps}

            >
               {tags.map((el) => (
                  <MenuItem
                     key={el._id}
                     onClick={() => {
                        onclick(el);
                     }}
                     value={el.name}
                  >
                     {el.name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   );
}
