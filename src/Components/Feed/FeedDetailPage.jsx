
import { PropTypes } from 'prop-types';
import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ADD_T0_ARHIEVE, GET_ACTIVITY_DETAILS, REMOVE_FROM_ARHIEVE } from '../../Constant/constant';
import moment from 'moment';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useActivityContext } from '../../Hooks/useActivityContext';
import { archiveActivity } from '../../Utils/activity';

const Loader = () => {
    return <div className="min-h-[75vh] rounded-lg flex flex-col items-center justify-start w-full animate-pulse bg-base-300" >
            <div className="w-[620px] h-[150px] bg-secondary rounded-lg mt-20"/>
            <div className="w-[620px] h-[75px] bg-secondary rounded-lg mt-4"/>
            <div className="w-[620px] h-[75px] bg-secondary rounded-lg mt-4"/>
        </div>
}

const FeedDetailPage = () => {
    const {feedId} = useParams();
    const [feed,setFeed]= useState();
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(null);
    const navigate = useNavigate();
    const {activityState:{loading:loadingActivity},dispatchActivity} = useActivityContext()

    const username = feed?.direction === "outbound" ? feed.to :feed?.from ?? feed?.to;
    
    useEffect(()=>{
        (async()=>{
            setLoading(true)
            try {
                const response = await fetch(`${GET_ACTIVITY_DETAILS}/${feedId}`);
                const responseData = await response.json();
                setFeed(responseData)
                if(!response.ok){
                    setError("Failed to fetch data. Please try again")
                    toast.error("Failed to fetch data. Please try again")
                }
              } catch (error) {
                toast.error(error.message)
                setError(error.message)
              } finally {
                setLoading(false)
              }
        })()
    },[feedId])

    const gobackFunction=()=> navigate(-1)
    const archiveHandlerFunction=()=> {
        if(!feed) return;
        const isArchive = feed?.is_archived ? true : false;
        const archiveType = isArchive ? REMOVE_FROM_ARHIEVE : ADD_T0_ARHIEVE ;
        archiveActivity(archiveType,dispatchActivity,feed,() => setFeed(prev => ({...prev, is_archived:!isArchive})))
    }

    if(error){
        navigate(-1)
    }

  return (
    <div className="bg-base-200 shadow-md border border-neutral-300 min-h-[75vh] rounded-lg flex flex-col items-center justify-start ">
        {(()=>{
            if(loading) return <Loader/>
            else if(feed) return (<Fragment>
                <div className='m-8'>
                    <h2 className='flex flex-row gap-1 text-xxl cursor-pointer my-3 hover:text-indigo-700' onClick={gobackFunction}>
                        <MdArrowBackIos className='text-xl mt-1'/>
                        Back
                    </h2>
                    <div className='bg-secondary shadow-sm p-3 mb-4 rounded-md flex flex-col items-center w-[620px]'>
                        <div className="avatar">
                            <div className="w-24 rounded-full border border-neutral-800">
                            <img src="/src/assets/user-avatar.svg" />
                            </div>
                        </div>
                        <h2 className='text-2xl font-semibold '>{username}</h2>  
                    </div>
                    <div className='bg-secondary shadow-sm p-3 mb-4 rounded-md flex flex-col items-start'>
                        <div>{moment(feed.created_at).fromNow()}</div>
                        <div className='flex flex-row items-center w-full justify-between'>
                            <span >{moment(feed.created_at).format("LLL")}</span>
                            <span className='capitalize'>{feed?.call_type}</span>
                        </div>
                    </div>
                    <div className='bg-secondary shadow-sm p-3 rounded-md flex flex-row items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <div>Phone</div>
                            <div>
                                <span className={`text-xl font-semibold ${feed?.call_type === 'missed' ? 'text-red-500':''}`}>{username}</span>
                            </div>
                        </div>
                        <button className='disabled:cursor-not-allowed' onClick={archiveHandlerFunction} disabled={loadingActivity}>{feed?.is_archived ? 'Unarchive' : 'Archive'}</button>
                    </div>
                </div>
            </Fragment>)
        })()}
    </div>
  )
}

FeedDetailPage.propTypes = {
    feed: PropTypes.shape({
        direction: PropTypes.string,
        from: PropTypes.number,
        to: PropTypes.number,
        via: PropTypes.number,
        duration: PropTypes.number,
        call_type: PropTypes.string,
        id: PropTypes.string,
        created_at: PropTypes.string,
    })
}

export default FeedDetailPage