import { FETCH_TRAILER } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TRAILER:
      const data = action.payload.data.results;
      let video = "none"
      if (data.length > 0)
      {
        data.forEach(result => {
          if (result.type === "Trailer" && video === "none") {
            video = result.key;
          }
        });
        if (video === "none") {
          video = data[0].key;
        }
      }
      return { ...state, video }
    default:
      return state;
  }
}