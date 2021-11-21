import store from '../src/store/store.js';

export const getUsersApi = () => {
  let res = [];
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((data) => {

      res = data.map((item) => {
        return {
          email: item.email,
          id: item.id,
          name: item.name,
          username: item.username,
          phone: item.phone,
        }
      });
      // res is array of selected key-value pairs of all objects.
      console.log(res, 'res from server');
      store.dispatch({
        type: 'userInfo',
        payload: res,
      });
    });
};

export const getUsersPostApi = (id) => {

  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(response => response.json())
    .then((data) => {

      // data is array of all key-value pairs of all objects.
      console.log(data, 'posts from server');
      store.dispatch({
        type: 'postInfo',
        payload: data,
      });

    });

};

export const usersPutApi = (id, userid, title, body, postInfo) => {

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      title,
      body,
      userId: Number(userid),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {

      console.log(json, 'in json********');

      store.dispatch({
        type: 'checkUpdating',
        payload: {updating: false, postInfo},
      })

    });
};

export const getUsersAlbums = (userid) => {

  fetch(`https://jsonplaceholder.typicode.com/users/${userid}/albums`)
    .then(response => response.json())
    .then((data) => {

      // data is array of all key-value pairs of all objects.
      console.log(data, 'albums from server of the users');
      store.dispatch({
        type: 'updateAlbumsInfo',
        payload: data,
      });
    });
};

export const getPhotosOfTheUserFromAlbum = (albumId, albumsInfo) => {

  fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    .then(response => response.json())
    .then((data) => {
      // data is array of all key-value pairs of all objects.
      console.log(data, 'photos from server of the users');
      store.dispatch({
        type: 'updatePhotosOfUsersFromAlbumInfo',
        payload: {data, albumsInfo},
      });
    });
};



