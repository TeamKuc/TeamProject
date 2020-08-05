import client from './client'

export const userinfo = _id => client.get(`/api/user/userinfo/${_id}`)

export const userupdate = ({ userID, name, password, email,_id }) =>
    client.post('/api/user/userUpdate', { userID, name, password, email,_id });

export const gethistory = user => client.post('/api/user/gethistory', { user })



