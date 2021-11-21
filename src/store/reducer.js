import {usersPutApi} from "../Api";

const initialState = {
  userInfo: [],
  postInfo: [],
  albumsInfo: [],
  photosInfo: [],
  updating: false,
  loadingPhotos: false,
};

const reducer = (state = initialState, action) => {
  let newState = {...state};
  // action.payload is an array of objects;
  // console.log(action.payload, 'payload in reducer');
  switch (action.type) {

    case 'userInfo':
      newState = {...initialState, userInfo: [...action.payload]};
      break;

    case 'postInfo':
      newState = {...initialState, postInfo: [...action.payload]};
      break;

    case 'updatePost':
      console.log(initialState, 'initialState');
      const {obj: {id, userid, title, body}, postInfo} = action.payload;
      usersPutApi(id, userid, title, body, postInfo);
      newState = {...initialState, postInfo, updating: true};
      console.log(newState, 'newState');
      break;

    case 'updateBody':
      newState = {...initialState, postInfo: [...action.payload]};
      break;

    case 'checkUpdating':
      const {updating, postInfo: info} = action.payload;
      newState = {...initialState, updating, postInfo: info};
      break;

    case 'updateAlbumsInfo':
      newState = {...initialState, albumsInfo: [...action.payload]};
      break;

    case 'updatePhotosOfUsersFromAlbumInfo':
      const {data, albumsInfo} = action.payload;
      newState = {...initialState, photosInfo: data, albumsInfo};
      break;

    default:
      console.log('hampered');
  }
  return newState;
};

export default reducer




