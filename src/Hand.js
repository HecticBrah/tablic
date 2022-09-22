import React, { useState } from 'react';
import { TextField } from '@mui/material';

function Hand() {
    return (
        <div>
            <TextField id="outlined-basic" type="number" variant="outlined" inputProps={{ min: 0, max: 25 }} size="small" />
            <TextField id="outlined-basic" type="number" variant="outlined" inputProps={{ min: 0, max: 25 }} size="small" />
        </div>
    );
}

export default Hand;
