import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions

// Components
import Modal from '../../ui/modal/modal.component';
import Input from '../../ui/input/input.component';
import Button from '../../ui/button/button.component';

import classes from './transfer-form.module.css';
import { useCreateTransferMutation } from '../../../store/slices/apiSlice';

const TransferForm = ({ onHideModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [createTransfer, { isLoading }] = useCreateTransferMutation();
  // Refs
  const accountInputRef = useRef();
  const amountInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const accountNumber = +accountInputRef.current.value;
    const amount = +amountInputRef.current.value;

    if (!accountNumber || !amount) {
      return;
    }
    const currentId = user.user.id;

    // dispatch(newTransfer(user.accountNumber, accountNumber, amount));
    await createTransfer({
      senderUserId: currentId,
      receiverAccount: accountNumber,
      amount,
    }).unwrap();

    onHideModal();
  };

  return (
    <Modal onClick={onHideModal}>
      <h3 className={classes.title}>
        To make a transfer, please enter the following information
      </h3>
      <form onSubmit={submitHandler} className={classes['transfer-form']}>
        <Input
          label='Account number'
          ref={accountInputRef}
          input={{
            id: `account`,
            type: 'number',
          }}
        />
        <Input
          label='Amount'
          ref={amountInputRef}
          input={{
            id: `amount`,
            type: 'number',
            min: '1',
            step: '1',
          }}
        />

        <Button>Transfer!</Button>
      </form>
    </Modal>
  );
};

export default TransferForm;
