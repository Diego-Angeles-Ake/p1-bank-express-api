import { useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Redux actions

// Component
import Input from '../../components/ui/input/input.component';
import Button from '../../components/ui/button/button.component';
import Form from '../../components/ui/form/form.component';

import classes from './signup.module.css';
import { useSignUserMutation } from '../../store/slices/apiSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser, { data, isLoading, isSuccess }] = useSignUserMutation();
  // Refs
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const password = passwordInputRef.current.value;
    await createUser({ name, password })
      .unwrap()
      .then(navigate('/login'))
      .catch((err) => {
        console.log(err);
      });
  };

  const onLogin = () => {
    navigate('/login');
  };

  const header = 'To create an account, enter these fields';

  return (
    <div className={classes.container}>
      <Form header={header} submitHandler={submitHandler}>
        <Input
          ref={nameInputRef}
          label='Your name'
          input={{ id: 'name', type: 'text', placeholder: 'Your name' }}
        />
        <Input
          ref={passwordInputRef}
          label='Password'
          input={{ id: 'password', type: 'password', placeholder: 'Password' }}
        />

        <div className={classes.actions}>
          <Button type='submit'>Create account</Button>
          <Button onClick={onLogin} type='button'>
            Have an account? Log in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
