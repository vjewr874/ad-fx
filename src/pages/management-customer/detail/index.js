import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import CustomerInfo from '../components/customer-info/CustomerInfo'
import Customer from '../../../services/customer'
import CustomerHistory from '../components/customer-history/CustomerHistory'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Loader from '../../../components/Loader'

const Detail = () => {
  const history = useHistory()
  const [data, setData] = useState(null)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const { id } = useParams()
  const validateEmail = email => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return !!email.match(regexEmail)
  }
  useEffect(() => {
    detailLottery()
  }, [id])
  function detailLottery() {
    Customer.detailCustomer({ id: id }).then(res => {
      if (res) {
        const { statusCode, data, message } = res
        if (statusCode === 200) {
          setData(data)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      } else {
      }
    })
  }
  function handleActiveUser(value) {
    if (value === 0) {
      value = 1
    } else value = 0

    const params = {
      id: id,
      data: {
        active: value
      }
    }
    setIsLoadingSubmit(true)
    Customer.updateDetailCustomer(params).then(res => {
      setIsLoadingSubmit(false)
      if (res) {
        // eslint-disable-next-line no-unused-vars
        const { statusCode, message } = res
        if (statusCode === 200) {
          detailLottery()
          toast.success('Thành công')
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      } else {
      }
    })
    detailLottery()
  }
  function handleChangeUser(
    email,
    tentaikhoan,
    sotaikhoan,
    tennganhang
  ) {
    const params = {
      id: id,
      data: {
        email: email,
        tentaikhoan: tentaikhoan || undefined,
        sotaikhoan: sotaikhoan || undefined,
        tennganhang: tennganhang || undefined
      }
    }

    if (!tentaikhoan) {
      toast.warn('Vui lòng nhập Tên tài khoản')
      return
    }
    if (!sotaikhoan) {
      toast.warn('Vui lòng nhập Số tài khoản')
      return
    }
    if (!tennganhang) {
      toast.warn('Vui lòng nhập Tên ngân hàng')
      return
    }

    setIsLoadingSubmit(true)
    Customer.updateDetailCustomer(params).then(res => {
      setIsLoadingSubmit(false)
      if (res) {
        // eslint-disable-next-line no-unused-vars
        const { statusCode, message } = res
        if (statusCode === 200) {
          detailLottery()
          toast.success('Thành công')
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      } else {
      }
    })
    detailLottery()
  }
  function handleUpdatePasswordCustomer(password) {
    const params = {
      id: id,
      password: password
    }
    setIsLoadingSubmit(true)
    Customer.updatePasswordCustomer(params).then(res => {
      setIsLoadingSubmit(false)
      if (res) {
        // eslint-disable-next-line no-unused-vars
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success('Thành công')
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      } else {
      }
    })
    detailLottery()
  }
  const PointWallet = () => {
    let total = 0
    data?.wallets.forEach(item => (total += item.balance))
    return total
  }

  return (
    <div>
      {isLoadingSubmit ? <Loader /> : null}
      <CustomerInfo
        title={'Thông tin người dùng'}
        disabled={false}
        id={id}
        lotteryInfo={data}
        handleActiveUser={handleActiveUser}
        handleChangeUser={handleChangeUser}
        handleUpdatePasswordCustomer={handleUpdatePasswordCustomer}
        totalWallets={PointWallet()}
      />
      <CustomerHistory IdUser={id} />
      <div className={'d-flex justify-content-end align-items-center'}>
        <Button
          color={'primary'}
          className={'mr-2'}
          // onClick={() => history.push('/customer/list')}
          onClick={() => history.go(-1)}
        >
          Trở lại
        </Button>
      </div>
    </div>
  )
}
export default Detail
