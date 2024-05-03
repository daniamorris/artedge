import * as React from 'react';

export default function Image(props) {
    return (
        <img
        srcSet={`${props.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${props.img}?w=164&h=164&fit=crop&auto=format`}
        alt={props.title}
        loading="lazy"
        />
    );
}