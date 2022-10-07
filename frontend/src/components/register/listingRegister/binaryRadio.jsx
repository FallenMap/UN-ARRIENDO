import { Radio, Grid, Box } from '@mui/material';
import { React, useState } from 'react'


export default function BinaryRadio(props) {
    const [selectedValue, setSelectedValue] = useState(props.startValue);

    const handleChange = (e) => {
        setSelectedValue(e.currentTarget.value);
    }


    const controlProps = (item) => {
        return {
            checked: selectedValue === item,
            onChange: handleChange,
            value: item,
            name: props.name,
            inputProps: { 'aria-label': item }
        }
    };

    return (
        <>
            <Grid item xs={3}>
            <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Radio {...controlProps('true')} />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Radio {...controlProps('false')} />
                </Box>
            </Grid>
        </>
    )
}
