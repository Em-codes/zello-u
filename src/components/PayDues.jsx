import React from 'react'
import styled from 'styled-components'
import { useMarkPaidMutation } from '../services/usersApi'
import { useGetUsersQuery } from '../services/usersApi'
import { ToastContainer, toast } from 'react-toastify';



const PayDues = ({ checked, listItem }) => {
    const { refetch } = useGetUsersQuery()
    const [markPaid] = useMarkPaidMutation()
    const noUserAlert = () => toast(`No User Selected`)
    const alertPaid = (el) => toast(`${el} has paid`)

    function handlePaid() {
        const newArr = []

        for (const [key, value] of Object.entries(checked)) {
            if (value === true) {
                newArr.push(key)
            }
            refetch();
        }

       
        newArr.forEach(el => {
            markPaid(el)
            alertPaid(el);
        })

        newArr.length === 0 && noUserAlert();

          // listItem.find((user) => {
        //     if (newArr.includes(user.id)) {
        //         if (user.paymentStatus === "unpaid") {
        //             markPaid(user.id)
        //             alert(`${user.firstName} ${user.lastName} marked as paid`);
        //         } else {
        //             alert(`${user.firstName} ${user.lastName} already marked paid`);
        //         }
        //     }
        // })

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={true}
            />
            <DuesBtn onClick={handlePaid}>
                <h1>PAY DUES</h1>
            </DuesBtn>
        </>
    )
}

const DuesBtn = styled.div`
    background: #6D5BD0;
    border-radius: 6px;
    width: 99px;
    height: 39;
    padding:10px;
    cursor: pointer;
    text-align: center;

    h1 {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF !important;
    }

    @media (max-width: 640px) {
        position: absolute;
        top:0;
        right:20px;
        font-size: 12px;
        width: 99px;
         height: 39;
  }
`

export default PayDues;
