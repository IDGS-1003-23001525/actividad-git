import PropTypes from 'prop-types'
import './Card.css'

const Card = ({ lang, img, fcolor, scolor }) => {
    return (
        <div className='card'
            style={{
                background: `linear-gradient(to left, ${fcolor}, ${scolor})`
            }}
        >
            <img src={img} alt={lang} />
            <h3>{lang}</h3>
        </div>
    )
}

Card.PropTypes = {
    lang: PropTypes.string,
    img: PropTypes.string,
    fcolor: PropTypes.string,
    scolor: PropTypes.string,
}

export default Card;