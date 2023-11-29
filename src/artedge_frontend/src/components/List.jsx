import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import data from "../data/ImageData.json";

function List(props) {

    function clickedImage(){
        console.log("I clicked the image")
    }

    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.title.toLowerCase().includes(props.input)
        }
    })

    return (
        <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={164}>
            {filteredData.map((item) => (
                <ImageListItem key={item.img} onClick={clickedImage}>
                <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
        ))}
        </ImageList>
    )
}

export default List