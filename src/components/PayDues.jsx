import React from 'react'
import styled from 'styled-components'
import { useMarkPaidMutation } from '../services/usersApi'

const PayDues = ({ checked }) => {
    const [markPaid] = useMarkPaidMutation()

    const handlePaid = async() => {
        // await markPaid(user.id)
        if(checked) {
            console.log('paid')
        }
    }

    return (
        <DuesBtn onClick={handlePaid}>
            <h1>PAY DUES</h1>
        </DuesBtn>
    )
}

const DuesBtn = styled.div`
    background: #6D5BD0;
    border-radius: 6px;
    width: 99px;
    padding:10px;
    cursor: pointer;

    h1 {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF !important;
    }
`

export default PayDues
