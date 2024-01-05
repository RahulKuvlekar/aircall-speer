import { Fragment } from 'react';
import { PropTypes } from 'prop-types';

const Loader = ({amount,keyPrefix}) => {
    return (
      <Fragment>
        {Array(amount)
          .fill(0)
          .map((item, idx) => (
            <div
              key={`${keyPrefix}-${idx}`}
              className="flex flex-col pt-3"
            >
              <div className="h-16 w-full animate-pulse rounded-md bg-base-300" />
            </div>
          ))}
      </Fragment>
    );
  };

  Loader.propTypes = {
    amount: PropTypes.number,
    keyPrefix: PropTypes.string,
}  

export default Loader; 