import { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import TransferForm from '../../components/transfers/transfer-form/transfer-form.component';
import TransferHistory from '../../components/transfers/transfer-history/transfer-history.component';
import Button from '../../components/ui/button/button.component';
import { useGetUserInfoQuery } from '../../store/slices/apiSlice';

import classes from './home.module.css';

const Home = () => {
  const user = useSelector((state) => state.users.user);

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetUserInfoQuery(user?.user?.id);
  const [showModal, setShowModal] = useState(false);

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes['transaction-container']}>
        <p>Need to send money? Click this button!</p>
        <p>Available amount: {data?.user?.amount}</p>
        <Button onClick={showModalHandler}>New transfer</Button>
      </div>

      {showModal && <TransferForm onHideModal={hideModalHandler} />}

      <div className={classes['transfers-list']}>
        <p className={classes['transfers-list__header']}>
          Your most recents transfers
        </p>
        <TransferHistory />
      </div>
    </div>
  );
};

export default Home;
