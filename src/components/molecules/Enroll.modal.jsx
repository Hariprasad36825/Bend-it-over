import PropTypes from 'prop-types'
import { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { addEnrollmentApi } from '../../apis/enrollment.api'
import { ApiWrapper } from '../../utils/apiWrapper.util'
import { succssFunc } from '../../utils/commonFuc.util'
import { Button } from '../atoms/Button.component'

export const EnrollModal = ({ batches, view, setView, Update, durations }) => {
  const handleClose = () => setView(false)
  const [paid, setPaid] = useState(false)
  const [batch, setBatch] = useState(1)
  const [duration, setDuration] = useState(0)
  const handleModify = async () => {
    const [month, year] = durations[duration].split(' ')
    await ApiWrapper(
      addEnrollmentApi,
      {
        batch,
        month,
        year,
        paid
      },
      succssFunc
    )
    Update((oldvalue) => !oldvalue)
    handleClose()
  }

  const handlePaidModify = () => {
    setPaid(true)
    handleModify()
  }

  return (
    <Modal open={view} onClose={handleClose} center>
      <p>Batch</p>
      <select
        aria-label="Default select example"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        className="input p"
      >
        {batches &&
          batches.map((batch) => (
            <option value={batch.id} key={batch.id}>
              {batch.timing}
            </option>
          ))}
      </select>
      <p>Duration</p>
      <select
        aria-label="Default select example"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="input p"
      >
        {durations &&
          durations.map((duration, ind) => (
            <option value={ind} key={ind}>
              {duration}
            </option>
          ))}
      </select>
      <Button
        handleClick={handlePaidModify}
        text={'Pay Now'}
        customStyles={{ width: '100px', margin: '1rem 1rem 0 0' }}
      />
      <Button
        handleClick={handleModify}
        text={'Pay Later'}
        customStyles={{ width: '100px' }}
      />
    </Modal>
  )
}

EnrollModal.propTypes = {
  batches: PropTypes.any.isRequired,
  view: PropTypes.bool,
  setView: PropTypes.func,
  Update: PropTypes.func,
  durations: PropTypes.any
}
