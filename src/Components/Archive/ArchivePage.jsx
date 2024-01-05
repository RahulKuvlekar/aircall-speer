import moment from "moment";
import { useActivityContext } from "../../Hooks/useActivityContext";
import { Fragment, useState } from "react";
import FeedItem from "../Feed/FeedItem";
import { unArchiveAllFeeds } from "../../Utils/activity";
import { toast } from 'react-hot-toast';

const ArchivePage = () => {
    const {activityState:{archives,loading},dispatchActivity} = useActivityContext()
    
    const [loadingAll,setLoadingAll] = useState(false);

    const archivedFeed = archives?.slice().sort((a,b)=> {
        const dateOne = moment(a.created_at);
        const dateTwo = moment(b.created_at);
        return dateTwo.diff(dateOne)
    })

    const unArchiveAllFeedHandler = async() => {
        setLoadingAll(true);
        try {
            await unArchiveAllFeeds(archivedFeed,dispatchActivity)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoadingAll(false)
        }
    }

  return (
    <div>
        <div className="bg-neutral flex border-b border-b-neutral-400 px-6 py-3 flex-row w-full items-center justify-between">
            <h2 className='text-3xl font-semibold '>Archives</h2>
        <button disabled={loadingAll} className='disabled:cursor-not-allowed' onClick={unArchiveAllFeedHandler} >UNarchived All</button>
        </div>
        {(() => {
            if(loading) return <h1>Loading</h1>
            else if(archivedFeed.length > 0) return (<Fragment>
                {archivedFeed.map((feed)=> <FeedItem key={`archiveitem-${feed.id}`} feed={feed} />)}
            </Fragment >)
        })()}
    </div>
  )
}

export default ArchivePage