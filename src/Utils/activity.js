import {
    ADD_T0_ARHIEVE,
    ADD_T0_ARHIEVES_LIST,
    ADD_T0_FEED,
    ARCHIVE_ALL,
    GET_ALL_ACTIVITIES,
    SET_ERROR,
    SET_LOADING,
    UNARCHIVE_ALL,
    UPDATE_ACTIVITY,
} from '../Constant/constant'
import toast from 'react-hot-toast'

export const getMyFeed = async (dispatchActivity) => {
    dispatchActivity({
        type: SET_LOADING,
        payload: true,
    })
    try {
        const response = await fetch(GET_ALL_ACTIVITIES)
        const responseData = await response.json()

        const archivedData = responseData.filter((item) => item.is_archived)
        const feedsData = responseData.filter((item) => !item.is_archived)

        dispatchActivity({
            type: ADD_T0_FEED,
            payload: feedsData,
        })

        dispatchActivity({
            type: ADD_T0_ARHIEVES_LIST,
            payload: archivedData,
        })
    } catch (error) {
        dispatchActivity({
            type: SET_ERROR,
            payload: error.message,
        })
    } finally {
        dispatchActivity({
            type: SET_LOADING,
            payload: false,
        })
    }
}

export const archiveActivity = async (
    activityType,
    dispatchActivity,
    feedItem,
    callBackFunction
) => {
    const body = JSON.stringify({
        is_archived: activityType === ADD_T0_ARHIEVE ? true : false,
    })
    dispatchActivity({
        type: SET_LOADING,
        payload: true,
    })
    try {
        const response = await fetch(`${UPDATE_ACTIVITY}/${feedItem.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        })
        if (response.ok) {
            dispatchActivity({
                type: activityType,
                payload: feedItem,
            })

            callBackFunction()

            toast.success(
                `${
                    activityType === ADD_T0_ARHIEVE
                        ? 'Archived Successfully'
                        : 'Unarchived Successfully'
                }`
            )
        } else {
            dispatchActivity({
                type: SET_ERROR,
                payload: `${
                    activityType === ADD_T0_ARHIEVE
                        ? 'Failed to Archive'
                        : 'Failed to Unarchive'
                }`,
            })
            toast.error(
                `${
                    activityType === ADD_T0_ARHIEVE
                        ? 'Failed to Archive'
                        : 'Failed to Unarchive'
                }`
            )
        }
    } catch (error) {
        dispatchActivity({
            type: SET_ERROR,
            payload: error.message,
        })
        toast.error(error.message)
    } finally {
        dispatchActivity({
            type: SET_LOADING,
            payload: false,
        })
    }
}

export const archiveAllFeeds = async (feeds, dispatchActivity) => {
    try {
        const archivePromises = feeds.map((feed) => {
            return fetch(`${UPDATE_ACTIVITY}/${feed.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_archived: true }),
            })
        })

        const response = await Promise.all(archivePromises)
        if (response.ok) {
            dispatchActivity({
                type: ARCHIVE_ALL,
            })
            toast.success('All Feeds are been Archived Successfully')
        } else {
            throw new Error(
                'failed to archive all the feeds. Please Refresh the page and try again later'
            )
        }
    } catch (error) {
        throw new Error(error)
    }
}
export const unArchiveAllFeeds = async (feeds, dispatchActivity) => {
    try {
        const unArchivePromises = feeds.map((feed) => {
            return fetch(`${UPDATE_ACTIVITY}/${feed.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_archived: false }),
            })
        })

        const response = await Promise.all(unArchivePromises)
        console.log('response', response)
        if (response[0]?.ok) {
            dispatchActivity({
                type: UNARCHIVE_ALL,
            })
            toast.success('All Feeds are been UNarchived Successfully')
        } else {
            throw new Error('failed to unarchive feed')
        }
    } catch (error) {
        throw new Error(error)
    }
}
