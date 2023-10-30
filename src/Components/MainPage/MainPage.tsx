/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import '../nullstyle.css';
import './styles/sidebar.scss';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { RootState, useAppDispatch } from '../../Redux/Store';
import img from './img/photo.jpg';
import bigImg from './img/big_photo.png';
import { loadUsers } from '../../Features/Users/usersSlice';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { error, users } = useSelector((store: RootState) => store.users);

  const [id, setId] = useState(0);
  const [value, setValue] = useState('');

  const arrValue = value.trim().split(', ');

  let request = '';
  arrValue.forEach((el, ind) => {
    if (Number.isFinite(Number(arrValue[0]))) {
      if (ind === 0) {
        request = `https://jsonplaceholder.typicode.com/users?id=${el}`;
      } else {
        request = `${request}&id=${el}`;
      }
    } else if (ind === 0) {
      request = `https://jsonplaceholder.typicode.com/users?username=${el}`;
    } else {
      request = `${request}&username=${el}`;
    }
  });

  let user;
  if (id !== 0 && users) {
    user = users.find((client) => id === client.id);
  }

  useEffect(() => {
    dispatch(loadUsers(request));
  }, [request]);

  return (
    <div className="container">
      <div className="sidebar">
        <form className="sidebar__form">
          <label className="form_label">Поиск сотрудников</label>
          <input
            className="form_input"
            type="text"
            placeholder="Введите Id или имя"
            onChange={debounce((e) => {
              setValue(e.target.value);
            }, 1000)}
          />
          <label className="form_label">Результаты</label>
        </form>
        {users && users.length ? (
          <>
            {users.map((user) => (
              <div
                className="sidebar__card"
                data-id={`${user.id}`}
                onClick={() => setId(user.id)}
              >
                <img className="sidebar__photo" src={img} alt="photo" />
                <div className="card__info">
                  <div className="info__username">{user.username}</div>
                  <div className="info__email">{user.email}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
            value !== '' && users && !users.length ? (
              <div className="sidebar__text">ничего не найдено</div>
            ) : (
              <div className="sidebar__text">начните поиск</div>
            )
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="content">
        {id === 0 || user === undefined ? (
          <div className="content__advert">
            Выберите сотрудника, чтобы посмотреть его профиль
          </div>
        ) : (
          <div className="content__card">
            <img className="content__photo" src={bigImg} alt="photo" />
            <div className="content__info">
              <div className="content__name">{user.name}</div>
              <div className="content__item">
                <span>email:</span>
                {` ${user.email}`}
              </div>
              <div className="content__item">
                <span>phone:</span>
                {` ${user.phone}`}
              </div>
              <div className="content__item">
                <span>О себе:</span>
              </div>
              <div className="content__item">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;

// value !== '' && users && users.length ? (<div className="sidebar__text">ничего не найдено</div>) : (<div className="sidebar__text">ничего не найдено</div>)
