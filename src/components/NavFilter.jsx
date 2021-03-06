import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import NavFilterBtn from './NavFilterBtns'
import { useGetUsersQuery } from '../services/usersApi'
import Loader from './Loader'


const NavFilter = () => {
    const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery();
    const allUsers = isSuccess && data?.data
    const allCategories = ['All', 'paid', 'unpaid', 'overdue'];
    


    const [listItem, setListItem] = useState(allUsers);
    const [buttons, setButtons] = useState(allCategories);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const searchFilter = data?.data.filter((user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            user.lastLogin.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

        setListItem(searchFilter)
    }, [data, searchTerm])



    const filter = (button) => {
        if (button === 'All') {
            setListItem(allUsers);
            return;
        }
        const filteredData = allUsers.filter(user => user.paymentStatus === button);
        setListItem(filteredData)
        console.log(filteredData)
    }


    function totalPayableAmount() {
        if (allUsers) {
            const dues = []
            allUsers.map((user) => {
                if (user.paymentStatus === "unpaid" || user.paymentStatus === "overdue") {
                    dues.push(user)
                }
              }
            );
            const totalDues = dues && dues.map((el) => el.amountInCents).reduce((a, b) => a + b);
            return (totalDues * 0.01).toFixed(2);
        }
        return 0.00
    }

    return (
        <>
            {isLoading && <Loader />}
            {error && <span>{error.status}</span>}
            {isSuccess && !isError &&
                <NavFilterContainer>
                    <DFlexer className='flex sm:flex-row flex-col justify-between sm:items-center'>
                        <NavFilterBtn buttons={buttons} filter={filter} />
                        <h1>Total Payable amount: <span className='totalPay'>{'$'}{totalPayableAmount()}</span> USD</h1>
                    </DFlexer>
                    <Menu searchTerm={searchTerm} setSearchTerm={setSearchTerm} listItem={listItem && listItem} setListItem={setListItem} />
                </NavFilterContainer>
            }
        </>
    )
}

const NavFilterContainer = styled.div`
    width:100%;
    margin-top: 20px;

    h1{
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #6E6893;
    }
`

const DFlexer = styled.div`
    border-bottom: 1px solid #C6C2DE;

    @media (max-width: 640px) {
        padding-bottom: 12px;
  }
`

export default NavFilter;