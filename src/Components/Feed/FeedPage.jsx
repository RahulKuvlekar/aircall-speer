import { Fragment, useEffect, useState } from "react"
import { archiveAllFeeds, getMyFeed } from "../../Utils/activity"
import { useActivityContext } from "../../Hooks/useActivityContext"
import FeedItem from "./FeedItem"
import moment from "moment"
import Loader from "../UI/Loader"
import { toast } from 'react-hot-toast';


const FeedPage = () => {
    
    const [loadingAll,setLoadingAll] = useState(false);

    const {activityState:{feeds,loading},dispatchActivity} = useActivityContext()
    const sortedNonArchivedFeed = feeds.filter(feed => feed.direction).slice().sort((a,b)=> {
        const dateOne = moment(a.created_at);
        const dateTwo = moment(b.created_at);
        return dateTwo.diff(dateOne)
    })


    const archiveAllFeedHandler = async() => {
        setLoadingAll(true);
        try {
            await archiveAllFeeds(sortedNonArchivedFeed,dispatchActivity)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoadingAll(false)
        }
    }

    useEffect(()=> {
        getMyFeed(dispatchActivity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
        <div className="bg-neutral flex border-b border-b-neutral-400 px-6 py-3 flex-row w-full items-center justify-between">
            <h2 className='text-3xl font-semibold '>All Activities</h2>
            <button disabled={loadingAll} className='disabled:cursor-not-allowed' onClick={archiveAllFeedHandler} >Archived All</button>
        </div>
        {(() => {
            if(loading) return <Loader amount={6} key={'feedloader'} />
            else if(feeds.length > 0) return (<Fragment>
                {sortedNonArchivedFeed.map((feed)=> <FeedItem key={`feeditem-${feed.id}`} feed={feed} />)}
            </Fragment >)
        })()}
    </div>
  )
}

export default FeedPage