import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { HiPhoneOutgoing, HiPhoneIncoming } from 'react-icons/hi';

const FeedItem = ({ feed }) => {
    const FeedNumber =
        feed?.direction === 'outbound' ? feed.to : feed?.from ?? feed?.to;
    return (
        <Fragment>
            {FeedNumber && (
                <div className="card bg-neutral text-neutral-content wireframe:bg-red-500 shadow-xl border-b border-b-neutral-400 flex flex-row items-center justify-between px-6 py-3">
                    <div>
                        <h2
                            className={`text-2xl font-semibold text-left cursor-default ${
                                feed?.call_type === 'missed'
                                    ? 'text-red-500'
                                    : ''
                            }`}
                        >
                            {FeedNumber}
                        </h2>
                        {feed?.direction === 'outbound' ? (
                            <p className="text-sm flex flex-row gap-2 text-left cursor-default">
                                <HiPhoneOutgoing className="mt-1" /> Outgoing
                                Call
                            </p>
                        ) : (
                            <p className="text-sm flex flex-row gap-2 text-left cursor-default">
                                <HiPhoneIncoming className="mt-1" /> Incoming
                                Call
                            </p>
                        )}
                    </div>
                    <div className="flex flex-row gap-4">
                        <h2 className="text-right">
                            {moment(feed?.created_at).fromNow()}
                        </h2>
                        <Link
                            className="flex items-center justify-center cursor-default"
                            to={`/details/${feed.id}`}
                        >
                            <FiInfo className="text-2xl cursor-pointer" />
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

FeedItem.propTypes = {
    feed: PropTypes.shape({
        direction: PropTypes.string,
        from: PropTypes.number,
        to: PropTypes.number,
        via: PropTypes.number,
        duration: PropTypes.number,
        call_type: PropTypes.string,
        id: PropTypes.string,
        created_at: PropTypes.string,
    }),
};

export default FeedItem;
