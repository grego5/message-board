import { apiCall } from '../../services/api'
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
   return {
      type: SET_CURRENT_USER,
      user
   };
};

export function logout(){
   return dispatch => {
      localStorage.clear();
      console.log(localStorage.jwtToken);
      dispatch(setCurrentUser({}));
   };
};

export function authUser(type, userData) {
   return dispatch => {
      return new Promise((resolve, reject) => {
         const options = {
            method: 'post',
            headers: new Headers({
               'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userData)
            };
         apiCall(`/auth/${type}`, options)
            .then(({token, username}) => {
               localStorage.setItem('jwtToken', token);
               dispatch(setCurrentUser(username));
               dispatch(removeError());
               resolve();
            })
            .catch(err=>{
            dispatch(addError(err.message));
            console.log(err.message);
            reject();
         });
      });
   };
};