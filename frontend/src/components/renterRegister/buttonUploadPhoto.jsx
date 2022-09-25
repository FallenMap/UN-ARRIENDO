import React from 'react'
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function ButtonUploadPhoto(props) {
    return (
        <>
            <label className="cols-sm-2 control-label">
                Upload your photo
            </label>
            <Button sx={{
                width: "100%",
                backgroundColor: "#ffc312",
            }} variant="contained" component="label">
                <CameraAltIcon />
                <input name={props.name} hidden accept="image/*" multiple type="file" />
            </Button>
        </>
    )
}
