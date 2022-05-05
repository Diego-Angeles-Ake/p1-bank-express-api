import { useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux actions

// Component
import Input from '../../components/ui/input/input.component';
import Button from '../../components/ui/button/button.component';
import Form from '../../components/ui/form/form.component';

import classes from './login.module.css';
import { useLogUserMutation } from '../../store/slices/apiSlice';
import { login } from '../../store/slices/user.slice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logUser, { data, isLoading, isSuccess }] = useLogUserMutation();

  // Refs
  const accountInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const accountNumber = accountInputRef.current.value;
    const password = passwordInputRef.current.value;
    await logUser({ accountNumber, password })
      .unwrap()
      .then((res) => {
        console.log(res);
        navigate('/');
        dispatch(login(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignup = () => {
    navigate('/signup');
  };

  const header = 'To enter our app, please fill these fields';

  return (
    <div className={classes.container}>
      <Form header={header} submitHandler={submitHandler}>
        <Input
          ref={accountInputRef}
          label='Account number'
          input={{ id: 'account', type: 'number' }}
        />
        <Input
          ref={passwordInputRef}
          label='Password'
          input={{ id: 'password', type: 'password' }}
        />

        <div className={classes.actions}>
          <Button type='submit'>Log in</Button>
          <Button onClick={onSignup} type='button'>
            Create account
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
