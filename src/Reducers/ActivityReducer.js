import {
    ADD_T0_ARHIEVE,
    ADD_T0_ARHIEVES_LIST,
    ADD_T0_FEED,
    ARCHIVE_ALL,
    REMOVE_FROM_ARHIEVE,
    SET_ERROR,
    SET_LOADING,
    UNARCHIVE_ALL,
} from '../Constant/constant';

export const ActivityReducer = (prevState, action) => {
    switch (action.type) {
        case ADD_T0_FEED:
            return { ...prevState, feeds: action.payload };
        case ARCHIVE_ALL:
            return { ...prevState, archives: [...prevState.feeds], feeds: [] };
        case UNARCHIVE_ALL:
            return { ...prevState, archives: [] };
        case ADD_T0_ARHIEVES_LIST:
            return { ...prevState, archives: action.payload };
        case ADD_T0_ARHIEVE: {
            const id = action.payload.id;
            const updatedFeeds = prevState.feeds.filter(
                (item) => item.id !== id
            );
            return {
                ...prevState,
                feeds: updatedFeeds,
                archives: [...prevState.archives, action.payload],
            };
        }
        case REMOVE_FROM_ARHIEVE: {
            const id = action.payload.id;
            const updatedArchives = prevState.archives.filter(
                (item) => item.id !== id
            );
            return {
                ...prevState,
                feeds: [...prevState.archives, action.payload],
                archives: updatedArchives,
            };
        }
        case SET_LOADING:
            return { ...prevState, loading: action.payload };
        case SET_ERROR:
            return { ...prevState, error: action.payload };
        default:
            return prevState;
    }
};
