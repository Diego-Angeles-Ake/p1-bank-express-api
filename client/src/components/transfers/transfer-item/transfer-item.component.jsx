import { useGetUserInfoQuery } from '../../../store/slices/apiSlice';
import classes from './transfer-item.module.css';

const TransferItem = ({ transfer }) => {
  const formattedDate = new Date(transfer.createdAt).toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetUserInfoQuery(transfer.receiverUserId);

  const formattedAmount = transfer.amount.toFixed(2);
  console.log(data);
  return (
    isSuccess && (
      <div className={classes.transfer}>
        <p className={classes['transfer__user']}>To: {data.user.name}</p>
        <p className={classes['transfer__date']}>Date: {formattedDate}</p>
        <p className={classes['transfer__amount']}>
          Amount: ${formattedAmount}
        </p>
      </div>
    )
  );
};

export default TransferItem;
