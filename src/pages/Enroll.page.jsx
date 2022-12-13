import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetBatches } from '../apis/batch.api'
import { GetEnrollmentApi, ModifyEnrollmentApi } from '../apis/enrollment.api'
import '../assets/styles/enroll.style.css'
import { Button } from '../components/atoms/Button.component'
import { NavBar } from '../components/atoms/navBar.component'
import { EnrollModal } from '../components/molecules/Enroll.modal'
import { BatchModal } from '../components/molecules/getBatch.modal'
import { ApiWrapper } from '../utils/apiWrapper.util'
import {
  getMonthYear,
  getnextMonthYear,
  succssFunc
} from '../utils/commonFuc.util'

export const Enroll = () => {
  const [enrollments, setEnrollments] = useState([])
  const [update, setUpdate] = useState(true)
  const [batch, setBatch] = useState(1)
  const [batches, setBatches] = useState('')
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [showEnrollModal, setshowEnrollModal] = useState(false)
  const [currEnrollment, setcurEnrollment] = useState({})

  const [durations, setDurations] = useState([
    getMonthYear().join(' '),
    getnextMonthYear().join(' ')
  ])

  const successfunc2 = (res) => {
    const data = res.data
    setEnrollments(data)
    const enrolledDurations = []
    data.map((el) => {
      enrolledDurations.push(el.duration.toLowerCase())
    })
    setDurations(durations.filter((item) => !enrolledDurations.includes(item)))
  }

  const successfunc1 = (res) => {
    setBatches(res.data)
  }

  const [month, year] = getMonthYear()

  const buttonText = (duration, amount) => {
    const sdf = new Date(duration)
    const today = new Date()
    return sdf > today ? '🖊 Modify' : `⚠️ pay ₹${amount}`
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('AccessToken')) {
      navigate('/auth')
      return
    }

    async function myfunc() {
      await ApiWrapper(
        GetEnrollmentApi,
        month.toLowerCase(),
        year,
        successfunc2
      )
      await ApiWrapper(GetBatches, successfunc1)
    }
    myfunc()
  }, [update])

  const Update = async (enrollment, cur_batch, paid) => {
    await ApiWrapper(
      ModifyEnrollmentApi,
      {
        id: enrollment.id,
        paid: paid,
        batch: cur_batch
      },
      succssFunc
    )
    setUpdate(!update)
  }

  const Modify = (enrollment) => {
    const sdf = new Date(enrollment.duration)
    const today = new Date()
    let cur_batch = enrollment.batch
    if (sdf > today) {
      setShowBatchModal(true)
      setcurEnrollment(enrollment)
    } else {
      Update(enrollment, cur_batch, true)
    }
  }

  return (
    <div className="container1 bgYoga">
      <NavBar />
      <BatchModal
        batches={batches}
        value={batch}
        setValue={setBatch}
        view={showBatchModal}
        setView={setShowBatchModal}
        Update={setUpdate}
        enrollment={currEnrollment}
      />
      <EnrollModal
        batches={batches}
        view={showEnrollModal}
        setView={setshowEnrollModal}
        Update={setUpdate}
        durations={durations}
      />
      <div className="subscriptionContainer">
        <h2 className="h2">Your Subscriptions</h2>
        {enrollments.length > 0 ? (
          enrollments.map((enrollment) => (
            <div className="subTab" key={enrollment.id}>
              <div className="left">
                <h2 className="BatchName">{`Batch ${enrollment.batch}`}</h2>
                <h4 className="duration">{enrollment.duration}</h4>
              </div>
              <div className="right">
                {enrollment.paid ? (
                  <h4 className="paidStatus green">✅Paid</h4>
                ) : (
                  <Button
                    handleClick={() => Modify(enrollment)}
                    text={buttonText(enrollment.duration, enrollment.Batch.fee)}
                    borderRadius={'4px'}
                    customStyles={{
                      backgroundColor: '#fffdef',
                      color: 'black'
                    }}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="p">you have no Subscriptions to preview</p>
        )}
      </div>
      <div className="text-center">
        {durations.length > 0 && (
          <p className="addSubs" onClick={() => setshowEnrollModal(true)}>
            +add Subsciption
          </p>
        )}
      </div>
    </div>
  )
}
