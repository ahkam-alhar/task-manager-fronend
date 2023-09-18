import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Label from '../Constants/labels';

const TaskCard = (props) => {
  const [dataSet, setDataSet] = useState();

  const { classOverride, cardHeading, textClassOverride, cardData } = props;

  useEffect(() => {
    if (cardData) {
      const modifiedData = cardData.map((value) => {
        if (value.priority === parseInt(Label.LOW_VALUE)) {
          value.priorityValue = Label.LOW;
          value.cssText = 'text-secondary';
        } else if (value.priority === parseInt(Label.MEDIUM_VALUE)) {
          value.priorityValue = Label.MEDIUM;
          value.cssText = 'text-warning';
        } else if (value.priority === parseInt(Label.HIGH_VALUE)) {
          value.priorityValue = Label.HIGH;
          value.cssText = 'text-danger';
        }

        return value;
      });

      setDataSet(modifiedData);
    }
  }, [cardData]);

  return (
    <>
      <div className={`card ${classOverride} mb-3 h-100`}>
        <h6 className={`card-header ${textClassOverride}`}>{cardHeading}</h6>
        <div className="card-body overflow-auto">
          <ul className="list-group list-group-flush">
            {dataSet &&
              dataSet.map((value, key) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={key}
                  >
                    <p className="mr-auto">{value.task}</p>
                    <div className="d-flex">
                      <div className={`${value.cssText} px-2`}>
                        {value.priorityValue}
                      </div>
                    </div>
                  </li>
                );
              })}
            {dataSet && dataSet.length === 0 && (
              <>
                <h3 className="text-secondary text-center">
                  {Label.NO_DATA_FOUND}
                </h3>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

TaskCard.propTypes = {
  classOverride: PropTypes.string,
  cardHeading: PropTypes.string.isRequired,
  textClassOverride: PropTypes.string,
  cardData: PropTypes.array.isRequired,
};

TaskCard.defaultProps = {
  classOverride: '',
  textClassOverride: '',
};

export default TaskCard;
