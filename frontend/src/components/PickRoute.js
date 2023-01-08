import React from 'react';
import { useParams } from 'react-router-dom';

export default function PickRoute() {
    const {form} = useParams();
    console.log(form)
    return (
        <div>PickRoute</div>
    )
}
