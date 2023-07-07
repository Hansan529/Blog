import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { server } from '../screen/Home';
import { useEffect } from 'react';
import { check } from '../../_redux/_reducer/loginSlice';
import { info } from '../../_redux/_reducer/InfoSlice';
import Loading from './Loading';

function LoginCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const obj = {};

  params.forEach((value, key) => {
    obj[key] = value;
  });

  const data = async () => {
    const data = await (await server.post('/login/github/access', obj)).data;
    if (data.logged) {
      dispatch(check(data.logged));
      navigate('/');
    } else {
      dispatch(info(data));
      navigate('/join');
    }
  };

  useEffect(() => {
    data();
  }, [obj]);

  return <Loading />;
}

export default LoginCallback;
