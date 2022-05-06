import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { useGetTranfersQuery } from '../../../store/slices/apiSlice';

// Components
import TransferItem from '../transfer-item/transfer-item.component';

import classes from './transfer-history.module.css';

const TransferHistory = () => {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const {
    data: transfers = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetTranfersQuery(user?.user?.id);
  //   useEffect(() => {
  //     dispatch(getUsersTransfers());
  //   }, [dispatch]);

  console.log(transfers);
  return (
    <div>
      {isSuccess &&
        transfers.transfers.map((transfer) => (
          <TransferItem transfer={transfer} />
        ))}
    </div>
  );
};

export default TransferHistory;
