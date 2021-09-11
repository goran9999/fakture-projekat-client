import React from 'react'
import { useParams } from 'react-router'

interface Props {

}

const FakturaDetaljiPage = (props: Props) => {

    const { brojFakture } = useParams<{ brojFakture: string }>();



    return (
        <div>

        </div>
    )
}

export default FakturaDetaljiPage
