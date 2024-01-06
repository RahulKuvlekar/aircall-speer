import { createContext, useReducer } from 'react';
import { ActivityReducer } from '../Reducers/ActivityReducer';
import { PropTypes } from 'prop-types';

export const INITIAL_STATE = {
    feeds: [],
    archives: [],
    loading: false,
    error: null,
};

const ActivityContext = createContext({
    activityState: INITIAL_STATE,
    dispatchActivity: Function,
});

const ActivityProvider = ({ children }) => {
    const [activityState, dispatchActivity] = useReducer(
        ActivityReducer,
        INITIAL_STATE
    );

    return (
        <ActivityContext.Provider value={{ activityState, dispatchActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

ActivityProvider.propTypes = {
    children: PropTypes.node,
};

export { ActivityContext, ActivityProvider };
