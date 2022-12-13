import PropTypes from 'prop-types'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { ModifyEnrollmentApi } from '../../apis/enrollment.api'
import { ApiWrapper } from '../../utils/apiWrapper.util'
import { succssFunc } from '../../utils/commonFuc.util'
import { Button } from '../atoms/Button.component'
export const BatchModal = ({
  batches,
  value,
  setValue,
  view,
  setView,
  Update,
  enrollment
}) => {
  const handleClose = () => setView(false)

  const handleModify = async () => {
    handleClose()
    await ApiWrapper(
      ModifyEnrollmentApi,
      {
        id: enrollment.id,
        paid: enrollment.paid,
        batch: value
      },
      succssFunc
    )
    Update((oldvalue) => !oldvalue)
  }

  return (
    <Modal open={view} onClose={handleClose} center>
      <h2>Select Batch</h2>
      <select
        aria-label="Default select example"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input p"
      >
        {batches &&
          batches.map((batch) => (
            <option value={batch.id} key={batch.id}>
              {batch.timing}
            </option>
          ))}
      </select>
      <Button
        handleClick={handleModify}
        text={'save'}
        customStyles={{ width: '100px' }}
      />
    </Modal>
  )
}

BatchModal.propTypes = {
  batches: PropTypes.any.isRequired,
  value: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  view: PropTypes.bool,
  setView: PropTypes.func,
  Update: PropTypes.func,
  enrollment: PropTypes.object
}
