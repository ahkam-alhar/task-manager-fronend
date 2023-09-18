import PropTypes from 'prop-types';

const TaskCard = (props) => {

    const {
        classOverride,
        cardHeading,
        textClassOverride,
        cardData
    } = props;

    return (
        <>
            <div className={`card ${classOverride} mb-3 h-100`}>
                <h6 className={`card-header ${textClassOverride}`}>{cardHeading}</h6>
                <div className="card-body overflow-auto">
                    <ul class="list-group list-group-flush">
                        {cardData.map((value, key) => {
                            return (<li class="list-group-item">
                                    <p className="card-text" key={key}>{value.task}</p>
                                </li>)
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

TaskCard.propTypes = {
    classOverride: PropTypes.string,
    cardHeading: PropTypes.string.isRequired,
    textClassOverride: PropTypes.string,
    cardData: PropTypes.array.isRequired
}

TaskCard.defaultProps = {
    classOverride: '',
    textClassOverride: ''
}



export default TaskCard;